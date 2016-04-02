var models = require('../models');
var Page = models.Page;
var User = models.User;

var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);



describe('Page model', function() {

    describe('Validations', function() {
        var p;
        beforeEach(function() {
            p = new Page( {

            });
        })
        it('errors without title', function(doner) {
            p.validate(function(err) {
                //expect(err.errors).to.have.property('title');
                expect(err.errors.title).to.be.an('object');
                doner();	//if we dont provide an argument (done) into 'it', 
                //mocha will not know to wait for the async validate func to complete before continuing
            })
        });
        it('errors without content', function(done) {
            p.validate(function(err) {
                expect(err.errors).to.have.property('title')
                done()
            })
        });
    });

    describe('Statics', function() {

    	beforeEach(function (done){
    		var p1 = new Page({
                title: 'test',
                content: 'some content',
                tags: ['tag1', 'tag2']
            })
            p1.save().then(function() {
            	done();
            }, function(err){
            	done(err);
            });
    	});


        describe('findByTag', function() {
            
            it('gets pages with the search tag', function(done) {
                Page.findByTag('tag1').then(function(matches) {
                    expect(matches).to.have.length.above(0);
                    done();
                })
                .then(null, done);	//sane as:
                // .then(null, function (err){
                // 	done(err);	//catch error from above, in case expect function throws an error
                // });
            });
            it('does not get pages without the search tag', function() {
                Page.findByTag('noPagesHaveThisTag').then(function(matches) {
                    expect(matches).to.have.length.equal(0);
                    done();
                })
            });
        });
    });

    describe('Methods', function() {
        describe('findSimilar', function() {
            var p1, p2, p3;
            //always list done as argument if it is async!
            beforeEach(function(done) {
            	Page.create([
            	{
					title: 'test',
					content: 'some content',
					tags: ['tag1', 'tag2']
				}, 
				{
					title: 'test2',
					content: 'more content',
					tags: ['tag2']
				}, 
				{
					title: 'test2',
					content: 'more content',
					tags: ['tag2']
				}
				])
				.then(function(pages){
					p1 = pages[0];
					console.log(p1);
					p3 = pages[2];
					done();
				}, done);	//call done in case of error
            });
            afterEach(function () {
                Page.remove({title: 'test'});
                Page.remove({title: 'test2'});
                Page.remove({title: 'test3'});
            });

            it('never gets itself', function(done) {
                p1.findSimilar().then(function (matches) {
                    expect(matches).to.have.length.equal(1);
                    expect(matches[0].title).to.not.equal('test');
                    done();
                });
                done();
            });
            it('gets other pages with any common tags', function(done) {
                p1.findSimilar().then(function (matches) {
                    expect(matches).to.have.length.equal(1);
                    expect(matches[0].title).to.equal('test2');
                	done();
                });
                done();
            });
            it('does not get other pages without any common tags', function(done) {
                p3.findSimilar().then(function (matches) {
                    expect(matches).to.have.length.equal(0);
                	done();
                });
                done();
            });
        });
    });

    describe('Virtuals', function() {
        var p1;
        beforeEach(function() {
            p1 = new Page({
                title: 'test',
                urlTitle: 'helloWorld',
                content: 'some content',
                tags: ['tag1', 'tag2']
            });
        });
        describe('route', function() {
            it('returns the url_name prepended by "/wiki/"', function() {
                expect(p1.route).to.equal('/wiki/helloWorld');
            });
        });
    });

    describe('Hooks', function() {
        var p1;
        beforeEach(function() {
            p1 = new Page({
                title: 'test',
                content: 'some content',
                tags: ['tag1', 'tag2']
            });
        });    
        afterEach(function () {
                Page.remove({title: 'test'});
            })
        it('it sets urlTitle based on title before validating', function() {
            var spy = chai.spy(p1.pre);
            p1.save().then(function() {
                expect(spy).to.have.been.called.exactly(1);
            });
        });
    });

});


// chai.spy.on(mongoose, 'method')