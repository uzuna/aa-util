'use strict';

const aa = require('aa');
const au = require('../')
const expect = require('chai').expect

const stream = require('stream');

describe('promise', ()=>{
	it('type promise', function(){
		return aa(main())

		function *main(){
			const time = 100
			const result = yield proc(time)
			expect(result).to.be.eq(`wait:${time}`);
		}
	})

	it('type promise return err', function(){
		return aa(main())

		function *main(){
			const time = 600
			const result = yield proc(time)
			expect(result).to.be.a("error");
		}
	})

	it('type promise reject', function(done){
		aa(main())
			.catch((err)=>{
				expect(err).to.be.a("error");
				expect(err.message).to.be.eq("over >1500");
				done()
			})

		function *main(){
			const time = 2000
			const result = yield proc(time)
			
		}
	})

	it('type callback', function(done){
		const time = 200
		proc(time, (err, result)=>{
			expect(err).to.be.null
			expect(result).to.be.eq(`wait:${time}`);
			done();
		})
	})

	it('type callback return err', function(done){
		const time = 600
		proc(time, (err, result)=>{
			expect(err).to.be.null
			expect(result).to.be.a("error");
			done();
		})
	})

	it('type callback reject err', function(done){
		const time = 2000
		proc(time, (err, result)=>{
			expect(err).to.be.a("error");
			expect(err.message).to.be.eq("over >1500");
			done();
		})
	})
})

//
// Compatibility function
//
function proc(opt, cb){
	return au.promise.wrap(main(opt), cb)
	function *main(arg){
		return yield wait(arg)
	}
}

function wait(arg){
	return new Promise((res, rej)=>{
		if(arg > 1500) return rej(new Error("over >1500"))
		if(arg > 500) return res(new Error("over >500"))
		setTimeout(()=>{
			return res(`wait:${arg}`)
		}, arg)
	})
}
