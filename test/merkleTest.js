/* test/sum.js */

var rewire = require('rewire');
var merkle = rewire('../merkle.js');
var assert = require('chai').assert;

describe('#readRow()', function() {

    context('without arguments', function() {
        it('should equals', function() {
            readRow = merkle.__get__('readRow');
            data  = 'Row1';
            rowcount = 1;

            dat = {};
            dat.total = rowcount;
            dat.target = Math.ceil(Math.log(dat.total)/Math.log(2));
            dat.extras = Math.pow(2, dat.target) - dat.total;
            dat.file = 'mockFile';
            dat.indexIndex = res.join(".");

            dat.jsonhasharray = new Array();
            dat.merkleroot = "";

            assert.strictEqual(readRow(data, dat, rowcount), "", "Not equal")
        })
    })

    // context('with number arguments', function() {
    //     it('should return sum of arguments', function() {
    //         expect(sum(1, 2, 3, 4, 5)).to.equal(15)
    //     })
    //
    //     it('should return argument when only one argument is passed', function() {
    //         expect(sum(5)).to.equal(5)
    //     })
    // })
    //
    // context('with non-number arguments', function() {
    //     it('should throw error', function() {
    //         expect(function() {
    //             sum(1, 2, '3', [4], 5)
    //         }).to.throw(TypeError, 'sum() expects only numbers.')
    //     })
    // })

})