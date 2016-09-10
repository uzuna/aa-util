'use strict';

const aa = require('aa');
const au = require('../')
const expect = require('chai').expect

const stream = require('stream');

describe('steram', ()=>{
	it('array reduce', function(){
		return aa(main())

		function *main(){
			const target = [0,1,2,3,4,5]
			const stream = yield au.stream.a2s(target);
			const result = yield au.stream.reduce(stream);
			expect(result).to.deep.eq(target);
		}
	})

	it('generator reduce', function(){
		return aa(main())

		function *main(){
			const target = [0,1,2,3,4,5]
			const g = function *(){
				yield* target
			}
			const stream = yield au.stream.g2s(g());
			const result = yield au.stream.reduce(stream);
			expect(result).to.deep.eq(target);
		}
	})

	it("custom reduce", function(){
		return aa(main())

		function *main(){
			const target = [0,1,2,3,4,5]
			const g = function *(){
				yield* target
			}
			const stream = yield au.stream.g2s(g());
			
			// set custom reducer to second argument
			const result = yield au.stream.reduce(stream, sumStream());
			const sum = target.reduce((a, b)=>{ return a + b;}, 0)
			expect(result).to.deep.eq(sum);
		}

		// Make Custom Reducer extends Transform
		function sumStream(){
			return stream.Transform({
				objectMode:true,
				transform:function(chunk, env, cb){
					if(this._stack === undefined){
						this._stack = 0
					}
					this._stack += chunk
					cb()
				},
				flush: function(cb){
					this.push(this._stack)
					cb()
				}
			})
		}
	})
})