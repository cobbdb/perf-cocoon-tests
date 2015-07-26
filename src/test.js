var Benchmark = require('benchmark'),
    suite = Benchmark.Suite();

var i, harness = [], stuff;
for (i = -10; i < 10; i += 0.01) {
    harness[i] = {
        a: [i, i*2, i*3],
        b: [i*3, i*4, i*5],
        c: i*6,
        concat: function () {
            return [].concat(a, b, c);
        },
        push: function () {
            return [].push.apply(
        }
    };
}

// add tests
suite.
    add('math', {
        fn: function () {
            var i, len = harness.length, pivot, temp;
            for (i = 0; i < len; i += 1) {
                pivot = harness[i];
                temp = pivot.math();
            }
        }
    }).
    add('manual', {
        fn: function () {
            var i, len = harness.length, pivot, temp;
            for (i = 0; i < len; i += 1) {
                pivot = harness[i];
                temp = pivot.manual();
            }
        }
    }).
    on('cycle', function (event) {
        console.log(String(event.target));
    }).
    on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    }).
    run();
