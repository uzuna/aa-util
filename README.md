# Async-await utility with stream

`npm i aa-util`


### example

```js
const au = require('aa-util')

// Type Array -> Stream

function *main(){
	const target = [0,1,2,3,4,5]
	const stream = yield au.stream.a2s(target);

	// pipe your custom stream
	stream.pipe(stream_A)

	// get stream result
	const result = yield au.stream.reduce(stream_A);
}


// Type Generator -> Stream

function *main(){
	const target = [0,1,2,3,4,5]
	const g = function *(){
		yield* target
	}
	const stream = yield au.stream.g2s(g());
	const result = yield au.stream.reduce(stream);
}
```
