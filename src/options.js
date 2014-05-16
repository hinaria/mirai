var SupportedEngines = ["traceur"];

module.exports = {
    defaults: {
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
    },
    validate: function(options) {
        return options && typeof options == "object"            // options:               non-null object
            && Array.isArray(options.extensions)                // options.extensions:    array
            && options.engineOptions                            // 
            && typeof options.engineOptions == "object"         // options.engineOptions: non-null object
            && typeof options.shouldCompile == "function"       // options.shouldCompile: function
            && SupportedEngines.indexOf(options.engine) !== -1; // options.engine:        one of {supported_engines}
    }
};