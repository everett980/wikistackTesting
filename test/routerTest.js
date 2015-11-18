var models = require('../models');
var Page = models.Page;
var User = models.User;
var app = require("../app");
var supertest = require('supertest');
var agent = supertest.agent(app);

var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);

describe('http requests', function() {

  	describe('GET /', function() {
	    it('gets 200 on index', function(done) {
	        agent
	          .get('/')
	          .expect(200, done);
	    });
	});

    describe('GET /wiki/add', function () {
	    it('gets 200 on add', function(done) {
	        agent
	          .get('/wiki/add')
	          .expect(200, done);
	    });
    });

    describe('GET /wiki/:urlTitle', function() {
    	var p1;
        it('gets 404 on page that doesnt exist', function(done) {
        	Page.remove({}).then(function(){
		        p1 = new Page({
		            title: 'test',
		            content: 'some content',
		            tags: ['tag1', 'tag2']
	        	})
	        	p1.save();
		        return p1;
	    	}).then(function(){
	        	Page.find().then(function(pages){
        			console.log(pages);
        		})
	        	agent
	        		.get('/wiki/anythlfkjesilkfjeslfkjesr')
    		      	.expect(404)
			        .end(function(err, res){
			        if (err) {
			       		console.log("ERROR");
			          	return done(err); // if response is 500 or 404 & err, test case will fail
			        }
			        done();
			    });
	    	});
        });

        it('gets 200 on page that does exist', function(done) {
        	Page.remove({}).then(function(){
		        p1 = new Page({
		            title: 'test',
		            content: 'some content',
		            tags: ['tag1', 'tag2']
	        	})
	        	p1.save();
		        return p1;
	    	}).then(function(){
	        	Page.find().then(function(pages){
        			console.log(pages);
        		})
	        	agent
	        		.get('/wiki/test')
    		      	.expect(200, done)
		    });
    	});
    });

    describe('GET /wiki/search', function() {
        it('gets 200', function(done) {
        	agent
        		.get('/wiki/search')
        		.expect(200, done)
        });
    });

    describe('GET /wiki/:urlTitle/similar', function() {
        it('gets 404 for page that doesn\'t exist', function(done) {
        	agent
        		.get('/wiki/something/similar')
        		.expect(404, done)

        });

        it('gets 200 for similar page', function(done) {
	        p1 = new Page({
	            title: 'test',
	            content: 'some content',
	            tags: ['tag1', 'tag2']
        	})
        	p1.save().then(function() {
	        	agent
	        		.get('/wiki/search')
	        		.expect(200, done)
        	});
        });
    });


    describe('POST /wiki/add', function() {
        it('creates in db', function(done) {
        	agent
        		.post('/wiki/')
        		.send({
        			name: 'bob',
        			email:"bobs email",
		            title: 'testTitle',
		            content: 'some content',
		            tags: "t1,t2"
        		})
        		.expect(302, done)
        });
    });

});