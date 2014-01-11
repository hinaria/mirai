var transpile = require("./transpile");
var fs = require('fs');
var module = require("module");

function stripBom(content) {
    if (content.charCodeAt(0) === 0xFEFF)
        content = content.slice(1);
    return content;
}

module._extensions[".es6"] = function(mod, filename) {
    var es6 = stripBom(fs.readFileSync(filename, "utf8"));
    var es5 = transpile(es6, filename);
    return mod._compile(es5, filename);
};