# es6inode

ES6 for node. Your ES6 code is transpiled through [Google Traceur](https://github.com/google/traceur-compiler).

## Usage

```shell
npm install es6inode
```

Require `es6inode` somewhere and then save your ES6 modules with a `.js` or `.es6` extension. `es6inode` alters the module loading system to transpile all `.js` and `.es6` files.

```javascript
require("es6inode");
```

By default, both `.js` and `.es6` files are transpiled. If you only want to transpile `.es6` files, you can restore the original (unpatched) javascript processor.

```javascript
var es6 = require("es6inode");
es6.restore();
```

## Example

The following example uses the [String Interpolation](http://tc39wiki.calculist.org/es6/template-strings/) feature from ES6.

File: hello.js

```javascript
module.exports = function(name){
  return `My name is ${name}`;
};
```

File: run.js

```javascript
require('es6inode');

var Hello = require('./hello')
console.log(Hello('Joe'));
```

Running `$ node run.js` should print *My name is Joe*.