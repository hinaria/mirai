var traceur = require("traceur");
var keys = Object.keys;
var array = Array;

var defaultOptions = {
    experimental: true
};

function merge(destination) {
    var args = array.prototype.slice.call(arguments, 1);
    var filtered = args.filter(function(x) { return x != null; });

    filtered.forEach(function(source) {
        keys(source).forEach(function(key) {
            destination[key] = source[key];
        });
    });
}

module.exports = function compile(content, filename, options) {
    traceur.options.reset();
    merge(traceur.options, defaultOptions, options);

    var reporter = new traceur.util.TestErrorReporter();
    var sourceFile = new traceur.syntax.SourceFile(filename, content);
    var parser = new traceur.syntax.Parser(reporter, sourceFile);
    var tree = parser.parseScript();
    var transformer = new traceur.codegeneration.FromOptionsTransformer(reporter);
    var transformedTree = transformer.transform(tree);

    if (reporter.hadError()) {
        var errors = reporter.errors.map(function(error) { return "    " + error; }).join("\n");
        throw "traceur compilation failed: \n" + errors;
    }
    return traceur.outputgeneration.TreeWriter.write(transformedTree, null);
};