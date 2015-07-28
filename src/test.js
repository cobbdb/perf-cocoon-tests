var Benchmark = require('benchmark'),
    suite = Benchmark.Suite();

/**
 * TODO: Test is Dragon.PI is faster
 * than Math.PI
 */

var i, harness = [], mymath = {
    PI: 3.14159,
    PI2: 6.28318
};
function dosetup() {
    harness = [];
    for (i = 0; i < 1000; i += 1) {
        harness[i] = {
            byswitch: function (term) {
                switch (term) {
                    case 'red':
                        return 'apple';
                    case 'pink':
                        return 'heart';
                    default:
                        return 'not found';
                }
            },
            byif: function (term) {
                if (term === 'red') {
                    return 'apple';
                } else if (term === 'pink') {
                    return 'heart';
                } else {
                    return 'not found';
                }
            }
        };
    }
}

// add tests
suite.
    add('by switch', {
        setup: dosetup,
        fn: function () {
            var i, len = harness.length, pivot, temp;
            for (i = 0; i < len; i += 1) {
                pivot = harness[i];
                temp = pivot.byswitch('sdf');
            }
        }
    }).
    add('by if', {
        setup: dosetup,
        fn: function () {
            var i, len = harness.length, pivot, temp;
            for (i = 0; i < len; i += 1) {
                pivot = harness[i];
                temp = pivot.byif('sdf');
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
