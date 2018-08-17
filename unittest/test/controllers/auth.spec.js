var assert = require('assert')
var auth = require('../../controllers/auth.js')
var sinon = require('sinon')
var expect = require('chai').expect
var should = require('chai').should()
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()
var authController = new auth();

describe('AuthController', function() {
    beforeEach('for testing', function() {
        authController.setRoles(['user'])
    })
    describe('isAuthorized', function() {
        var user = {}
        beforeEach(function() {
            user = {
                roles: ['user'],
                isAuthorized: function(needRole) {
                    return this.roles.indexOf(needRole) >= 0
                }
            }
            sinon.spy(user, 'isAuthorized')
            authController.setUser(user)
        })
        it('Should return false if not authorized', function() {
            var isAuth = authController.isAuthorized('admin');
            // assert.equal(false, isAuth)
            user.isAuthorized.calledOnce.should.be.true
            expect(isAuth).to.be.false;
        })
        it.skip('Should return true if authorized', function() {
            authController.setRoles(['user','admin'])
            var isAuth = authController.isAuthorized('admin')
            assert.equal(true, isAuth)
            isAuth.should.to.be.true;
        })
        it('should return future')
    })

    describe('isAuthorizedAsync', function() {
        it('Should return false if not authorized', function(done) {
            this.timeout(2500); //Default timeout for mocha is 2000
            authController.isAuthorizedAsync('admin',
                function(isAuth) {
                    assert.equal(false, isAuth)
                    done()
                }
            )
        })
        it('Should return true if authorized', function(done) {
            this.timeout(2500); //Default timeout for mocha is 2000
            authController.setRoles(['user','admin'])
            authController.isAuthorizedAsync('admin',
                function(isAuth) {
                    assert.equal(true, isAuth)
                    done()
                }
            )
        })
    })

    describe('isAuthorizedPromise', function() {
        it('Should return false if not authorized', function() {
            return authController.isAuthorizedPromise('admin').should.eventually.be.false;
        })
    })

    describe('getIndex', function() {
        it('Should render index', function() {
            var req = {}
            var res = {
                render : sinon.spy()
            }
            authController.getIndex(req, res)
            res.render.calledOnce.should.be.true;
            res.render.firstCall.args[0].should.equal('index')
        })
    })

    describe('getIndexStub', function() {
        var user = {}
        beforeEach(function(){
            user = {
                roles: ['user'],
                isAuthorized: function(needRole) {
                    return this.roles.indexOf(needRole) >= 0
                }
            }
        })
        it('Should render admin', function() {
            var isAuth = sinon.stub(user, 'isAuthorized').returns(true)
            var req = {user:user}
            var res = {
                render : sinon.spy()
            }
            authController.getIndexStub(req, res)
            res.render.calledOnce.should.be.true;
            res.render.firstCall.args[0].should.equal('admin')
        })
    })

    describe('getIndexMock', function() {
        var user = {}
        beforeEach(function(){
            user = {
                roles: ['user'],
                isAuthorized: function(needRole) {
                    return this.roles.indexOf(needRole) >= 0
                }
            }
        })
        it('Should render admin', function() {
            var isAuth = sinon.stub(user, 'isAuthorized').returns(true)
            var req = {user:user}
            var res = {
                render : function(){}
            }
            var mock = sinon.mock(res)
            mock.expects('render').once().withExactArgs('admin')
            authController.getIndexMock(req, res)
        })
    })
})