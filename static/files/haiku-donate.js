// Copyright (c) 2010 Haiku Inc. All rights reserved.
// Distributed under the terms of the MIT License.
//
// Authors:
// 		 Alexander Botero-Lowry

$(function() {
	var methods = {
		"Amazon Payments":{
			"name":"Amazon Payments",
			"currencies":["USD"],
			"occuring":["One time"],
			"url":"https://authorize.payments.amazon.com/pba/paypipeline",
			"form":{"inputs":
				{
					'immediateReturn':"1",
					'collectShippingAddress':"0",
					'signature':"a5qs+FqRrNpjM2HOpxOHZbXJ9N6ueB/RWYhdb4D18v8=",
					'isDonationWidget':"1",
					'signatureVersion':"2",
					'signatureMethod':"HmacSHA256",
					'description':"This is a single donation to Haiku Inc.,"
						+ " with the purpose of supporting the development of Haiku.",
					'amazonPaymentsAccountId':"LXAYHLMCKMCLBF6VZCAFAP357P25KUHDC6S1IS",
					'accessKey':"11SEM03K88SD016FS1G2",
					'cobrandingStyle':"logo",
					'processImmediate':"1",
					'amount':'{amount}'
				},
			"method":"POST"
			}
		},
		"PayPal":{
			"name":"PayPal",
			"currencies":["USD","EUR"],
			"occuring":["One time", "Monthly"],
			"url":"{occuring}{amount}&currency_code={currency}&item_name={itemname}&no_note=1",
			"prop_map":{
				"occuring":{
					"One time":"https://www.paypal.com/us/cgi-bin/webscr?cmd=_donations&business=donations@haiku-os.org&amount=",
					"Monthly":"https://www.paypal.com/subscriptions/business=donations@haiku-os.org&no_shipping=1&no_note=1&p3=1&t3=M&src=1&sra=1&a3="
				},
				"itemname":function (a) {
					var oc = $('#form-occuring').val();
					if (oc == "One time") {
						return "A+single+donation+to+Haiku+Inc";
					} else if (oc == "Monthly") {
						return "Automatic+monthly+donations+to+Haiku+Inc";
					}
					return '';
				}
			}
		}
	};

	var indexes = {
		'currencies':{},
		'occuring':{}
	};

	var feature_map = {
		'One time':'&nbsp;<img src="/files/images/donation_once_32.png" alt="One-time donation" title="One time donation">',
		'Monthly':'&nbsp;<img src="/files/images/donation_infinity_32.png" alt="Monthly donation" title="Automatic monthly donation">',
		'USD':'&nbsp;<img src="/files/images/donation_usd_32.png" alt="USD" title="USD Currency">',
		'EUR':'&nbsp;<img src="/files/images/donation_eur_32.png" alt="EUR" title="EUR Currency">'
	};

	var over = [['currency', 'currencies'], ['occuring', 'occuring']];

	function features(m) {
		var fts = $('<div class="features"></div>');

		for (var i = 0; i < over.length; i++) {
			for (var j = 0; j < m[over[i][1]].length; j++) {
				fts.append(feature_map[m[over[i][1]][j]]);
			}
		}
		return fts;
	}

	function validateAmount(amount){
		if(amount.match( /^[0-9]+(\.([0-9]+))?$/)){
			if(amount < 1.00){
				alert('You must donate at least 1.00.');
				return false;
			}
			return true;
		}else{
			alert('You must enter a valid donation.');
			return false;
		}
	}

	function make_method(m) {
		var box = $('<div class="provider" style="display: inline-block; margin: 16px;"></div>');
		box.append('<input type="radio" value="'+m.name+
			'" class="form-providers" name="form-providers">&nbsp;</input>');
		//	'" class="form-providers" name="form-providers">&nbsp;'+m.name+'</input>');
		//box.append(features(m));
		box.append(m.name);
		box.append('<br />');
		for (var i = 0; i < over.length; i++) {
			for (var j = 0; j < m[over[i][1]].length; j++) {
				box.append(feature_map[m[over[i][1]][j]]);
			}
		}
		return box;
	}

	for (var a in methods) {
		var method = methods[a];
		$('#form-providers').append(make_method(method));
		for (var i = 0; i < over.length; i++) {
			var ov = over[i];

			for (var j=0; j < method[ov[1]].length; j++) {
				var val = method[ov[1]][j];
				if (val in indexes[ov[1]]) {
					indexes[ov[1]][val][method.name] = method;
				} else {
					$('#form-'+ov[0]).append('<option value="'+val+'">'+val+'</option>');
					indexes[ov[1]][val] = {};
					indexes[ov[1]][val][method.name] = method;
				}
			}
		}
	}

	$('#form-currency')
		.change(function (e) {
			var m = indexes.currencies[$(this).val()];
			var occuring = $('#form-occuring').val();
			$('.form-providers')
				.each(function () {
					var v = $(this).val();
					if (v in m) {
						var method = m[v];
						var disable = true;
						for (var i=0; i <method.occuring.length; i++) {
							if (method.occuring[i] == occuring)
								disable = false;
						}
						if (disable) {
							$(this).attr('disabled', true);
							$(this).parent("div.provider").fadeTo('slow', 0.5);
						} else {
							$(this).removeAttr('disabled');
							$(this).parent("div.provider").fadeTo('slow', 1);
						}
					} else {
						$(this).attr('disabled', true);
						$(this).parent("div.provider").fadeTo('slow', 0.5);
					}
				});
				// XXX should update occuring here
		});

	$('#form-occuring')
		.change(function (e) {
			var m = indexes.occuring[$(this).val()];
			var currency = $('#form-currency').val();
			$('.form-providers')
				.each(function () {
					var v = $(this).val();
					if (v in m) {
						var method = m[v];
						var disable = true;
						for (var i=0; i < method.currencies.length; i++) {
							if (method.currencies[i] == currency)
								disable = false;
						}
						if (disable) {
							$(this).attr('disabled', true);
							$(this).parent("div.provider").fadeTo('slow', 0.5);
						} else {
							$(this).removeAttr('disabled');
							$(this).parent("div.provider").fadeTo('slow', 1);
						}
					} else {
						$(this).attr('disabled', true);
						$(this).parent("div.provider").fadeTo('slow', 0.5);
					}
				});
				// XXX should update currency here
		});

	$('.form-providers')
		.change(function (e) {
			var method = methods[$(this).val()];
			for (var i=0; i < over.length; i++) {
				$('#form-'+over[i][0]+' > option')
					.each(function () {
						var v = $(this).val();
						var disable = true;
						for (var j = 0; j < method[over[i][1]].length; j++) {
							if (method[over[i][1]][j] == v)
								disable = false;
						}
						if (disable) {
							$(this).attr('disabled', true);
						} else {
							$(this).removeAttr('disabled');
						}
					});
				}
		});

	function map_property(prop_map, property, val) {
		if (typeof prop_map === 'undefined')
			return val;
		if ($.isFunction(prop_map[property])) {
			return prop_map[property](val);
		} else if (typeof prop_map[property] !== 'undefined') {
			return prop_map[property][val];
		} else {
			return val;
		}
	}

	$('#form-submit')
		.click(function (e) {
			var provider = $('.form-providers:checked').val();
			var url = methods[provider].url;
			var prop_map = methods[provider].prop_map;
			var form = methods[provider].form;

			var fixed_properties = {'occuring':true, 'currency':true, 'amount':true};
			var occuring = map_property(prop_map, 'occuring', $('#form-occuring').val());
			var currency = map_property(prop_map, 'currency', $('#form-currency').val());
			var amount = map_property(prop_map, 'amount', $('#form-amount').val());
			if (validateAmount(amount) == false ) {
				return false;
			}
			url = url.replace('{currency}', currency).replace('{amount}', amount).replace('{occuring}', occuring);
			for (var a in prop_map) {
				if (!(prop_map[a] in fixed_properties)) {
					url = url.replace('{'+a+'}', map_property(prop_map, a, ''));
				}
			}
			if (typeof form !== 'undefined') {
				var form_elem = $('<form method="'+form.method+'" action="'+url+'"></form>');
				for (var a in form.inputs) {
					var name = a;
					var value = form.inputs[a];
					value = value.replace('{currency}', currency)
						.replace('{amount}', amount)
						.replace('{method}', occuring);
					for (var a in prop_map) {
						if (!(prop_map[a] in fixed_properties)) {
							value = value.replace('{'+a+'}', map_property(prop_map, a, ''));
						}
					}
					form_elem.append('<input type="hidden" name="'+name+
						'" value="'+ value +'"></input>');
				}
				$(document.body).append(form_elem)
				form_elem.submit();
				return false;
			}
			window.location.href = url;
			return false;
		});
});
