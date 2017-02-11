'use strict';

exports.modelValidate = function (instance) {
  return function (propName, cb) {
    return instance.validate(function () {
      function validate(err) {
        expect(err.errors[propName]).to.exist;
        cb();
      }

      return validate;
    }());
  };
};