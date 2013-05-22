(function(ns) {
'use strict';

ns.PubSub = function() {
	// private variables
	var events = {},
	expando = 'ps' + ("" + Math.random()).substr(2),
	guid = 0;

	// private functions
	function newq(event)
	{
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

}(window.datibbaw = window.datibbaw || {}));
