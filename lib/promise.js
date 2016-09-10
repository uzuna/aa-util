'use strict'

const aa = require('aa');

module.exports.wrap = function(fn, cb){
	if(cb){
		return callback(fn, cb)
	}
	return fn
}

module.exports.callback = callback
function callback(fn, cb){
	return aa(fn)
		.then((data)=>{ return cb(null, data); })
		.catch((err)=>{ return cb(err); })
}