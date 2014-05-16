var pkg = require("../package.json");

module.exports = {
    version: pkg.version,
    modularize: function(type, name, value) {
        if (!value)
            return value;

        switch (type) {
            case "module":
                return value;
            case "import":
                return typeof value == "object" && value.__mirai__
                    ? value
                    : { "default": value, "__mirai__": { type: "compatibility" } };
            default:
                throw "mirai: unknown module type '" + type + "' in module '" + name + "'";
        }
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