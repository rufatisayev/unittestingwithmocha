var assert = require('assert')

var should = require('chai').should()
describe('Basic Mocha Test', function() {
    it('should check object', function() {
        var obj = {name: 'testName'}
        var obj1 = {name: 'testName1'}
        var simpleObject = null
        obj.should.have.property('name')
        obj.should.have.property('name').equal('testName')
        obj.should.deep.not.equal(obj1)
        should.not.exist(simpleObject)
    })
})