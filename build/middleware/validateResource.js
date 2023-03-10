"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate = function (schema) {
    return function (req, res, next) {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (e) {
            console.error(e);
            return res.status(400).send(e.errors);
        }
    };
};
exports.default = validate;
//# sourceMappingURL=validateResource.js.map