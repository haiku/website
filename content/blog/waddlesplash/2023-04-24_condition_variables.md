+++
type = "blog"
title = "Haiku's (Kernel) Condition Variables API: Design & Implementation"
author = "waddlesplash"
date = "2023-04-24 13:00:00-04:00"
tags = ["kernel"]
+++

A few months after my contract with Haiku, Inc. began, I rewrote the implementation of the Haiku kernel's condition variables (as opposed to our userspace condition variables, which are from POSIX.) As this new implementation has run in Haiku for over a year and shipped in the latest release with no sign of any remaining issues, I figured it is high time for a deep-dive on the API, its implementation history, and the design of the new implementation I wrote.

I expect this article will be of broader interest than just to Haiku’s community, because Haiku’s condition variables API has some notable (and powerful) features not found in those of other operating systems, and its implementation is thus likewise unique (at least, as far as I have been able to figure out.)

<!--more-->

## Background

Before delving in to Haiku’s condition variables and how they differ from those of other operating systems, it is first important to understand what they are for, and how they fit in with the other thread-related APIs. (For those already very familiar with atomics and thread synchronization primitives, you can likely skip this section entirely, and jump directly to the section titled “Condition variables”.)

Teams (or in more common terminology, “processes”) are built around *threads*, or more properly, *threads of execution*. Any team will have at least one thread (the “main thread”), and any number of other threads. On systems with multiple CPU cores (and/or “hyperthreads”), multiple threads will be running at once; and even on single-core systems where only one thread will be running at a time, the order in which threads run will not always be the same, since it may depend on disk I/O, system load, etc. Thus, thread operations need to be *synchronized.*

### Atomics

Suppose I have an integer which I want to add 1 to.
```cpp
int32* gSharedInteger = new int32(0);
void add() {
	int32 localInteger = *gSharedInteger;
	localInteger = localInteger + 1;
	*gSharedInteger = localInteger;
}
```
(There are, of course, more compact ways to write the above code in C/C++, but this is closely approximating what the compiler will transform all of them into at build time out of necessity, and thus what will actually run when the code is executed.)

