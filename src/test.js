var Benchmark = require('benchmark'),
    suite = Benchmark.Suite();

/**
 * TODO: Test is Dragon.PI is faster
 * than Math.PI
 */

var i, harness = [], stuff;
for (i = -10; i < 10; i += 0.01) {
    harness[i] = {
        arr: new Array(5000).join('XXXX'),
        one: function (arr) {
            return new Array(5000).join('XXXX');
        },
        empty: function () {
            return new Array(5000).join('XXXX');
        }
    };
}

// add tests
suite.
    add('empty', {
        fn: function () {
            var i, len = harness.length, pivot, temp, arr;
            for (i = 0; i < len; i += 1) {
                pivot = harness[i];
                arr = pivot.arr;
                temp = pivot.empty();
            }
        }
    }).
    add('one', {
        fn: function () {
            var i, len = harness.length, pivot, temp, arr;
            for (i = 0; i < len; i += 1) {
                pivot = harness[i];
                arr = pivot.arr;
                temp = pivot.full(arr);
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
