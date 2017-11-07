'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _panel = require('./panel');

var _panel2 = _interopRequireDefault(_panel);

var _panel_header = require('./panel_header');

var _panel_header2 = _interopRequireDefault(_panel_header);

var _panel_body = require('./panel_body');

var _panel_body2 = _interopRequireDefault(_panel_body);

var _panel_footer = require('./panel_footer');

var _panel_footer2 = _interopRequireDefault(_panel_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by n7best.
 */

exports.default = {
    Panel: _panel2.default,
    PanelHeader: _panel_header2.default,
    PanelBody: _panel_body2.default,
    PanelFooter: _panel_footer2.default
};
module.exports = exports['default'];