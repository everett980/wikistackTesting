// var chai = require('chai');
// var expect = chai.expect;
// var spies = require('chai-spies');
// chai.use(spies);


// describe("Testing suite capabilities", function() {
// 	it('confirms basic arithmetic', function() {
// 		expect(2+2).to.be.equal(4);
// 	});
// });

// describe("Testing time", function() {
// 	xit("confirms expectations of time", function(done) {
// 		var startTime = new Date();
// 		setTimeout(function() {
// 			var duration = new Date() - startTime;
// 			expect(duration).to.be.closeTo(1000, 50);
// 			done();
// 		}, 1000);
// 	});
// });

// var obj = {
// 	foobar : function() {
// 		console.log('foo');
// 		return 'bar';
// 	}
// }
// chai.spy.on(obj, 'foobar');

// describe("spying", function() {
// 	it("counts the times foobar is run", function () {
// 		obj.foobar();
// 		expect(obj.foobar).to.have.been.called.exactly(1);
// 	})
// })

