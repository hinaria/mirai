# es6inode

ES6 pseudo-polyfill for node. Your ES6 code is transpiled through [Google Traceur](https://github.com/google/traceur-compiler) which contains many bugs, but for the most part it's usable.

## Usage

Write ES6 code and save it with an .es6 extension instead of .js. Then, require `es6inode` somewhere, which will alter the module loading system to also look for .es6 modules.

```javascript
require("es6inode");
```