What happens if `add` is invoked for the first time simultaneously in two separate threads? Will `sharedInteger` become `2`, or (if the invocations really occur at exactly the same instant), will it become `1`, since the threads will have “raced” against each other? (There are some helpful tables illustrating this phenomenon [on Wikipedia](https://en.wikipedia.org/wiki/Race_condition#Example).)

To solve this problem, ISAs (instruction set architectures) include _atomic operations_, so called because they act like one operation, not distinct ones. In our `add` function, we performed 3 distinct operations: we fetched the value, added `1` to it, and then set the value. With an atomic operation, these 3 operations become or behave as 1 single operation (for all intents and purposes of the programmer, anyway), and so simultaneous invocations are no longer a problem.

Different compilers, operating systems, etc. expose such ISA-level atomic operations in different ways. On Haiku, we expose them through [a set of functions prefixed with `atomic_`](https://www.haiku-os.org/docs/api/group__support__globals.html#ga8a7c9722b2dcc2d6a92da0d8e6809390) which operate on `int32*`s (and there is also an equivalent set of functions for `int64*`s.) If we use one of them to make our earlier example thread-safe, it will look like this:
```cpp
void add() {
	atomic_add(gSharedInteger, 1);
}
```
(As a bonus, `atomic_add` also returns the value `gSharedInteger` had before `1` was added to it: so it is really a “fetch and add” operation, not just an “add” operation.)

There are a variety of different atomic operations, and many ways to use them. But it is important to keep in mind that these are a ‘low-level’ primitive, and when using them, there are a lot of considerations that must be taken into account: when using multiple atomics in a row, for example, interesting things can happen with operation ordering.

### Spinlocks

Atomic operations mostly serve as a “building block” upon which more ergonomic synchronization primitives are built. Foremost among these, underlying all other thread synchronization primitives in the kernel, is the *spinlock*.

```cpp
spinlock gLock = B_SPINLOCK_INITIALIZER;
int32 gSharedInteger = 0;

void add() {
	acquire_spinlock(&gLock);
	gSharedInteger = gSharedInteger + 1;
	release_spinlock(&gLock);
}
```

As the name implies, spinlocks simply “spin” (run atomic operations in a loop) until they manage to acquire the lock. They can thus wind up wasting lots of CPU time if another core holds them for a long period of time. (Haiku’s implementation has mechanisms to detect this and trigger kernel panics when it happens.) They are mostly used in implementing other synchronization primitives, and in especially low-level parts of the kernel.

Any thread which is acquiring or holding spinlocks is not allowed to be rescheduled, or even interrupted (by devices, by other CPUs, etc.) for any reason. Thus, spinlocks are always acquired only after the CPU’s “interrupts disabled” mode has been activated, and attempts to acquire them outside this mode will trigger kernel panics.

### Semaphores

The next kind of thread synchronization primitive, and in fact the only high-level one BeOS had in its kernel APIs, is called a *semaphore*, which tracks an abstract “count” and lets threads “acquire” and “release” it. For example:

```cpp
sem_id gSemaphore = create_sem(1 /* initial count */, "test semaphore");
int32 gSharedInteger = 0;

void add() {
	if (acquire_sem(gSemaphore) != B_OK)
		return;
	gSharedInteger = gSharedInteger + 1;
	release_sem(gSemaphore);
}
```

Here, I have created a semaphore which starts out having 1 for its “count”. Within `add`, I try to acquire 1 “count” from the semaphore; if there is not one available, the current thread will become *blocked*, and will only be woken up and resume execution once the semaphore can be acquired. Unlike with spinlocks, a blocked thread releases the CPU and lets other threads run while it is waiting; but also unlike with spinlocks, this requires context-switching, which is a relatively expensive operation (though note that “relatively expensive” at this level of OS programming means “takes dozens of *micro*seconds”.)

Note that in the above example, we check the return value of `acquire_sem`, because it can fail: if someone deletes the semaphore while we are trying to acquire it, we will get an error instead of a successful acquisition. (There are also ways to try and acquire semaphores with timeouts, etc. which will open up more possibilities for errors to occur.)

Further note that there is no restriction on how large the “count” can become in a semaphore. While in this example, the `acquire` and `release` calls are strictly balanced, I could have, e.g., a producer-consumer scenario, where every time the ‘producer’ thread created some resource, it `release`’d the semaphore, and likewise the ‘consumer’ thread would wait on resources to be created by calling `acquire`.

Since the semaphore has its own state independent of whatever context it is being used in, there is no danger of races between `release` and `acquire` leading to hangs. If some thread calls `release` before any other thread calls `acquire`, then the semaphore’s count will increase, and so the next `acquire` will succeed immediately without having to wait.

### Lock switching

Besides semaphores, there is one other concept that is relevant before condition variables can be discussed: *lock switching*, which means atomically releasing one lock and acquiring another. Consider the following:
```cpp
mutex_lock(&lock1);
// some operation...
mutex_unlock(&lock1);
mutex_lock(&lock2);
// some other operation...
```
In this example, there is a window in which `lock1` is unlocked, and `lock2` is not yet locked, where no lock at all is held. There are sometimes cases where that situation could cause big problems, but we could not (for whatever reason) hold both locks at the same time, so we cannot solve the problem by acquiring `lock2` before releasing `lock1`. Fortunately, there is an API for handling just this case:
```cpp
mutex_lock(&lock1);
// some operation...
mutex_switch_lock(&lock1, &lock2);
// some other operation...
```
(The precise details of how `mutex_switch_lock` manages to acquire the second lock and release the first lock without having any periods of time where both locks are held, or neither lock is held, shall have to be a story for another time.)

Having discussed all these details, now we can discuss condition variables.

## Condition variables

What is a ‘condition variable’? Put in the terms we have already discussed, it is a “countless semaphore.” In other words, a condition variable is simply an object that has no state of its own besides knowing what threads are ‘waiting’ on it, and can be told to ‘notify’ one or more of those threads with a value, waking them up.

Besides not having an explicit “value”, they also do not need a global ID (besides its address in memory). Thus they are much cheaper to create and destroy than semaphores are, and there is also no hard limit on how many there can be at any point in time. (To be fair, some kinds of semaphores on other operating systems may not need global IDs either, but there are still other differences I shall not deal with in this article.)

Let’s begin by looking, not at Haiku’s condition variables API, but at (a minimum subset of) FreeBSD’s.
```c
void cv_init(struct cv *, const char *desc);
void _cv_wait(struct cv *cvp, struct lock_object *lock);
void cv_signal(struct cv *cvp); /* i.e. awake, notify, etc. */
```
Note that the `wait` function takes a second parameter: a `lock_object`. This structure describes any number of locking primitives: mutexes, read-write locks, etc. (This function, having an `_` in front of it, is usually invoked through a macro to handle the different kinds of lock objects automatically.) This is not an optional parameter, but a required one.

Why is that? Well, remember what we said earlier about semaphores protecting against hangs by having state of their own? A condition variable has no such state. So, if some other thread were to `signal` (also sometimes known as “awakening”, or “notifying”) the condition variable, and then only *afterwards* did some other thread invoke `wait` on it, that thread would be stuck waiting for something that already had happened, and thus it would hang. In order to protect against that problem, *all* waits on condition variables must happen as part of a lock-switch from some other lock object.

### Haiku’s condition variables

You may be wondering, at this point, if this is an article about Haiku’s kernel condition variables and their implementation, why the first condition variables API that I showed was FreeBSD’s. Haiku does have an API that is a close equivalent to FreeBSD’s two-parameter `_cv_wait`:
```cpp
status_t ConditionVariable::Wait(mutex* lock);
```
But this is actually a relatively recent addition; a convenience API on top of a much more powerful one. Here is a usage example of that other API:
```cpp
ConditionVariableEntry waitEntry;
gSomeConditionVariable->Add(&waitEntry);
// ...
waitEntry.Wait();
```
Instead of a single `wait` function taking only a single lock as parameter, we have an entire object; and when we want to wait, we invoke `Wait` on the “Entry” object itself, not on the variable. There are no restrictions whatsoever on what can occur between the invocations of `ConditionVariable::Add` and `ConditionVariableEntry::Wait`: that is, one could unlock (thus “switching”) any number of locks, but one could also perform all sorts of other operations, wait for other locks (or other condition variables), and so on. In fact, one is not even required to call `Wait` at all; it is perfectly permissible to destroy the `ConditionVariableEntry` after having `Add`’ed it to a `Variable` *without* ever having called `Wait`. It is further not even required that the `ConditionVariable` stick around after `Add` is called; it may well be the case that, between `Add` and `Wait`, the `Variable` is destroyed by some other thread!

This is very different from the API found in other operating system kernels, or in POSIX, in which one “waits” directly on the condition variable itself, and so there must be a single lock to switch from. On Haiku, there does not need to be a lock at all; since (for example) the operation resulting in the condition variable being notified can be started *after* the `Entry` is `Add`ed to the `Variable`, making it impossible for any race to even theoretically occur.

(For example, in Haiku’s kernel, creating a new team (or `fork`ing an existing one) creates a `Variable` and an `Entry` waiting on it, before it even begins creating or forking the team, and then only invokes `Wait` right at the end of the procedure.)

Web programmers may notice that this API bears at least slight similarities to the “Promises” API introduced for asynchronous programming around 2014. Haiku, however, has had this API in approximately this form since 2008, albeit with more restrictions than it has now (for example, it was not originally legal to destroy an `Entry` without having invoked `Wait` on it.) Its original design, implementation, and usages were done by long-time developers axeld and weinhold, years before I had even heard of Haiku, so I cannot take credit for any of that.

The original implementation of this API depended on a single, global lock, through which all operations, whether to `Variable`s or `Entry`s, went through. At the time, Haiku’s scheduler also had a global lock (`gSchedulerLock`), and as condition variable operations usually lead to thread scheduler operations (and consumer hardware had fewer cores than it does today, and Haiku as a whole was less mature, etc.), it probably did not matter so much. But in 2014, Haiku gained a [new, modern thread scheduler](https://www.haiku-os.org/blog/pawe%C5%82_dziepak/2014-02-18_new_scheduler_merged/) without any global locks to speak of, and so the condition variables lock started mattering more.

### The first attempt

Back in 2019 (two years before I would be hired as a contractor to work on Haiku), I made a first attempt at rewriting the condition variables implementation to drop the global lock. At that time, I was not especially experienced with the constraints and requirements of implementing thread-synchronization primitives, and so even with the assistance of some other developers, the new implementation was a little half-baked. It depended on a two-lock scheme, where both the `Variable` and the `Entry` each had their own spinlock, which meant there were cases where one or the other would have to perform a strange lock-unlock-relock dance in order to avoid deadlocks.

It “mostly” worked, which is to say that in exceptionally rare circumstances (most of which started appearing only a year or two later, after drivers which previously had not used these APIs were modified or introduced), there would rarely but occasionally be kernel panics which looked a lot like `Entry`s being used-after-free. Whoops! Unfortunately, the final result of the development process in 2019 had produced an algorithm that was beyond my complete understanding (and not just mine, but other developers, as well), which was a pretty good indication that it was probably wrong.

So, when I came to revisit the problem in 2021, I determined that the double-spinlock design was probably fundamentally flawed, and rather than try to understand or fix it, an entirely new design was called for.

### The new implementation

My fundamental change in approach with the new implementation was to have the `Entry` be not protected by any lock, but have all its member variables be atomically updated, whether by itself or by the `Variable`. Those same variables would then also serve to indicate, depending on their precise state, what state the `Entry` itself was in, and what state the `Variable` was in with respect to the `Entry` . This still took some trial and error to get entirely correct; but the final version of the algorithm has run without causing any problems (that we know of) for over a year now, fully resolving all the issues which plagued the old one.

So, let’s look at the implementation, one piece at a time.

#### Member variables

The member variables of `ConditionVariable` are as follows (some convenience ones entirely unrelated to synchronization are omitted):
```cpp
			typedef DoublyLinkedList<ConditionVariableEntry> EntryList;

			spinlock			fLock;
			EntryList			fEntries;
			int32				fEntriesCount;
```
We have a `spinlock` protecting the linked-list of entries, and then an `int32 fEntriesCount` specifying the number of entries in the list. This last value is only *partially* protected by `fLock`, and is atomically updated: as we will see later on, it is critically important for synchronizing list removals.

Now, the member variables of `ConditionVariableEntry`:
```cpp
			ConditionVariable*	fVariable;
			Thread*				fThread;
			status_t			fWaitStatus;
```
The first is, of course, a pointer to the `Variable` this `Entry` has been added to (or `NULL` if it has not been added to one; or if it was added, but has since been removed.) `fVariable` being non-`NULL` *always* implies that the `Variable` in question has a reference to this `Entry`, likely in its `fEntries` list; the two are never changed except in tandem.

The second is a pointer to the kernel `Thread` structure, which indicates the thread that this `Entry` belongs to, which will be the one waiting on it. The `Variable` uses this to wake up the thread in question, but the variable is also used to signal (by either the `Entry` itself or the `Variable`) that the `Entry` is in the process of being removed from the `Variable`. One principle that is important to note is that whichever party unsets `fThread` is also the same party responsible for decrementing `fEntriesCount`, as we will see later on.

Finally, we have `fWaitStatus`. This value is either positive (if the `Entry` has been `Add`ed somewhere, but not yet notified and woken up), or `<= 0` (once it has been.) When `Wait` is invoked, it will either return this value or a timeout-related error code, depending on what happens. This variable has some relevance for synchronization, but not very much, as we will (once again) see later on.

#### `Add`ing `Entry` to a `Variable`

This is the most straightforward action of all: the `Variable`’s `fLock` is acquired, and then the following actions are taken inside the `Entry`:
```cpp
inline void
ConditionVariableEntry::_AddToLockedVariable(ConditionVariable* variable)
{
	fThread = thread_get_current_thread();
	fVariable = variable;
	fWaitStatus = STATUS_ADDED;
	fVariable->fEntries.Add(this);
	atomic_add(&fVariable->fEntriesCount, 1);
}
```
The `fThread` is set to the one we are currently running on, the `fWaitStatus` is set to `STATUS_ADDED`, we append ourselves to the variable’s `fEntries`, and the `fEntriesCount` is incremented.

#### An `Entry` removing itself from a `Variable`

If an `Entry` is destroyed without having been woken up by the `Variable` it was added to, it must remove itself from that `Variable` before it becomes invalid. Thus, in `~ConditionVariableEntry()`, if `fVariable != NULL`, a method is invoked to perform the removal (which is also used in another condition, as we will see later.)

It is possible that, while the `Entry` is trying to remove itself from the `Variable`, that the `Variable` is also trying to notify and remove this very same `Entry`. This section is thus considered “critical”, and so we begin by entering the CPU’s interrupts-disabled mode, even before we try to acquire the `Variable`’s spinlock.

```cpp
void
ConditionVariableEntry::_RemoveFromVariable()
{
	InterruptsLocker _;
```

(For those who are not familiar with the paradigm that `InterruptsLocker` represents: Haiku makes liberal use of the “locker object” paradigm, in which lock ownership is handled and managed within methods using RAII objects, which acquire the lock in their constructor, and release it in their destructor. This means, for example, that in conditions where we are going to `return` from a function before its end, we need not remember to unlock in each exit path, or add a `goto` where unlocks and state cleanup are done in one common place, as the compiler will handle that for us by calling the object destructor(s) as necessary. Haiku makes liberal use of this paradigm, leading it to have a very low amount of `goto`s in our kernel: less than 200 total in ~150,000 *source lines* of code.)

The next thing to be done is fetch the `fVariable` pointer and store it in a local variable.

```cpp
	ConditionVariable* variable = atomic_pointer_get(&fVariable);
```

Following this, we perform an atomic “get-and-set” on `fThread`, clearing it to `NULL` to indicate that we are about to remove ourselves from the `fVariable`.

```cpp
	if (atomic_pointer_get_and_set(&fThread, (Thread*)NULL) == NULL) {
		while (atomic_pointer_get(&fVariable) != NULL)
			cpu_pause();

		return;
	}
```

But of course, we run into the possibility that `fThread` is already `NULL`. Since we were not the ones to unset it, that must mean the `fVariable` is the one that did so, and thus is in the process of removing us, instead. While the `fVariable` has a reference to us, we cannot return from this function. So, instead, we spin in a loop until we know that `fVariable` no longer has such a reference, indicated by our `fVariable` becoming `NULL`; at that point, we just `return`, as there is nothing more that needs to be done.

Within the loop, we just call `cpu_pause`, which halts the CPU for an extremely brief period of time, to avoid wasting power.

(In the real implementation, this loop has some more ‘machinery’ in it to try and detect deadlocks and turn these into kernel panics instead of hangs, as well as some comments which would be redundant given the explanations I am giving here. I have thus stripped those out, for clarity’s sake.)

If, on the other hand, the value returned by the atomic `get_and_set` was not `NULL`, then we proceed.

```cpp
	while (true) {
		if (atomic_pointer_get(&fVariable) == NULL) {
			atomic_add(&variable->fEntriesCount, -1);
			return;
		}

		if (try_acquire_spinlock(&variable->fLock))
			break;
	}
```

Here we have another spin loop. In this one, we alternate between checking `fVariable` and trying to acquire the variable’s spinlock.

There is, of course, a small window between the check and the `try_acquire` in which the `Variable`, in the process of removing us, might unset this `Entry`’s `fVariable`. In that case, though, we do not need to worry about a use-after-dereference on our part of the `Variable`, because since we were the ones to unset `fThread`, we also have the responsibility to decrement `fVariable->fEntriesCount` to “acknowledge” the state of things (as happens just before the `return`.) The `fVariable` will wait for us to do that; and so until we have made that “acknowledgment”, we can continue to use our cached pointer to the `Variable` safely.

Otherwise, if we successfully acquire the spinlock, then we break out of the loop and move on to complete our task in a relatively straightforward manner:

```cpp
	if (fVariable->fEntries.Contains(this))
		fVariable->fEntries.Remove(this);

	atomic_pointer_set(&fVariable, (ConditionVariable*)NULL);
	atomic_add(&variable->fEntriesCount, -1);

	release_spinlock(&variable->fLock);
}
```

At this point, the `fVariable`’s `fEntries` really ought to contain `this`, but we check just to be really sure. Then we perform the removal, clear out `fVariable` and decrement `fEntriesCount`, and finally, release the lock and return.

#### An `Entry` performing a `Wait`

This is the primary function of any `Entry`, but in many respects it is actually a simpler case than the preceding one.

```cpp
status_t
ConditionVariableEntry::Wait(uint32 flags, bigtime_t timeout)
{
	ConditionVariable* variable = atomic_pointer_get(&fVariable);
	if (variable == NULL)
		return fWaitStatus;
```

We begin by checking if `fVariable` is even set at all; if it isn’t, we have already been notified, and so we return at once. Note that this is *purely an optimization*: the critical check to see if we have already been woken up happens later on in this method; we simply check it here before doing anything else because the steps leading up to it are much more expensive than a single `NULL` check.

```cpp
	InterruptsLocker _;
	SpinLocker schedulerLocker(thread_get_current_thread()->scheduler_lock);

	if (fWaitStatus <= 0)
		return fWaitStatus;
	fWaitStatus = STATUS_WAITING;
```

We begin by disabling interrupts (they will remain disabled from here until the end of the function), and then acquiring the current thread’s `scheduler_lock`. Other threads can only wake us up if they hold our `scheduler_lock`, so, this prevents them from waking us up while we are in the middle of ‘blocking’ (aka. sleeping, suspending, etc.)

We then check `fWaitStatus`. This is the actually critical check: if the `Variable` notified us between when the function started and this point, this is where we notice it, and return without blocking if so. Otherwise, we set our own status to `STATUS_WAITING`, and move on.

```cpp
	thread_prepare_to_block(thread_get_current_thread(), flags,
		THREAD_BLOCK_TYPE_CONDITION_VARIABLE, variable);

	schedulerLocker.Unlock();

	status_t error = thread_block_with_timeout(flags, timeout);
```

Now we actually block ourselves. On Haiku (and similarly on other operating systems), this is a two-step process: first we invoke `thread_prepare_to_block`, which changes the thread’s status to “blocked” and updates other internal state, and then we invoke the appropriate `thread_block` variant (here, for simplicity’s sake, only the one with a timeout; the real code has a check to decide whether to invoke the non-timeout version, instead.)

In between the `prepare` and the `block`, we unlock the scheduler lock. The `thread_block` will wind up re-acquiring it before it invokes the scheduler, and we do not need to hold after calling `prepare`, anyway: if we are notified and woken up between `prepare` and `block`, the call to `block` will just return immediately without actually blocking this thread.

By the time execution resumes and `thread_block` does return, either we will have been woken up, or the timeout will have been hit (or, depending on the `flags`, there are some other possible error conditions which could be permitted to occur.)

After this, there is not much left to do:

```cpp
	_RemoveFromVariable();
	return error;
}
```

We invoke `_RemoveFromVariable()`, as in the case where `thread_block` returned an error, we likely were not woken up by the `Variable` and still need to be removed from it. We do this unconditionally: in many cases, it will not strictly be necessary, but as `_RemoveFromVariable()` will notice and do nothing if we have already been removed, it is not a problem.

Then we return the `status_t` we got from `thread_block` (which should also have been written to `fWaitStatus`), and we’re done.

#### A `Variable` performing a `Notify`

This is the most complicated case of all, because all of the possibilities for races and edge-cases we have discussed so far also have a counterpart somewhere in this function!

The primary implementation is in a method called `_NotifyLocked`, which is called with the `Variable`’s `fLock` already held (and thus interrupts are also disabled.)

```cpp
void
ConditionVariable::_NotifyLocked(bool all, status_t result)
{
	while (ConditionVariableEntry* entry = fEntries.RemoveHead()) {
```

Most of this implementation takes place inside a loop, because we might be notifying multiple `Entry`s at once. (If we are not, i.e. `all` is `false`, we will simply `break` at the end of the loop.)

We begin, as you can see here, by removing the `Entry` from the `fEntries` list.

Things then continue much like `Entry`’s `_RemoveFromVariable` method began: by getting-and-setting the `Entry`’s `fThread` member variable to `NULL`.

```cpp
		Thread* thread = atomic_pointer_get_and_set(&entry->fThread, (Thread*)NULL);
```

Unlike the `Entry`’s implementation, we actually store the fetched `Thread*`. Now we have two possibilities: either the thread is `NULL`, or it is not. We handle the former case first.

```cpp
		if (thread == NULL) {
			const int32 oldCount = atomic_get(&fEntriesCount);
			atomic_pointer_set(&entry->fVariable, (ConditionVariable*)NULL);

			while (atomic_get(&fEntriesCount) == oldCount)
				cpu_pause();
		}
```

If `thread == NULL`, then the entry must be in the process of trying to remove itself from us. However, at the beginning of the loop, we already removed it from `fEntries`, so there is nothing left there for it to do. But we need the other thread to recognize *and* acknowledge this fact, so that the `Entry` thread has no references whatsoever to this `Variable` by the time we return from this method (as, e.g., it is perfectly possible that this `Variable` will be destroyed immediately after we return, and then the `Entry` would commit a use-after-free if it still had such a reference.)

Thus, we fetch the current `fEntriesCount`, then set `fVariable` to `NULL`, and then spin until we see `fEntriesCount` decremented. As `fEntriesCount` is only modified while the `Variable`’s `fLock` is held (though, notably as in this very case, *not* always by the thread which holds that lock), we can be sure that nothing else will change it in the interim; and when it is decremented, we know this means the `Entry` no longer has a reference to us.

At this point, there is nothing left to be done in that case; the `Entry` was already awake and had no need to be woken up further. Thus we move on to:

```cpp
		else /* thread != NULL */ {
			SpinLocker schedulerLocker(thread->scheduler_lock);
			status_t lastWaitStatus = entry->fWaitStatus;
			entry->fWaitStatus = result;

			if (lastWaitStatus == STATUS_WAITING && thread->state != B_THREAD_WAITING) {
				thread_unblock_locked(thread, result);
				lastWaitStatus = result;
			}
```

The first thing we do in this case is to acquire the thread’s scheduler lock, to prevent any changes to whether it is awake or asleep while we perform the next steps. We then fetch the `Entry`’s `fWaitStatus`, and overwrite it with the new `result` we were passed.

If we were doing things simply, we would then just invoke `thread_unblock` on the condition only that `lastWaitStatus == STATUS_WAITING`, and no others. But, as it happens, `thread_unblock` is a relatively expensive operation, and in testing it was determined that the `Entry` thread can actually wind up waiting for the `Variable` thread to complete operations, if it is unblocked early on.

So, we have an optimization: if the thread is fully asleep, we can defer invoking `thread_unblock` until all other operations have been completed. But if it is not (i.e. `thread->state != B_THREAD_WAITING`), we have to invoke `thread_unblock` *before* we unset the `Entry`’s `fVariable`, as once that is unset, the `Entry` thread is perfectly free to go do anything else, including re-block itself on something else entirely, which we would be interfering with if we invoked `thread_unblock` on it at that point.

Hence, we perform the `thread_unblock` only in one particular case here, and unset `lastWaitStatus` to indicate to ourselves that the `thread_block` was already performed.

```cpp
			atomic_pointer_set(&entry->fVariable, (ConditionVariable*)NULL);
			atomic_add(&fEntriesCount, -1);
```

No matter what the `Entry` thread is presently doing (awake, asleep, etc.): as we were the ones to unset its `fThread`, we are thus also the ones responsible for decrementing `fEntriesCount`. In case the `Entry` thread is already awake and trying to remove itself, it will (as seen in `_RemoveFromVariable`) notice that `fThread` was `NULL`, and will be spinning until it sees that its `fVariable` has become `NULL`, indicating that the `fVariable` no longer has a reference to it.

Finally, we re-check `lastWaitStatus`: if it is still `STATUS_WAITING`, then we have not yet invoked `thread_unblock`, so we do that here; and that concludes this case, too.

```cpp
			if (lastWaitStatus == STATUS_WAITING)
				thread_unblock_locked(thread, result);
		}
```

Finally, we are back in the main loop, having completed operations for a single `Entry`. There is only one thing left to do:

```cpp
		if (!all)
			break;
	}
}
```

And that’s it!

## Conclusion

Hopefully, this tour of thread synchronization primitives, condition variables, and then the new implementation of them I designed and implemented, has proved interesting, informative, and perhaps even educational. If you have reached the end, but still want to read more, you can take a look at [the source file](https://github.com/haiku/haiku/blob/master/src/system/kernel/condition_variable.cpp) (and its accompanying [header file](https://github.com/haiku/haiku/commits/master/headers/private/kernel/condition_variable.h)) that the implementation is contained within, and also the [commit history](https://github.com/haiku/haiku/commits/master/src/system/kernel/condition_variable.cpp) of that same file, where some of the trial-and-error development process of these algorithms can be seen (a bunch of it merely related to tuning the “deadlock detection” logic in the spin loops, which has been omitted from this article for brevity.)

If you appreciated this article or the code it contains, please consider [donating to Haiku, Inc.](https://www.haiku-inc.org/), under whose sponsorship I wrote both. Thank you!