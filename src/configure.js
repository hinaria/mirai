var nodule = require("module");

var api = require("./api.js");
var preferences = require("./options.js");
var fluffy = require("./util/fluffy");

var global = GLOBAL;

var compile = function(params, mod, filename) {
    if (params.unpatched && !params.shouldCompile(filename)) {
        return params.unpatched(mod, filename);
    } else {
        var es6 = fluffy.read(filename);
        var es5 = params.engine.compile(es6, filename, params.engineOptions);
        return mod._compile(es5, filename);
    }
};

var configure = function(options) {
    options = fluffy.merge(preferences.defaults, options);

    if (preferences.validate(options) == false)
        throw "invalid options specified";

    var existing = global.__mirai__;
    if (existing != null) {
        if (existing.version != api.version || !fluffy.arrayEquals(existing.extensions, options.extensions)) {
            var message = "mirai: another incompatible mirai instance has already been configured."
                + "\n    version:    " + (existing.version || "unknown") + " (vs " + api.version + ")"
                + "\n    extensions: " + (existing.extensions || ["none"]).join(", ") + " (vs " + options.extensions.join(", ") + ")";
            console.warn(message);
        }

        return;
    }





    api.extensions = options.extensions;
    global.__mirai__ = api;

    var engine = require("./engines/" + options.engine);

    for (var i = 0; i < options.extensions.length; i++) {
        var extension = options.extensions[i];

        nodule._extensions[extension] = fluffy.curry(compile, {
            unpatched: nodule._extensions[extension],
            engine: engine,
            engineOptions: options.engineOptions,
            shouldCompile: options.shouldCompile
        });
    }
};

module.exports = configure;