# mirai

run the future of javascript today. write and use ES6 and ES7 code within node.

`mirai` was previously called `es6inode`.

## getting started

```shell
npm install mirai
```

activating `mirai` is as simple as requiring the module. `mirai` will then alter the module loading system to transpile new `.js` and `.es6` files.

## example

```javascript
/* program.js */
require("mirai");
require("./program");
```

```javascript
/* program.es6 */

import { announce, read } from "./actions";

announce("mirai is a success!");
announce("greetings!", "foxy");
read("greetings.txt")
```

```javascript
/* actions.es6 */

import fs from "fs";

export var announce = function(text, author = "system") {
    let message = `[announcement] ${text} -- ${author}`;
    console.log(message);
}

export var read = path => fs.readFileSync(path, "utf8");
```

```shell
node program.js
=> [announcement] mirai is a success! -- system
=> [announcement] greetings! -- foxy
=> greetings, commoner.
```

## configuration

simply requiring `mirai` will activate it with the default parameters found in `options.js`. however, you can manually activate `mirai` with customized parameters.

instead of calling `require("mirai")` which automatically activates `mirai`, we can require a version that can be configured before activation:

```javascript
var mirai = require("mirai/configure");

mirai.configure({
    // which extensions we should transpile for. by default, this is .js
    // and .es6
    extensions: [".js", ".es6"],

    // the transpilation engine to use. currently, only traceur is
    // supported.
    engine: "traceur",

    // options to pass to the transpiler. for traceur options, see
    // https://github.com/google/traceur-compiler/blob/master/src/options.js
    engineOptions: { },

    // determine if we should transpile this file or whether to pass it to
    // the existing handler. by default, we do not transpile any files
    // that contain `/node_modules/` in its file path
    shouldCompile: function(path) {
        return /\/node_modules\//.test(path);
    } 
});

// the default options are displayed above. the full reference can be found at https://github.com/astralfoxy/mirai/blob/master/src/options.js
```

## require() importing

you can also access an es6 module's exports from es5 code with `require` - named exports by their name, the default export by "default".

```javascript
/* program.js */

var foxy = require("./foxy");

foxy
// => [object]

foxy.default
// => function

foxy.version
// => "infinity"

foxy.boolean
// => true
```

```javascript
/* foxy.es6 */

export default function awesome() {
    return "definitely awesome";
}

export var boolean = true;

export var version = "infinity";
```

## license

mit licensed. use it however you want.
