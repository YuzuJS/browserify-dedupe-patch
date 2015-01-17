var through = require("through2");

exports.patch = function (Browserify) {
    Browserify.prototype._dedupe = function () {
        return through.obj(function (row, enc, next) {
            if (!row.dedupeIndex && row.dedupe) {
                // PATCH IS AS SIMPLE AS NOT DOING THE FOLLOWING:
                /*
                row.source = 'module.exports=require('
                    + JSON.stringify(row.dedupe)
                    + ')'
                ;
                row.deps = {};
                row.deps[row.dedupe] = row.dedupe;
                row.nomap = true;
                */
                // AND JUST MOVING ON :)
                return next();
            }
            if (row.dedupeIndex && row.sameDeps) {
                row.source = 'module.exports=require('
                    + JSON.stringify(row.dedupeIndex)
                    + ')'
                ;
                row.deps = {};
                row.nomap = true;
            }
            else if (row.dedupeIndex) {
                row.source = 'arguments[4]['
                    + JSON.stringify(row.dedupeIndex)
                    + '][0].apply(exports,arguments)'
                ;
                row.nomap = true;
            }
            if (row.dedupeIndex && row.dedupe && row.indexDeps) {
                row.indexDeps[row.dedupe] = row.dedupeIndex;
            }
            this.push(row);
            next();
        });
    };
};
