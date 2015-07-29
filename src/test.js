var Benchmark = require('benchmark'),
    suite = Benchmark.Suite();

/**
 * TODO: Test is Dragon.PI is faster
 * than Math.PI
 */

var i, j,
    harness = [];
function dosetup() {
    harness = [];
    for (i = 0; i < 1000; i += 1) {
        if (i % 2 === 0) {
            harness[i] = function () {};
        } else {
            harness[i] = [
                function () {},
                function () {}
            ];
        }
    }
}

function toArray(item) {
    if (item) {
        return item.push ? item : [item];
    }
    return [];
}
function concat() {
    var i, len = arguments.length,
        pivot, arr;
    if (arguments[0].push) {
        arr = arguments[0];
        i = 1;
    } else {
        arr = [];
        i = 0;
    }
    for (i; i < len; i += 1) {
        pivot = arguments[i];
        if (pivot || pivot === 0 || pivot === '') {
            if (pivot.push) {
                arr.push.apply(arr, pivot);
            } else {
                arr.push(pivot);
            }
        }
    }
    return arr;
}

// add tests
suite.
    add('concat', {
        setup: dosetup,
        fn: function () {
            var i, len = harness.length, pivot, temp;
            for (i = 0; i < len; i += 1) {
                pivot = harness[i];
                temp = [].concat(pivot, pivot);
            }
        }
    }).
    add('detect', {
        setup: dosetup,
        fn: function () {
            var i, len = harness.length, pivot, temp;
            for (i = 0; i < len; i += 1) {
                pivot = harness[i];
                temp = toArray(pivot);
            }
        }
    }).
    add('manual', {
        setup: dosetup,
        fn: function () {
            var i, len = harness.length, pivot, temp;
            for (i = 0; i < len; i += 1) {
                pivot = harness[i];
                temp = concat(pivot, pivot);
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
