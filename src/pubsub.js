void function(ns) {
'use strict';

var pubsub = function() {
	// private variables
	var events = {},
	expando = 'ps' + ("" + Math.random()).substr(2),
	guid = 0;

	// private functions
	function newq(event)
	{
		/*jshint boss:true */
		return events[event] = {};
	}

	function queue(event)
	{
		var key = '$' + event;

		return events[key] || newq(key);
	}

	function add(event, fn)
	{
		var q = queue(event),
		id = fn[expando];

		if (id === void 0) {
			id = fn[expando] = ++guid;
		}

		// new function overrides the old
		q[id] = fn;
	}

	function remove(event, fn)
	{
		var q = queue(event);

		if (fn === void 0) {
			newq(event);
		} else {
			delete q[fn[expando]];
		}
	}

	return {
		on: function(event, fn) {
			add(event, fn);
		},
		one: function(event, fn) {
			var wrapper = function() {
				fn.apply(fn, arguments);
				remove(event, fn);
			};

			// wrapper function shares guid with fn
			wrapper[expando] = fn[expando] || (fn[expando] = ++guid);

			add(event, wrapper);
		},
		off: function(event, fn) {
			remove(event, fn);
		},
		trigger: function(event) {
			var q = queue(event);
			for (var id in q) {
				if (q.hasOwnProperty(id)) {
					q[id].apply(q[id], arguments);
				}
			}
		}
	};
};

if (typeof exports === 'object') {
	module.exports = pubsub();
} else if (typeof define === 'function' && define.amd) {
	define(pubsub);
} else {
	ns.PubSub = pubsub;
}

}((typeof window === 'object' && window) || this);
