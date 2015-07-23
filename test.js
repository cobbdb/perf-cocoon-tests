﻿var Benchmark = require('benchmark'),
    suite = Benchmark.Suite();

var i, harness = [];
for (i = 0; i < 100; i += 1) {
    harness[i] = {
        getname: function () {
            return this.name + 'test action';
        }
    };
    harness[i].bound = harness[i].getname.bind({
        name: 'bob'
    });
    harness[i].called = getcall(harness[i]);
}
function getcall(test) {
    return function () {
        test.getname.call({
            name: 'bob'
        });
    };
}

// add tests
suite.
    add('bound', {
        fn: function () {
            var i, len = harness.length, pivot;
            for (i = 0; i < len; i += 1) {
                pivot = harness[i];
                pivot.bound();
            }
        }
    }).
    add('called', {
        fn: function () {
            var i, len = harness.length, pivot;
            for (i = 0; i < len; i += 1) {
                pivot = harness[i];
                pivot.called();
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
