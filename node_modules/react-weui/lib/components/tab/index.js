'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _tab = require('./tab');

var _tab2 = _interopRequireDefault(_tab);

var _tab_body = require('./tab_body');

var _tab_body2 = _interopRequireDefault(_tab_body);

var _navbar = require('./navbar');

var _navbar2 = _interopRequireDefault(_navbar);

var _navbar_item = require('./navbar_item');

var _navbar_item2 = _interopRequireDefault(_navbar_item);

var _tabbar = require('./tabbar');

var _tabbar2 = _interopRequireDefault(_tabbar);

var _tabbar_item = require('./tabbar_item');

var _tabbar_item2 = _interopRequireDefault(_tabbar_item);

var _tabbar_icon = require('./tabbar_icon');

var _tabbar_icon2 = _interopRequireDefault(_tabbar_icon);

var _tabbar_label = require('./tabbar_label');

var _tabbar_label2 = _interopRequireDefault(_tabbar_label);

var _tab_body_item = require('./tab_body_item');

var _tab_body_item2 = _interopRequireDefault(_tab_body_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
   NavBar: _navbar2.default,
   NavBarItem: _navbar_item2.default,
   Tab: _tab2.default,
   TabBody: _tab_body2.default,
   TabBodyItem: _tab_body_item2.default,
   TabBar: _tabbar2.default,
   TabBarItem: _tabbar_item2.default,
   TabBarIcon: _tabbar_icon2.default,
   TabBarLabel: _tabbar_label2.default
}; /**
    * Created by n7best
    */

module.exports = exports['default'];