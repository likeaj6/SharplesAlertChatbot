'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Sample Popup header for Popup
 *
 */
var PopupHeader = function PopupHeader(props) {
  var left = props.left,
      right = props.right,
      leftOnClick = props.leftOnClick,
      rightOnClick = props.rightOnClick,
      className = props.className;

  var cls = (0, _classnames2.default)('weui-popup__hd', className);
  return _react2.default.createElement(
    'div',
    { className: cls },
    _react2.default.createElement(
      'a',
      { className: 'weui-popup__action', onClick: leftOnClick },
      left
    ),
    _react2.default.createElement(
      'a',
      { className: 'weui-popup__action', onClick: rightOnClick },
      right
    )
  );
};

PopupHeader.propTypes = {
  /**
   * left button label
   *
   */
  left: _react.PropTypes.string,
  /**
   * right button label
   *
   */
  right: _react.PropTypes.string,
  /**
   * left button onclick
   *
   */
  leftOnClick: _react.PropTypes.func,
  /**
   * right button onclick
   *
   */
  rightOnClick: _react.PropTypes.func
};

PopupHeader.defaultProps = {
  left: '',
  right: ''
};

exports.default = PopupHeader;
module.exports = exports['default'];