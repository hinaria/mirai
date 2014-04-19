var transpile = require("./transpile");
var fs = require('fs');
var nodule = require("module");

var stripBom = function(content) {
    return content.charCodeAt(0) === 0xFEFF ? content.slice(1) : content;
};

var unpatched = {
    js: nodule._extensions[".js"]
};





nodule._extensions[".es6"] = function(mod, filename) {
    var es6 = stripBom(fs.readFileSync(filename, "utf8"));
    var es5 = transpile(es6, filename);
    return mod._compile(es5, filename);
};

nodule._extensions[".js"] = function(mod, filename) {
    if (/\/node_modules\//.test(filename)) {
        return unpatched.js.apply(this, arguments);
    } else {
        var compile = nodule._extensions[".es6"];
        return compile(mod, filename);
    }
};





module.exports = {
    // restore the `js` extension back to the original 
    restore: function() {
        nodule._extensions[".js"] = unpatched.js;
    }
};