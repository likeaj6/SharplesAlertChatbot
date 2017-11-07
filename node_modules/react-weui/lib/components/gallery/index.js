'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gallery = require('./gallery');

var _gallery2 = _interopRequireDefault(_gallery);

var _gallery_delete = require('./gallery_delete');

var _gallery_delete2 = _interopRequireDefault(_gallery_delete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    GalleryDelete: _gallery_delete2.default,
    Gallery: _gallery2.default
};
module.exports = exports['default'];