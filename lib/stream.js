'use strict';

const aa = require('aa');
const stream = require('stream');


module.exports.a2s = array2stream;
module.exports.array2stream = array2stream;
//
// Array to Stream
//
function array2stream(list){
	// copy array
	let stack = list.map((d)=>{return d;})
	return stream.Readable({
		objectMode:true,
		read: function(size){
			if(stack.length< 1) return this.push(null);
			this.push(stack.shift())
		}
	})
}


module.exports.g2s = generator2stream;
module.exports.generator2stream = generator2stream;
//
// Generator Function to Stream
//
function generator2stream(g){
	return stream.Readable({
		objectMode:true,
		read: function(size){
			let rs = g.next()
			if(rs.done) return this.push(null);
			if(rs.value instanceof Promise){
				rs.value.then((data)=>{
					this.push(data);
				},(err)=>{
					this.push(err);
				})
			}
			else {
				this.push(rs.value)	
			}
			
		}
	})
}


module.exports.reduce = stream_reduce;
module.exports.stream_reduce = stream_reduce;

//
// Get latest chunk
//
function stream_reduce(src, reducer){
	// catch finish event on writable stream
	if(src._readableState === undefined){
		return new Promise((res, rej)=>{
			src.on('finish', ()=>{
				res()
			})
		})
	}

	// reduce chunks
	let rs
	reducer = reducer || stackstream();

	const catcher = stream.Transform({
		objectMode:true,
		transform: function(chunk, enc, cb){
			rs = chunk
			cb();
		}
	})
	return new Promise((res, rej)=>{
		src
			.pipe(reducer)
			.pipe(catcher)
			.on('finish',()=>{
				res(rs);
			})
	})
}

//
// Reducer. Stream to Array
//
function stackstream(){
	return stream.Transform({
		objectMode:true,
		transform:function(chunk, env, cb){
			if(this._stack === undefined){
				this._stack = []
			}
			this._stack.push(chunk)
			cb()
		},
		flush: function(cb){
			this.push(this._stack)
			cb()
		}
	})
}

//
// Piping Streams array
//
module.exports.pipe = function(list){
	return list.reduce((a, b)=>{
		return a.pipe(b)	
	})
}