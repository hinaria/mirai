var fs = require("fs");

var fluffy = module.exports = {
    slice: function(object, begin, end) {
        return Array.prototype.slice.call(object, begin, end);
    },

    has: function(object, key) {
        return Object.prototype.hasOwnProperty.call(object, key);  
    },

    mergeInto: function(destination /*, ... args */) {
        destination = destination || { };

        for (var i = 0; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (fluffy.has(source, key))
                    destination[key] = source[key];
            }
        }

        return destination;
    },

    merge: function(/* args */) {
        var args = [{ }].concat(fluffy.slice(arguments));
        return fluffy.mergeInto.apply(null, args);
    },

    read: function(path) {
        var content = fs.readFileSync(path, "utf8");
        return content.charCodeAt(0) === 0xFEFF ? content.slice(1) : content;
    },

    curry: function(callable /*, ...constants */) {
        var constant = fluffy.slice(arguments, 1);

        return function() {
            var args = constant.concat(fluffy.slice(arguments));
            return callable.apply(this, args);
        };
    },

    arrayEquals: function(a, b) {
        if (a.length != b.length)
            return false;

        for (var i = 0; i < a.length; i++) {
            if (a[i] !== b[i])
                return false;
        }
        
        return true;
    }
};