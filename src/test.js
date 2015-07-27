var Benchmark = require('benchmark'),
    suite = Benchmark.Suite();

/**
 * TODO: Test is Dragon.PI is faster
 * than Math.PI
 */

var i, harness = [];
function dosetup() {
    harness = [];
    for (i = 0; i < 1000; i += 1) {
        harness[i] = {
            arr: new Array(5000),
            go: function () {
                return 123;
            }
        };
    }
}

// add tests
suite.
    add('withsplice', {
        setup: dosetup,
        fn: function () {
            var i, len = harness.length, pivot, temp;
            for (i = 0; i < len; i += 1) {
                if (i % 2 === 0) {
                    temp = harness[i].go();
                    harness.splice(i, 1);
                    i -= 1;
                    len -= 1;
                }
            }
        }
    }).
    add('withdupe', {
        setup: dosetup,
        fn: function () {
            var i, len = harness.length, pivot, temp, dupe = [];
            for (i = 0; i < len; i += 1) {
                if (i % 2 === 0) {
                    temp = harness[i].go();
                } else {
                    dupe.push(harness[i]);
                }
            }
            harness = dupe;
        }
    }).
    on('cycle', function (event) {
        console.log(String(event.target));
    }).
    on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    }).
    run();
