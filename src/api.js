var pkg = require("../package.json");
var fluffy = require("./util/fluffy");

var caches = {
    "import": { },
    "module": { }
};

module.exports = {
    version: pkg.version,
    require: function(type, name, path) {
        if (type != "module" && type != "import")
            throw "mirai: unknown module type '" + type + "' in module '" + name + "'";

        var value = require(path);
        var cache = caches[type];

        if (!value) return value;
        if (fluffy.has(cache, path)) return cache[path];

        return cache[path] = type == "module"
            ? value
            : (typeof value == "object" && value.__mirai__ ? value : { "default": value, "__mirai__": { type: "compatibility" } });  
    },
    get: function(object, exportName) {
        if (object && typeof object == "object") {
            return object.__mirai__ || object.__es6 || object.__esModule
                ? object["default"]
                : object;
        }

        return object;
    }
};