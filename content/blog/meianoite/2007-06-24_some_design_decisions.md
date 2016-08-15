+++
type = "blog"
author = "meianoite"
title = "Some design decisions"
date = "2007-06-24T22:39:30.000Z"
tags = ["scheduler", "gsoc", "scheduling algorithm", "algorithm", "O(1)", "complexity", "data structure", "multiprocessor", "affinity", "fairness", "real time", "CFS", "Linux", "comparison", "threads", "responsiveness"]
+++

<i>(Or: knitting a delicate fabric, part I: the wool<a href="#note1">[1]</a>)</i>
<blockquote>I sincerely hope you've read <a href="/blog/meianoite/2007-06-17/introduction_to_the_new_haiku_scheduler_and_other_tidbits#disclaimer">the disclaimer</a> by now, but I guess I'd better link to it anyway :) Thanks.</blockquote>

I spent <a href="/blog/meianoite/2007-06-22/going_back_to_the_basics_kinda">the better part of the last post</a> explaining how simple strides would <a href="http://en.wikipedia.org/wiki/Heuristic_%28computer_science%29#Heuristic_algorithms">yield an approximation</a> of the ideal shuffling of tickets. What I didn't explain, however, was why the hell am I insisting on using tickets when strides/passes <a href="/blog/meianoite/2007-06-22/going_back_to_the_basics_kinda#stride">avoids those issues</a> completely.

Well, the thing is, I didn't ditch my previous attempt completely. It <a href="/blog/meianoite/2007-06-17/the_first_or_nth_even_attempt_a_cautionary_tale#flaw">had flaws</a>, but there were some gems there as well. I don't know a single programmer who can't recognise it's possible to find sound ideas and really clever excerpts of code even when, on the whole, the code was crap.

(Yes, programmers and software architects are a proud bunch of people.)

And tickets are making a comeback, but in a very different context.

Anyway, suppose we're starting with a clean slate, and all we have so far are the tasks and their respective priorities. Now let's scribble a little in that slate :)<!--break-->

Remember our application domain: scheduling threads. The implementation I have considered so far works like this:

We would have several <i>thread queues</i>, one per priority, and one of these per CPU<a href="#note2">[2]</a>. There would be 120 of those on Haiku, times the number of CPUs. I'll call them <code>PQ</code>, for <i>priority queue</i>s.

Let's make a little differentiation here: 20 out of those 120 are reserved to real-time threads. The other 100 are for non-RT threads. So, for now, let's separate the scheduling jobs in two "realms": <b>RT</b> and <b>non-RT</b>.

For the sake of simplicity, <a href="/blog/meianoite/2007-06-17/the_first_or_nth_even_attempt_a_cautionary_tale#note2">whenever <b>RT</b> threads are ready, they're chosen, priority order</a>. <i>That simple</i>.

Now let's take care of the non-RT realm:

We only care about <i>active</i> queues, i.e., those which have ready threads queued. Most times, however, we don't need allocate space for every queue; using more than 10 queues is actually pretty rare. Should we really decide that SMP will be implemented with per-CPU queues (all 120 of them... times # of CPUs!), wasting this space makes me feel somewhat sloppy. Same thing with hash tables: they'll be either space-inefficient or too small to bring any real benefits.

Axel told me not to worry about this, though, and that for the time being it's better to be on the safe side and preallocate all the memory we should ever need. If we ever feel the need to manage that memory dynamically, for instance if we end up needing to support hundreds of cores, we can adapt the algorithm easily.

Anyway, under any circumstances we'd better come up with a dynamic, compact and versatile data structure. Well, arrays are compact, we could simply <i>place the queues where they belong</i> and use a bitmap to control active/inactive queues.

But that's not very cache-friendly, though. If the queues are mostly sparse, loading one won't bring others into a cache line, and when you're trying to compare queues and decide which one is a better candidate, this <i>is</i> desirable.

