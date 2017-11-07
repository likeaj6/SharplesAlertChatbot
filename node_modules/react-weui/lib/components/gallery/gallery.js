'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Full screen photo display
 *
 */
var Gallery = function Gallery(props) {
    var children = props.children,
        className = props.className,
        show = props.show,
        src = props.src,
        others = (0, _objectWithoutProperties3.default)(props, ['children', 'className', 'show', 'src']);

    var cls = (0, _classnames2.default)((0, _defineProperty3.default)({
        'weui-gallery': true
    }, className, className));

    return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: cls, style: { display: show ? 'block' : 'none' } }, others),
        _react2.default.createElement('span', { className: 'weui-gallery__img', style: { backgroundImage: 'url(' + src + ')' } }),
        _react2.default.createElement(
            'div',
            { className: 'weui-gallery__opr' },
            children
        )
    );
};

Gallery.propTypes = {
    /**
     * indicate whather the component is display
     *
     */
    show: _react2.default.PropTypes.bool,
    /**
     * image source url or base64 encode
     *
     */
    src: _react2.default.PropTypes.string
};

Gallery.defaultProps = {
    show: undefined,
    src: ''
};

exports.default = Gallery;
module.exports = exports['default'];