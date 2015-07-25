var Benchmark = require('benchmark'),
    suite = Benchmark.Suite();

var i, harness = [];
for (i = -10; i < 10; i += 0.01) {
    harness[i] = i;
}
var newMath = {
    abs: function (num) {
        return num < 0 ? -num : num;
    },
    floor: function (num) {
        return num | num;
    },
    floor0: function (num) {
        return num | 0;
    }
};

// add tests
suite.
    add('Math.abs()', {
        fn: function () {
            var i, len = harness.length, pivot, temp;
            for (i = 0; i < len; i += 1) {
                pivot = harness[i];
                temp = Math.abs(pivot);
            }
        }
    }).
    add('newMath.abs()', {
        fn: function () {
            var i, len = harness.length, pivot, temp;
            for (i = 0; i < len; i += 1) {
                pivot = harness[i];
                temp = newMath.abs(pivot);
            }
        }
    }).
    add('Math.floor()', {
        fn: function () {
            var i, len = harness.length, pivot, temp;
            for (i = 0; i < len; i += 1) {
                pivot = harness[i];
                temp = Math.floor(pivot);
            }
        }
    }).
    add('newMath.floor()', {
        fn: function () {
            var i, len = harness.length, pivot, temp;
            for (i = 0; i < len; i += 1) {
                pivot = harness[i];
                temp = newMath.floor(pivot);
            }
        }
    }).
    add('newMath.floor0()', {
        fn: function () {
            var i, len = harness.length, pivot, temp;
            for (i = 0; i < len; i += 1) {
                pivot = harness[i];
                temp = newMath.floor0(pivot);
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
