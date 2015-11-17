var models = require('../models');
var Page = models.Page;
var User = models.User;


describe('Page model', function() {

    describe('Validations', function() {
        var p;
        beforeEach(function() {
            p = new Page();
        })
        xit('errors without title', function() {});
        xit('errors without content', function() {});
    });

    describe('Statics', function() {
        describe('findByTag', function() {
            xit('gets pages with the search tag', function() {});
            xit('does not get pages without the search tag', function() {});
        });
    });

    describe('Methods', function() {
        describe('findSimilar', function() {
            xit('never gets itself', function() {});
            xit('gets other pages with any common tags', function() {});
            xit('does not get other pages without any common tags', function() {});
        });
    });

    describe('Virtuals', function() {
        describe('route', function() {
            xit('returns the url_name prepended by "/wiki/"', function() {});
        });
    });

    describe('Hooks', function() {
        xit('it sets urlTitle based on title before validating', function() {});
    });

});