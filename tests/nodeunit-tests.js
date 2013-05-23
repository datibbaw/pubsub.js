module.exports = (function(datibbaw) {

return {

basic: function(test) {
  var pubsub = datibbaw.PubSub();

	var hits = 0,
	hitter = function(event, data) {
		test.equal(event, 'test', 'Passed');
		hits += data;
	};

	pubsub.on('test', hitter);
	pubsub.trigger('test', 12);
	pubsub.trigger('test', 10);

	test.equal(hits, 22, "Subscriber called twice");

	test.done();
},

'.once()': function(test) {
	var pubsub = datibbaw.PubSub();

	var hits = 0,
	hitter = function(event, data) {
		test.equal(event, 'test', 'Passed');
		hits += data;
	};

	pubsub.one('test', hitter);
	pubsub.trigger('test', 12);
	pubsub.trigger('test', 10);

	test.equal(hits, 12, "Subscriber called once");

	test.done();
},

'.off()': function(test) {
	var pubsub = datibbaw.PubSub();

	var hits = 0,
	hitter = function(event, data) {
		test.equal(event, 'test', 'Passed');
		hits += data;
	};

	pubsub.on('test', hitter);
	pubsub.trigger('test', 12);
	pubsub.off('test', hitter);
	pubsub.trigger('test', 10);

	test.equal(hits, 12, "Subscriber called once");

	test.done();
},

'Modified Object prototype': function(test) {
	var pubsub = datibbaw.PubSub(),
	hits = 0,
	p = Object.prototype;

	p.x = function(event, data) {
		hits += data;
	};

	pubsub.trigger('test', 10);

	test.equal(hits, 0, "Passed");

	delete p.x;

	test.done();
},

'Special events': function(test) {
	var pubsub = datibbaw.PubSub(),
	hits = 0,
	p = Object.prototype,
	hitter = function(event, data) {
		hits += data;
	};

	pubsub.on('constructor', hitter);

	var x = {};

	test.strictEqual(x.constructor[hitter.guid], void 0, "Passed");

	delete x.constructor[hitter.guid];

	test.done();
}

};

})((typeof require == "function" && {PubSub: require('../src/pubsub.js')}) || this);
