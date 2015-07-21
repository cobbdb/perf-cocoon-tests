var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

var i, harness = [];
for (i = 0; i < 100; i += 1) {
    harness.push({
        setname: function (name) {
            this.name = name;
        },
        applysetname: function () {
            this.setname.apply(this, arguments);
        }
    });
}

// add tests
suite.
    add('direct: for', function () {
        var i, len = harness.length, pivot;
        for (i = 0; i < len; i += 1) {
            pivot = harness[i];
            pivot.setname('bob');
        }
    }).
    add('direct: for len-inner', function () {
        var i, pivot;
        for (i = 0; i < harness.length; i += 1) {
            pivot = harness[i];
            pivot.setname('bob');
        }
    }).
    add('direct: forEach', function () {
        harness.forEach(function (pivot) {
            pivot.setname('bob');
        });
    }).
    add('apply: for', function () {
        var i, len = harness.length, pivot;
        for (i = 0; i < len; i += 1) {
            pivot = harness[i];
            pivot.applysetname('bob');
        }
    }).
    add('apply: for len-inner', function () {
        var i, pivot;
        for (i = 0; i < harness.length; i += 1) {
            pivot = harness[i];
            pivot.applysetname('bob');
        }
    }).
    add('apply: forEach', function () {
        harness.forEach(function (pivot) {
            pivot.applysetname('bob');
        });
    }).
    on('cycle', function (event) {
        console.log(String(event.target));
    }).
    on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    }).
    run({
        async: true
    });
