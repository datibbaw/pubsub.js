test('Basic test', function() {
  var pubsub = datibbaw.PubSub();

	var hits = 0,
	hitter = function(event, data) {
		equal(event, 'test', 'Passed');
		hits += data;
	};

	pubsub.on('test', hitter);
	pubsub.trigger('test', 12);
	pubsub.trigger('test', 10);

	equal(hits, 22, "Subscriber called twice");
});

test('.once()', function() {
	var pubsub = datibbaw.PubSub();

	var hits = 0,
	hitter = function(event, data) {
		equal(event, 'test', 'Passed');
		hits += data;
	};

	pubsub.one('test', hitter);
	pubsub.trigger('test', 12);
	pubsub.trigger('test', 10);

	equal(hits, 12, "Subscriber called once");
});

test('.off()', function() {
	var pubsub = datibbaw.PubSub();

	var hits = 0,
	hitter = function(event, data) {
		equal(event, 'test', 'Passed');
		hits += data;
	};

	pubsub.on('test', hitter);
	pubsub.trigger('test', 12);
	pubsub.off('test', hitter);
	pubsub.trigger('test', 10);

	equal(hits, 12, "Subscriber called once");
});

test('Modified Object prototype', function() {
	var pubsub = datibbaw.PubSub(),
	hits = 0,
	p = Object.prototype;

	p.x = function(event, data) {
		hits += data;
	};

	pubsub.trigger('test', 10);

	equal(hits, 0, "Passed");

	delete p.x;
});

test('Special events', function() {
	var pubsub = datibbaw.PubSub(),
	hits = 0,
	p = Object.prototype,
	hitter = function(event, data) {
		hits += data;
	}

	pubsub.on('constructor', hitter);

	var x = {};

	strictEqual(x.constructor[hitter.guid], void 0, "Passed");

	delete x.constructor[hitter.guid];
});