We could place the queues all together in the front of the array, then. But now we must take into account the fact that queues, like the threads they contain, can come and go any time, and I feel that insertions in the middle of such array of queues will be far more common than insertions in the end. Insertions will then require moving up to O(q) queues. We could potentially use some <code>memcpy</code> tricks, but I don't know if it's worth the effort, not to mention that if we ever go the dynamic memory management route, memory fragmentation is almost certain to happen as we would allocate and deallocate memory every time a queue is destroyed and almost every time queue is created and must be inserted in the array, as the premise was to keep the structure compact. Hugo's slab allocator would come in handy, but... Well, abusing it to implement resizing arrays, in kernel land, and to use it in the thread scheduler, which suggests that insertions and removals will happen frequently, well, that's still a hack. And an ugly one which I'd rather avoid <b>RIGHT NOW</b>.

Let's examine the other options which can still use the consolidated block of memory we would otherwise access like arrays. Linked lists solve the issue of having a successor node that's not necessarily adjacent in memory, so they're less of a hack than the situation pictured above with dynamically resizing arrays and whatnot. But finding the insertion point still takes O(q) (i.e., up to 100 comparisons in the worst case). Eeeh...

So... Trees? Well, trees should be OK. Red-black trees<a href="#note3">[3]</a> are nice, as they're self-balancing and will keep the amortized cost of any operation O(lg q); in the worst case we'd have 100 non-RT active queues, so any queue operations (insertion, deletion, search) are always going to be upper-bounded by O(7), which reduces to O(1). Nice!!

Now how can we relate that to strides, so we have fair scheduling?

Suppose we keep account of the sum of the priorities of each queue in a variable, which we already called <code>SoP</code> back in the last post. Let variable <code>Stride</code> be... the stride. All the array ever did was mapping the numeric index of a position to the corresponding task. So index 1 mapped to A, index 2 and 3 mapped to B, and index 3 to 6 mapped to C. If we could emulate that with just <code>SoP</code> and <code>Stride</code>, we can do away with that potentially large array altogether. Well, producing numeric indexes (i.e., tickets) is completely trivial:

<code>index = ((index + Stride) % SoP) + 1</code>

Mapping them, however, is a little tricky.

Let's go back to the array model. <b>Instead of placing tasks multiple times on the array to simulate multiple tickets, we could simply store triples</b> (think <i>struct</i>s) comprised of:
<code>(task, offset, priority)</code>
our array would become
<code>(A, 0, 1), (B,1,2), (C, 3, 3)</code>

Notice that <code>offset(K) = offset(predecessor(K)) + priority(predecessor(K))</code>.

In our example, index will vary from 1 to 6, and mappings would work like this:

<ol>
<li><code>Let T be the first node.</code></li>
<li><code>If T.offset &lt; index &lt;= (T.offset + T.priority), then return T.</code></li>
<li><code>Else, let T be the next node, and go to step 2.</code></li>
</ol>

That's very na&iuml;ve, but would work fine.

We have a couple options here. Either we store computed offsets within the nodes, or we compute them on demand.

Drawback of first option: upon insertion, we must adjust every offset from nodes ahead of the insertion point.
Drawback of second option: we must recursively visit every predecessor node to compute the offset.

A little observation here couldn't hurt: we don't have to keep the nodes ordered! We can always insert at the tail! So computed offsets are the way to go!

Eeeh... Not that fast. Consider deletions. They will <b>FREQUENTLY</b> occur in the middle of the list. Worse: they will frequently occur in the head as well. So we still need to propagate offset deltas to successor nodes. That's still O(q). So not keeping the order is doing buying us very little; we now have two O(q) operations instead of three.

But we have already decided to use balanced binary trees so that every operation is O(lg q) and therefore bounded to O(7) in our case, haven't we? I'm glad we did!

Why?

Well, consider this 4-uple (<i>struct</i> with 4 elements... you know. And notice the "subtle" change from <code>task</code> to <code>PQ</code>; more on that very very shortly):

