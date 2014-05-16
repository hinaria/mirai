var traceur = require("mirai-traceur");
var fluffy = require("../util/fluffy");

var defaultOptions = {
    experimental: true
};

module.exports = {
    compile: function(content, filename, options) {
        traceur.options.reset();
        fluffy.mergeInto(traceur.options, defaultOptions, options, { modules: "mirai" });
        
        var sourceFile = new traceur.syntax.SourceFile(filename, content);
        var parser = new traceur.syntax.Parser(sourceFile);
        var tree = parser.parseModule();
        var reporter = new traceur.util.ErrorReporter();
        var transformer = new traceur.codegeneration.FromOptionsTransformer(reporter);
        var transformedTree = transformer.transform(tree);

        if (reporter.hadError()) {
            var errors = reporter.errors.map(function(error) { return "    " + error; }).join("\n");
            throw "traceur compilation failed: \n" + errors;
        }
        return traceur.outputgeneration.TreeWriter.write(transformedTree);
    }
};