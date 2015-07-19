var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

var harness = {
    setname: function (name) {
        this.name = name;
    },
    applysetname: function () {
        this.setname.apply(this, arguments);
    }
};

harness.boundsetname = harness.setname.bind(harness);
harness.dobsn = function () {
    harness.boundsetname.apply(harness, arguments);
};

// add tests
suite.
    add('direct exec', function () {
        harness.setname('bob');
    }).
    add('apply', function () {
        harness.setname.apply(harness, ['bob']);
    }).
    add('call', function () {
        harness.setname.call(harness, 'bob');
    }).
    add('bind', function () {
        harness.boundsetname('bob');
    }).
    add('apply w/ args', function () {
        harness.applysetname('bob');
    }).
    add('bind w/ args', function () {
        harness.dobsn('bob');
    }).
    // add listeners
    on('cycle', function (event) {
        console.log(String(event.target));
    }).
    on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    }).
    // run async
    run({
        async: true
    });