<code>(PQ, offset, priority, # of threads)</code>

This 4-uple differs from the <code>(task, offset, priority)</code> triple in that step 2 in the mapping function will now become (variable names adjusted accordingly):

<ol start="2">
<li><code>If PQ.offset &lt; index &lt;= (PQ.offset + PQ.priority * PQ.#threads), then return PQ.</code></li>
</ol>


And the offset rule now becomes

<code>offset(K) = offset(predecessor(K)) + priority(predecessor(K)) * no_of_threads(predecessor(K))</code>

Why would I do that? Well, we will use the tree to store <b>the queues</b>, not the threads, and this brings a number of benefits: the tree is kept compact; it doesn't change shape nearly as frequently as if the threads were the stored elements, and this is great for reaping cache effects; threads are picked from the queues in FIFO order, and that will naturally give us round-robin scheduling when we consider the queue in isolation.

"Boosting" the queue's priority by simply multiplying it by the number of threads it holds has the exact same effect of using the threads as nodes, but it's much more space efficient, not to mention how it avoids messing with the tree on every insertion and removal of threads: if there is a corresponding queue in place already, the tree is largely untouched.

"Largely", you say? Yes. The only reason it is not completely untouched is that we must take the offsets into account. The shape won't change, but auxiliary data kept on a node might.

<i>Ah... Those damned offsets</i>. Sigh.

But I managed to avoid having to explicitly propagate them to the successors and not recursively recompute them using the predecessors. How? Using one of the oldest tricks in the computer science: lazy evaluation!

(Well, here I can attest that knowing some functional programming and artificial intelligence techniques <b>really do pay off</b> when you least expect ;))

First, we must assert that there won't be bogus deletions, i.e., we won't try to remove nodes that are not on the tree. Well, easy enough: removals only happen when there's only one thread in the priority queue, and we're removing that thread from the queue. So now the queue is empty, and this is the only situation that triggers a removal operation.

We must also ensure that when a node is inserted, it will push every successor <code>node.priority</code> units to the right. This is the same as adding <code>node.priority</code> to every successor's offset component. The key is to postpone pushing nodes around for as long as we can, so the pushing will accumulate and only be realised when necessary.

In order to use lazy evaluation, we must augment our node from a 4-uple to a 5-uple: <code>(PQ, offset, offset delta, priority, # of threads)</code>. Now every time we insert a node, we add three extra steps in the insertion routine:

<ol>
<li>if the current node <code>offset_delta</code> field is non-zero, add its value to the <b><code>offset</code></b> field of current node. Also add it to the <b><code>offset_delta</code></b> field of the left child node (when present) and right child node (when present).
</li>
<li>if the new (to be added) node will follow the path to the left child (i.e., has a lower priority than the current node), add <code>new_node.priority</code> to <code>current_node.offset</code> and <code>current_node.right.offset_delta</code>.
</li>
<li>when you find the point of insertion of new_node, remember to compute new_node.offset using the offset rule.
</li>
</ol>

Step (1) must be repeated in the search operation and in the deletion operation as well. Step (2) is only not required when searching (which is a lot already), and when deleting, it changes a little: you must now subtract <code>node_to_be_deleted.priority</code> from <code>current_node.offset</code> and <code>current_node.right.offset_delta</code>. Step (3) is only required when inserting.

That's it for inserting, searching for and removing <i>whole queues</i>. The adaptations necessary to insert/remove <i>threads</i> into/from the queues are left as an exercise for the reader ;)

The next post will discuss what's in place so far, and what the future holds.


<br><br>
Notes:
<ol>
<li>
<a name="note1"></a>Much love, Grandma!
</li>
<li>
<a name="note2"></a>I have some good reasons to do this, even though this kind of implementation is more commonly found on NUMA systems than commodity SMP implementations. I'll address this on the next blog post.
</li>
<li>
<a name="note3"></a>95% chance I'll adapt <a href="http://www.eternallyconfuzzled.com/jsw_home.aspx">Julienne Walker's</a> <a href="http://www.eternallyconfuzzled.com/tuts/datastructures/jsw_tut_rbtree.aspx">very sweet implementation</a> of red-black trees, unless someone comes up with a very strong objection. She put her code in the <i>public domain</i>, so there won't be licensing issues. BTW, I do own a copy of <a href="http://mitpress.mit.edu/catalog/item/default.asp?ttype=2&tid=8570">CLR</a>, and I still like her implementation better :)
</li>
</ol>

<br><br>
<blockquote>Don't miss the next chapter in the Scheduler saga! Tomorrow (hopefully), same bat time... Same <a href="/blog/meianoite">bat channel</a> (powered by <a href="/blog/1164/feed">RSS feeds</a>!)... <a href="/blog/meianoite">Right here</a>. Stay tuned.</blockquote>