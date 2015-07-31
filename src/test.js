var Benchmark = require('benchmark'),
    suite = Benchmark.Suite();

function dosetup() {
    var i,
        data = {};

    function forIn(root, map) {
        var i,
            keys = Object.keys(root),
            len = keys.length;
        for (i = 0; i < len; i += 1) {
            map(keys[i]);
        }
    }

    for (i = 0; i < 20; i += 1) {
        data[i] = '' + i;
    }
}

// add tests
suite.
    add('for.. in', {
        setup: dosetup,
        minSamples: 100,
        fn: function () {
            var key, temp;
            for (key in data) {
                temp = data[key];
            }
        }
    }).
    add('for keys()', {
        setup: dosetup,
        minSamples: 100,
        fn: function () {
            var key, keys, len, i, temp;

            keys = Object.keys(data);
            len = keys.length;

            for (i = 0; i < len; i += 1) {
                key = keys[i];
                temp = data[key];
            }
        }
    }).
    add('manual forIn', {
        setup: dosetup,
        minSamples: 100,
        fn: function () {
            var temp;
            forIn(data, function (key) {
                temp = data[key];
            });
        }
    }).
    on('cycle', function (event) {
        console.log(String(event.target));
    }).
    on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    }).
    run();
