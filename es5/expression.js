require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"complex-math":[function(require,module,exports){
/**
 * @overview Describes an object analogous to the built-in Math object but over
 * the complex numbers
 * @author Colin Jeanne <colinjeanne@hotmail.com> (http://www.colinjeanne.net)
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _complexJs = require('./complex.js');

/**
 * A common method to convert between various number-like objects to {Complex}
 * @param  {*} u     An object to convert to a {Complex}
 * @return {Complex}
 */

var _complexJs2 = _interopRequireDefault(_complexJs);

var toComplex = function toComplex(u) {
  if (u instanceof _complexJs2['default']) {
    return u;
  } else if (u instanceof Number) {
    return new _complexJs2['default'](u.valueOf);
  } else if (typeof u === 'number') {
    return new _complexJs2['default'](u);
  } else if (typeof u === 'object' && (u.hasOwnProperty('real') && typeof u.real === 'number') && (u.hasOwnProperty('imaginary') && typeof u.imaginary === 'number')) {
    return new _complexJs2['default'](u.real, u.imaginary);
  }

  throw new TypeError('Expected numeric type');
};

/**
 * Euler's constant
 * @type {Complex}
 */
var E = new _complexJs2['default'](Math.E);

/**
 * The imaginary unit
 * @type {Complex}
 */
exports.E = E;
var I = new _complexJs2['default'](0, 1);

/**
 * Natural logarithm of 10
 * @type {Complex}
 */
exports.I = I;
var LN10 = new _complexJs2['default'](Math.LN10);

/**
 * Natural logarithm of 2
 * @type {Complex}
 */
exports.LN10 = LN10;
var LN2 = new _complexJs2['default'](Math.LN2);

/**
 * Base 2 logarithm of E
 * @type {Complex}
 */
exports.LN2 = LN2;
var LOG2E = new _complexJs2['default'](Math.LOG2E);

/**
 * Base 10 logarithm of E
 * @type {Complex}
 */
exports.LOG2E = LOG2E;
var LOG10E = new _complexJs2['default'](Math.LOG10E);

/**
 * Ratio of the circumference of a circle to its diameter
 * @type {Complex}
 */
exports.LOG10E = LOG10E;
var PI = new _complexJs2['default'](Math.PI);

/**
 * Square root of 1/2
 * @type {Complex}
 */
exports.PI = PI;
var SQRT1_2 = new _complexJs2['default'](Math.SQRT1_2);

/**
 * Square root of 2
 * @type {Complex}
 */
exports.SQRT1_2 = SQRT1_2;
var SQRT2 = new _complexJs2['default'](Math.SQRT2);

/**
 * The real part of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The real part of the number
 */
exports.SQRT2 = SQRT2;
var real = function real(u) {
  return new _complexJs2['default'](toComplex(u).real);
};

/**
 * The imaginary part of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The imaginary part of the number
 */
exports.real = real;
var imaginary = function imaginary(u) {
  return new _complexJs2['default'](toComplex(u).imaginary);
};

/**
 * Adds two numbers
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The sum of u and v
 */
exports.imaginary = imaginary;
var add = function add(u, v) {
  return new _complexJs2['default'](real(u).real + real(v).real, imaginary(u).real + imaginary(v).real);
};

/**
 * Subtracts two numbers
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The result of u subtracting v
 */
exports.add = add;
var subtract = function subtract(u, v) {
  return new _complexJs2['default'](real(u).real - real(v).real, imaginary(u).real - imaginary(v).real);
};

/**
 * Multiplies two numbers
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The product of u and v
 */
exports.subtract = subtract;
var multiply = function multiply(u, v) {
  var complexU = toComplex(u);
  var complexV = toComplex(v);

  return new _complexJs2['default'](complexU.real * complexV.real - complexU.imaginary * complexV.imaginary, complexU.real * complexV.imaginary + complexU.imaginary * complexV.real);
};

/**
 * Negates a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The negation of u
 */
exports.multiply = multiply;
var negate = function negate(u) {
  var complexU = toComplex(u);
  return new _complexJs2['default'](-complexU.real, -complexU.imaginary);
};

/**
 * The argument or phase of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The argument of u
 */
exports.negate = negate;
var arg = function arg(u) {
  return new _complexJs2['default'](Math.atan2(imaginary(u).real, real(u).real));
};

/**
 * The smallest Gaussian Integer less than or equal to a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The ceiling of u
 */
exports.arg = arg;
var ceil = function ceil(u) {
  return new _complexJs2['default'](Math.ceil(real(u).real), Math.ceil(imaginary(u).real));
};

/**
 * The complex conjugate of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The conjugate of u
 */
exports.ceil = ceil;
var conj = function conj(u) {
  return new _complexJs2['default'](real(u).real, -imaginary(u).real);
};

/**
 * Eular's constant raised to the power of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} Euler's constant raised to the power of u
 */
exports.conj = conj;
var exp = function exp(u) {
  var complexU = toComplex(u);
  var newAbs = Math.exp(complexU.real);
  var newArg = complexU.imaginary;
  return new _complexJs2['default'](newAbs * Math.cos(newArg), newAbs * Math.sin(newArg));
};

/**
 * The cosine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The cosine of u
 */
exports.exp = exp;
var cos = function cos(u) {
  var iu = multiply(I, u);
  return divide(add(exp(iu), exp(negate(iu))), 2);
};

/**
 * The hyperbolic cosine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic cosine of u
 */
exports.cos = cos;
var cosh = function cosh(u) {
  return divide(add(exp(u), exp(negate(u))), 2);
};

/**
 * The largest Gaussian Integer less than or equal to a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The floor of u
 */
exports.cosh = cosh;
var floor = function floor(u) {
  return new _complexJs2['default'](Math.floor(real(u).real), Math.floor(imaginary(u).real));
};

/**
 * The fractional part of a real number
 * @param  {Number} n The number
 * @return {Number}   The fractional part of the number
 */
exports.floor = floor;
var realFrac = function realFrac(n) {
  return n >= 0 ? n - Math.floor(n) : n - Math.ceil(n);
};

/**
 * The fractional part of a complex number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The fractional part of u
 */
var frac = function frac(u) {
  var complexU = toComplex(u);
  return new _complexJs2['default'](realFrac(complexU.real), realFrac(complexU.imaginary));
};

/**
 * The natural log (logarithm base e) of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The natural log of u
 */
exports.frac = frac;
var ln = function ln(u) {
  return new _complexJs2['default'](Math.log(abs(u).real), arg(u).real);
};

/**
 * The nearest Gaussian Integer to a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The nearest Gaussian Integer to u
 */
exports.ln = ln;
var nint = function nint(u) {
  return floor(add(u, new _complexJs2['default'](0.5, 0.5)));
};

/**
 * The norm of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The norm of u
 */
exports.nint = nint;
var norm = function norm(u) {
  return new _complexJs2['default'](real(u).real * real(u).real + imaginary(u).real * imaginary(u).real);
};

/**
 * The absolute value, or magnitude, of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The absolute value of u
 */
exports.norm = norm;
var abs = function abs(u) {
  return new _complexJs2['default'](Math.sqrt(norm(u).real));
};

/**
 * Divides two numbers
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The result of dividing u by v
 */
exports.abs = abs;
var divide = function divide(u, v) {
  var complexU = toComplex(u);
  var complexV = toComplex(v);
  var normV = norm(v).real;

  return new _complexJs2['default']((complexU.real * complexV.real + complexU.imaginary * complexV.imaginary) / normV, (complexU.imaginary * complexV.real - complexU.real * complexV.imaginary) / normV);
};

/**
 * The complex modulus of a number
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The result of u mod v
 */
exports.divide = divide;
var mod = function mod(u, v) {
  return subtract(u, multiply(v, floor(divide(u, v))));
};

/**
 * The logarithm of a number to a given base
 * @param  {*} base  A number or complex number-like object that is the base of
 * the logarithm
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The logarithm base base of u
 */
exports.mod = mod;
var log = function log(base, u) {
  return divide(ln(u), ln(base));
};

/**
 * The logarithm base 2 of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The logarithm base 2 of u
 */
exports.log = log;
var log2 = function log2(u) {
  return divide(ln(u), Math.LN2);
};

/**
 * The logarithm base 10 of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The logarithm base 10 of u
 */
exports.log2 = log2;
var log10 = function log10(u) {
  return divide(ln(u), Math.LN10);
};

/**
 * The exponent of a base raised to a power
 * @param  {*} base  A number or complex number-like object that is the base of
 * the exponent
 * @param  {*} power A number or complex number-like object that is the power of
 * the exponent
 * @return {Complex} The exponent of base raised to power
 */
exports.log10 = log10;
var pow = function pow(base, power) {
  return exp(multiply(power, ln(base)));
};

/**
 * The secant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The secant of u
 */
exports.pow = pow;
var sec = function sec(u) {
  return divide(1, cos(u));
};

/**
 * The hyperbolic secant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic secant of u
 */
exports.sec = sec;
var sech = function sech(u) {
  return divide(1, cosh(u));
};

/**
 * The sine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The sine of u
 */
exports.sech = sech;
var sin = function sin(u) {
  var iu = multiply(I, u);
  return divide(subtract(exp(iu), exp(negate(iu))), new _complexJs2['default'](0, 2));
};

/**
 * The hyperbolic sine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic sine of u
 */
exports.sin = sin;
var sinh = function sinh(u) {
  return divide(subtract(exp(u), exp(negate(u))), 2);
};

/**
 * The cosecant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The cosecant of u
 */
exports.sinh = sinh;
var csc = function csc(u) {
  return divide(1, sin(u));
};

/**
 * The hyperbolic cosecant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic cosecant of u
 */
exports.csc = csc;
var csch = function csch(u) {
  return divide(1, sinh(u));
};

/**
 * The square root of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The square root of u
 */
exports.csch = csch;
var sqrt = function sqrt(u) {
  var complexU = toComplex(u);
  var absU = abs(u).real;

  return new _complexJs2['default'](Math.sqrt((complexU.real + absU) / 2), Math.sign(complexU.imaginary) * Math.sqrt((-complexU.real + absU) / 2));
};

/**
 * The tangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The tangent of u
 */
exports.sqrt = sqrt;
var tan = function tan(u) {
  var exp_2iu = exp(multiply(new _complexJs2['default'](0, 2), u));
  return divide(subtract(exp_2iu, 1), multiply(I, add(exp_2iu, 1)));
};

/**
 * The hyperbolic tangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic tangent of u
 */
exports.tan = tan;
var tanh = function tanh(u) {
  var exp_u = exp(u);
  var exp_negate_u = exp(negate(u));
  return divide(subtract(exp_u, exp_negate_u), add(exp_u, exp_negate_u));
};

/**
 * The cotangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The cotangent of u
 */
exports.tanh = tanh;
var cot = function cot(u) {
  return divide(1, tan(u));
};

/**
 * The hyperbolic cotangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic cotangent of u
 */
exports.cot = cot;
var coth = function coth(u) {
  return divide(1, tanh(u));
};

/**
 * The inverse cosine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse cosine of u
 */
exports.coth = coth;
var acos = function acos(u) {
  return add(Math.PI / 2, multiply(I, ln(add(multiply(I, u), sqrt(subtract(1, multiply(u, u)))))));
};

/**
 * The inverse hyperbolic cosine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic cosine of u
 */
exports.acos = acos;
var acosh = function acosh(u) {
  return ln(add(u, multiply(sqrt(add(u, 1)), sqrt(subtract(u, 1)))));
};

/**
 * The inverse cotangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse cotangent of u
 */
exports.acosh = acosh;
var acot = function acot(u) {
  return multiply(divide(I, 2), subtract(ln(divide(subtract(u, I), u)), ln(divide(add(u, I), u))));
};

/**
 * The inverse hyperbolic cotangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic cotangent of u
 */
exports.acot = acot;
var acoth = function acoth(u) {
  var reciprocal = divide(1, u);
  return divide(subtract(ln(add(1, reciprocal)), ln(subtract(1, reciprocal))), 2);
};

/**
 * The inverse cosecant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse cosecant of u
 */
exports.acoth = acoth;
var acsc = function acsc(u) {
  return multiply(new _complexJs2['default'](0, -1), ln(add(sqrt(subtract(1, divide(1, multiply(u, u)))), divide(I, u))));
};

/**
 * The inverse hyperbolic cosecant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic cosecant of u
 */
exports.acsc = acsc;
var acsch = function acsch(u) {
  return add(new _complexJs2['default'](0, -Math.PI / 2), multiply(I, acos(divide(I, u))));
};

/**
 * The inverse secant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse secant of u
 */
exports.acsch = acsch;
var asec = function asec(u) {
  return add(new _complexJs2['default'](Math.PI / 2), multiply(I, ln(add(sqrt(subtract(1, divide(1, multiply(u, u)))), divide(I, u)))));
};

/**
 * The inverse hyperbolic secant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic secant of u
 */
exports.asec = asec;
var asech = function asech(u) {
  var reciprocal = divide(1, u);
  return ln(add(multiply(sqrt(subtract(reciprocal, 1)), sqrt(add(reciprocal, 1))), reciprocal));
};

/**
 * The inverse sine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse sine of u
 */
exports.asech = asech;
var asin = function asin(u) {
  return multiply(new _complexJs2['default'](0, -1), ln(add(multiply(I, u), sqrt(subtract(1, multiply(u, u))))));
};

/**
 * The inverse hyperbolic sine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic sine of u
 */
exports.asin = asin;
var asinh = function asinh(u) {
  return ln(add(u, sqrt(add(multiply(u, u), 1))));
};

/**
 * The inverse tangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse tangent of u
 */
exports.asinh = asinh;
var atan = function atan(u) {
  var iu = multiply(I, u);
  return multiply(divide(I, 2), subtract(ln(subtract(1, iu)), ln(add(1, iu))));
};

/**
 * The inverse hyperbolic tangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic tangent of u
 */
exports.atan = atan;
var atanh = function atanh(u) {
  return divide(subtract(ln(add(1, u)), ln(subtract(1, u))), 2);
};
exports.atanh = atanh;
},{"./complex.js":"complex"}],"complex":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _default = /**
                * @overview Describes a complex number
                * @author Colin Jeanne <colinjeanne@hotmail.com> (http://www.colinjeanne.net)
                */

/**
 * A complex number
 */

/**
 * Constructs a complex number from real and imaginary parts
 * @param  {Number=0} real      The real part of the complex number
 * @param  {Number=0} imaginary The imaginary part of the complex number
 * @return {Complex}
 */
function _default() {
  var real = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var imaginary = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  _classCallCheck(this, _default);

  this.real = real;
  this.imaginary = imaginary;
};

exports["default"] = _default;
module.exports = exports["default"];
},{}],"expression":[function(require,module,exports){
/**
 * @overview Describes an expression parser and evaluator over the complex
 * numbers
 * @author Colin Jeanne <colinjeanne@hotmail.com> (http://www.colinjeanne.net)
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
   value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _KnownUnaryFunctions;

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _complexJs = require('./complex.js');

var _complexJs2 = _interopRequireDefault(_complexJs);

var _complexMathJs = require('./complex-math.js');

/**
 * Enumeration for known characters
 * @readonly
 * @enum string
 */

var ComplexMath = _interopRequireWildcard(_complexMathJs);

var KnownCharacters = {
   openParenthesis: '(',
   closeParenthesis: ')',
   openFloor: '⌊',
   closeFloor: '⌋',
   openCeiling: '⌈',
   closeCeiling: '⌉',
   openBracket: '[',
   closeBracket: ']',
   blackLetterCapitalI: 'ℑ',
   blackLetterCapitalR: 'ℜ',
   comma: ',',
   invisibleSeparator: '⁣',
   plus: '+',
   invisiblePlus: '⁤',
   minus: '-',
   minusSign: '−',
   times: '*',
   dotOperator: '⋅',
   multiplicationSign: '×',
   invisibleTimes: '⁢',
   divide: '/',
   divisionSign: '÷',
   fractionSlash: '⁄',
   divisionSlash: '∕'
};

/**
 * Determines whether two types of parentheses match
 * @param  {string} openTerminal  The terminal of the opening parenthesis
 * @param  {string} closeTerminal The terminal of the closing parenthesis
 * @return {boolean}              Whether the closing terminal is a valid match
 * for the opening terminal
 */
var doParenthesesMatch = function doParenthesesMatch(openTerminal, closeTerminal) {
   return openTerminal === KnownCharacters.openParenthesis && closeTerminal === KnownCharacters.closeParenthesis || openTerminal === KnownCharacters.openFloor && closeTerminal === KnownCharacters.closeFloor || openTerminal === KnownCharacters.openCeiling && closeTerminal === KnownCharacters.closeCeiling || openTerminal === KnownCharacters.openBracket && closeTerminal === KnownCharacters.closeBracket;
};

/**
 * Enumeration for token types
 * @readonly
 * @enum {Number}
 */
var TokenType = {
   space: 1,
   symbol: 2,
   number: 3,
   openParenthesis: 4,
   closeParenthesis: 5,
   comma: 6,
   plus: 7,
   minus: 8,
   times: 9,
   invisibleTimes: 10,
   divide: 11,
   unaryFunction: 12,
   binaryFunction: 13
};

/**
 * Determines if a given token is an operator
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token is an operator
 */
var isTokenOperator = function isTokenOperator(tokenType) {
   return tokenType === TokenType.plus || tokenType === TokenType.minus || tokenType === TokenType.times || tokenType === TokenType.invisibleTimes || tokenType === TokenType.divide;
};

/**
 * Determines if a given token is a function
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token is a function
 */
var isTokenFunction = function isTokenFunction(tokenType) {
   return tokenType === TokenType.unaryFunction || tokenType === TokenType.binaryFunction;
};

/**
 * Determines if a given token is a value
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token is a value
 */
var isTokenValue = function isTokenValue(tokenType) {
   return tokenType === TokenType.symbol || tokenType === TokenType.number;
};

/**
 * Determines if a given token ends the current scope
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token ends the current scope
 */
var isTokenScopeEnding = function isTokenScopeEnding(tokenType) {
   return tokenType === TokenType.closeParenthesis || tokenType === TokenType.comma;
};

/**
 * Determines if a given token forces a subexpression to be an unary function
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token forces the subexpression to
 * be an unary function
 */
var isTokenUnaryForcing = function isTokenUnaryForcing(tokenType) {
   return tokenType === TokenType.openParenthesis || tokenType === TokenType.comma ||

   // Plus and minus are unary operators at the start of a subexpression or
   // after an infix operator
   tokenType === TokenType.plus || tokenType === TokenType.minus || tokenType === TokenType.times || tokenType === TokenType.divide;
};

/**
 * Determines whether this token implies that a multiplication has taken place
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token implies that a multiplication
 * has taken place
 */
var tokenImpliesMultiplication = function tokenImpliesMultiplication(tokenType) {
   return tokenType === TokenType.openParenthesis || tokenType === TokenType.number || tokenType === TokenType.symbol || tokenType === TokenType.unaryFunction || tokenType === TokenType.binaryFunction;
};

/**
 * A token in an expression
 */

var Token =
/**
 * Constructs a token given a token type and terminal
 * @param  {TokenType}  tokenType The type of the token
 * @param  {string}     terminal  The terminal string of the token
 * @return {Token}
 */
function Token(tokenType, terminal) {
   _classCallCheck(this, Token);

   this.tokenType = tokenType;
   this.terminal = terminal;
}

/**
 * Determines if the left token is of lower or equal precedence to the right
 * token for the purpose of the Shunting-Yard Algorithm
 * @param  {TokenType} leftToken  The type of the left token
 * @param  {TokenType} rightToken The type of the right token
 * @return {boolean}              Whether the left token is of lower or equal
 * precedence to the right token
 */
;

var isLeftTokenLowerOrEqualPrecedence = function isLeftTokenLowerOrEqualPrecedence(leftToken, rightToken) {
   return (
      // Invisible Times has the highest precedence of the operators since it is
      // elided in order to imply a strong coupling between terms
      rightToken === TokenType.invisibleTimes ||

      // Non-operators all have the same precedence
      !isTokenOperator(leftToken) && !isTokenOperator(rightToken) ||

      // Operators, except for invisible times, have lower precedence than
      // non-operators
      isTokenOperator(leftToken) && leftToken !== TokenType.invisibleTimes && !isTokenOperator(rightToken) || (

      // Times and divide have the second highest precedence amongst operators
      rightToken === TokenType.times || rightToken === TokenType.divide) || (

      // The right token must be plus or minus so verify that the left token is
      // also plus or minus
      leftToken === TokenType.plus || leftToken === TokenType.minus)
   );
};

/**
 * Converts an infix operator into a binary function
 * @param  {Token} token The operator token
 * @return {Token}       A binary function token
 */
var operatorToBinaryFunction = function operatorToBinaryFunction(token) {
   if (!isTokenOperator(token.tokenType)) {
      throw new Error('Assertion failed: expected operator token');
   }

   return new Token(TokenType.binaryFunction, token.terminal);
};

/**
 * An exception thrown when a syntactically-malformed expression is encountered
 */

var ExpressionSyntaxError = (function (_Error) {
   _inherits(ExpressionSyntaxError, _Error);

   /**
    * Constructs an ExpressionSyntaxError
    * @param  {string}                message The exception message
    * @return {ExpressionSyntaxError}
    */

   function ExpressionSyntaxError(message) {
      _classCallCheck(this, ExpressionSyntaxError);

      _get(Object.getPrototypeOf(ExpressionSyntaxError.prototype), 'constructor', this).call(this, message);
      this.message = message;
   }

   return ExpressionSyntaxError;
})(Error)

/**
 * Coverts an expression from infix notation to reverse polish notation using
 * the Shunting-Yard Algorithm
 * @param  {Token[]} tokens An array of tokens in infix-notation
 * @return {Token[]}        An array of tokens in reverse polish notation
 */
;

var convertToReversePolishNotation = function convertToReversePolishNotation(tokens) {
   // The current stack of operators. This uses shift/unshift so that the first
   // element is the top of the stack.
   var ops = [];

   // The tokens in reverse polish notation
   var rpn = [];

   tokens.forEach(function (token, index) {
      if (isTokenValue(token.tokenType)) {
         rpn.push(token);
      } else if (token.tokenType === TokenType.openParenthesis) {
         ops.unshift(token);
      } else if (isTokenScopeEnding(token.tokenType)) {
         while (ops.length !== 0 && ops[0].tokenType !== TokenType.openParenthesis) {
            if (isTokenOperator(ops[0].tokenType)) {
               rpn.push(operatorToBinaryFunction(ops[0]));
            } else {
               rpn.push(ops[0]);
            }

            ops.shift();
         }

         if (ops.length === 0 || ops[0].tokenType !== TokenType.openParenthesis) {
            if (token.tokenType === TokenType.comma) {
               throw new ExpressionSyntaxError('Misplaced comma');
            } else if (token.terminal === KnownCharacters.closeParenthesis) {
               throw new ExpressionSyntaxError('Too many close parentheses');
            } else {
               throw new ExpressionSyntaxError('Mismatched circumfix operator');
            }
         }

         if (ops.length !== 0 && token.tokenType === TokenType.closeParenthesis) {
            if (!doParenthesesMatch(ops[0].terminal, token.terminal)) {
               throw new ExpressionSyntaxError('Mismatched circumfix operator');
            }

            // Pop open parenthesis
            ops.shift();

            if (ops.length !== 0 && isTokenFunction(ops[0].tokenType)) {
               rpn.push(ops[0]);
               ops.shift();
            }
         }
      } else if (isTokenOperator(token.tokenType)) {
         // Check for a right hand operand. This is required because a syntax
         // error elsewhere in the expression may create an opporunity for an
         // operand to appear - for example "real(2, 3) +"
         var nextIndex = index + 1;
         if (nextIndex >= tokens.length) {
            throw new ExpressionSyntaxError('Missing right hand operand');
         }

         while (ops.length !== 0 && isLeftTokenLowerOrEqualPrecedence(token.tokenType, ops[0].tokenType)) {
            if (isTokenOperator(ops[0].tokenType)) {
               rpn.push(operatorToBinaryFunction(ops[0]));
            } else if (isTokenFunction(ops[0].tokenType)) {
               rpn.push(ops[0]);
            } else {
               break;
            }

            ops.shift();
         }

         ops.unshift(token);
      } else if (token.tokenType === TokenType.unaryFunction) {
         ops.unshift(token);
      } else if (token.tokenType === TokenType.binaryFunction) {
         var nextIndex = index + 1;
         if (nextIndex >= tokens.length || tokens[nextIndex].tokenType !== TokenType.openParenthesis) {
            throw new ExpressionSyntaxError('Binary functions must use parentheses');
         }

         ops.unshift(token);
      } else {
         throw new Error('Assertion failed: unknown token type');
      }
   });

   while (ops.length !== 0) {
      if (ops[0].tokenType === TokenType.openParenthesis) {
         if (ops[0].terminal === KnownCharacters.openParenthesis) {
            throw new ExpressionSyntaxError('Too many open parentheses');
         } else {
            throw new ExpressionSyntaxError('Mismatched circumfix operator');
         }
      }

      if (isTokenOperator(ops[0].tokenType)) {
         rpn.push(operatorToBinaryFunction(ops[0]));
      } else {
         rpn.push(ops[0]);
      }

      ops.shift();
   }

   if (rpn.length === 0) {
      throw new ExpressionSyntaxError('Empty expression');
   }

   return rpn;
};

/**
 * The set of known constants
 * @readonly
 * @enum {Complex}
 */
var KnownConstants = {
   e: ComplexMath.E,
   i: ComplexMath.I,
   pi: ComplexMath.PI
};

/**
 * Whether a terminal is a known constant
 * @param  {string} terminal The terminal
 * @return {boolean}         Whether the terminal is a known constant
 */
var isKnownConstant = function isKnownConstant(terminal) {
   return KnownConstants.hasOwnProperty(terminal);
};

/**
 * Converts a terminal into either the value of a known constant or a complex
 * number
 * @param  {string} terminal The terminal
 * @return {Complex}         The complex value of the terminal
 */
var numberFromTerminal = function numberFromTerminal(terminal) {
   if (isKnownConstant(terminal)) {
      return KnownConstants[terminal];
   }

   return new _complexJs2['default'](Number.parseFloat(terminal));
};

/**
 * The known unary functions
 * @readonly
 * @enum {callback}
 */
var KnownUnaryFunctions = (_KnownUnaryFunctions = {
   abs: ComplexMath.abs,
   arccos: ComplexMath.acos,
   arccosh: ComplexMath.acosh,
   arccot: ComplexMath.acot,
   arccoth: ComplexMath.acoth,
   arccsc: ComplexMath.acsc,
   arccsch: ComplexMath.acsch,
   arcsec: ComplexMath.asec,
   arcsech: ComplexMath.asech,
   arcsin: ComplexMath.asin,
   arcsinh: ComplexMath.asinh,
   arctan: ComplexMath.atan,
   arctanh: ComplexMath.atanh,
   arg: ComplexMath.arg,
   ceil: ComplexMath.ceil,
   conj: ComplexMath.conj,
   cos: ComplexMath.cos,
   cosh: ComplexMath.cosh,
   cot: ComplexMath.cot,
   coth: ComplexMath.coth,
   csc: ComplexMath.csc,
   csch: ComplexMath.csch,
   exp: ComplexMath.exp,
   floor: ComplexMath.floor,
   frac: ComplexMath.frac,
   imag: ComplexMath.imag
}, _defineProperty(_KnownUnaryFunctions, KnownConstants.blackLetterCapitalI, ComplexMath.imag), _defineProperty(_KnownUnaryFunctions, 'log10', ComplexMath.log10), _defineProperty(_KnownUnaryFunctions, 'lg', ComplexMath.log2), _defineProperty(_KnownUnaryFunctions, 'ln', ComplexMath.ln), _defineProperty(_KnownUnaryFunctions, '-', ComplexMath.negate), _defineProperty(_KnownUnaryFunctions, 'nint', ComplexMath.nint), _defineProperty(_KnownUnaryFunctions, 'norm', ComplexMath.norm), _defineProperty(_KnownUnaryFunctions, 'real', ComplexMath.real), _defineProperty(_KnownUnaryFunctions, KnownConstants.blackLetterCapitalR, ComplexMath.real), _defineProperty(_KnownUnaryFunctions, 'sec', ComplexMath.sec), _defineProperty(_KnownUnaryFunctions, 'sech', ComplexMath.sech), _defineProperty(_KnownUnaryFunctions, 'sin', ComplexMath.sin), _defineProperty(_KnownUnaryFunctions, 'sinh', ComplexMath.sinh), _defineProperty(_KnownUnaryFunctions, 'sqrt', ComplexMath.sqrt), _defineProperty(_KnownUnaryFunctions, 'tan', ComplexMath.tan), _defineProperty(_KnownUnaryFunctions, 'tanh', ComplexMath.tanh), _KnownUnaryFunctions);

/**
 * Whether a terminal is a known unary function
 * @param  {string} terminal The terminal
 * @return {boolean}         Whether the terminal is a known unary function
 */
var isKnownUnaryFunction = function isKnownUnaryFunction(terminal) {
   return KnownUnaryFunctions.hasOwnProperty(terminal);
};

/**
 * Converts a terminal into an unary function
 * @param  {string}   terminal The terminal
 * @return {callback}          The function implementing the unary function
 */
var unaryFunctionFromTerminal = function unaryFunctionFromTerminal(terminal) {
   if (isKnownUnaryFunction(terminal)) {
      return KnownUnaryFunctions[terminal];
   }

   throw new Error('Assertion failed: attempting to create unknown unary function');
};

/**
 * The known binary functions
 * @readonly
 * @enum {callback}
 */
var KnownBinaryFunctions = {
   log: ComplexMath.log,
   mod: ComplexMath.mod,
   pow: ComplexMath.pow,
   '+': ComplexMath.add,
   '-': ComplexMath.subtract,
   '*': ComplexMath.multiply,
   '/': ComplexMath.divide
};

/**
 * Whether a terminal is a known binary function
 * @param  {string} terminal The terminal
 * @return {boolean}         Whether the terminal is a known binary function
 */
var isKnownBinaryFunction = function isKnownBinaryFunction(terminal) {
   return KnownBinaryFunctions.hasOwnProperty(terminal);
};

/**
 * Converts a terminal into an binary function
 * @param  {string}   terminal The terminal
 * @return {callback}          The function implementing the binary function
 */
var binaryFunctionFromTerminal = function binaryFunctionFromTerminal(terminal) {
   if (isKnownBinaryFunction(terminal)) {
      return KnownBinaryFunctions[terminal];
   }

   throw new Error('Assertion failed: attempting to create unknown binary function');
};

/**
 * Processes a set of tokens to add implied elements such as invisible times or
 * to differentiate between elements which are ambiguous at tokenization time
 * such as unary vs. binary plus and minus.
 * @param  {Token[]} tokens An array of tokens
 * @return {Token[]}        An array of tokens in which implied and ambiguous
 * elements are resolved
 */
var processHiddenElements = function processHiddenElements(tokens) {
   var processedTokens = [];
   tokens.forEach(function (token, index) {
      var nextIndex = index + 1;
      var isLastToken = nextIndex === tokens.length;

      switch (token.tokenType) {
         case TokenType.space:
            // Spaces are no longer needed for correct processing
            break;

         case TokenType.closeParenthesis:
         case TokenType.number:
         case TokenType.symbol:
            processedTokens.push(token);

            if (!isLastToken && tokenImpliesMultiplication(tokens[nextIndex].tokenType)) {
               processedTokens.push(new Token(TokenType.invisibleTimes, '*'));
            }
            break;

         case TokenType.comma:
            if (processedTokens.length === 0 || processedTokens[processedTokens.length - 1].tokenType === TokenType.openParenthesis || !isLastToken && tokens[nextIndex].tokenType === TokenType.closeParenthesis) {
               throw new ExpressionSyntaxError("Misplaced comma");
            }

            processedTokens.push(token);
            break;

         case TokenType.plus:
         case TokenType.minus:
            if (processedTokens.length === 0 || isTokenUnaryForcing(processedTokens[processedTokens.length - 1].tokenType)) {
               if (token.tokenType === TokenType.minus) {
                  // Unary plus is the identity function, so ignore it
                  // altogether
                  processedTokens.push(new Token(TokenType.unaryFunction, token.terminal));
               }
            } else {
               processedTokens.push(token);
            }

            break;

         case TokenType.openParenthesis:
         case TokenType.times:
         case TokenType.invisibleTimes:
         case TokenType.divide:
         case TokenType.unaryFunction:
         case TokenType.binaryFunction:
            processedTokens.push(token);
            break;
      }
   });

   return processedTokens;
};

/**
 * Determines whether a character is alphabetic
 * @param  {string} c The character
 * @return {boolean}  Whether the character is alphabetic
 */
var isAlphabeticCharacter = function isAlphabeticCharacter(c) {
   return /[A-Za-z]/.test(c);
};

/**
 * Determines whether a character is a digit
 * @param  {string} c The character
 * @return {boolean}  Whether the character is a digit
 */
var isDigitCharacter = function isDigitCharacter(c) {
   return /\d/.test(c);
};

/**
 * Determines whether a character is a numeric
 * @param  {string} c The character
 * @return {boolean}  Whether the character is a numeric
 */
var isNumericCharacter = function isNumericCharacter(c) {
   return /\d|\./.test(c);
};

/**
 * Determines whether a character is a space
 * @param  {string} c The character
 * @return {boolean}  Whether the character is a space
 */
var isSpaceCharacter = function isSpaceCharacter(c) {
   return /\s/.test(c);
};

/**
 * Determines whether a character is a high surrogate
 * @param  {string} c The character
 * @return {boolean}  Whether the character is a high surrogate
 */
var isHighSurrogateCharacter = function isHighSurrogateCharacter(c) {
   return c.charCodeAt(0) >= 0xD800 && c.charCodeAt(0) <= 0xDBFF;
};

/**
 * Determines whether a character is a loe surrogate
 * @param  {string} c The character
 * @return {boolean}  Whether the character is a low surrogate
 */
var isLowSurrogateCharacter = function isLowSurrogateCharacter(c) {
   return c.charCodeAt(0) >= 0xDC00 && c.charCodeAt(0) <= 0xDFFF;
};

/**
 * Finds the ending index of a symbol
 * @param  {number}   startIndex The starting index of the symbol
 * @param  {string}   expression The expression
 * points
 * @return {number}              The ending index of the symbol
 */
var findSymbolEndIndex = function findSymbolEndIndex(startIndex, expression) {
   var startCharacter = expression[startIndex];

   var endIndex = undefined;
   if (isLowSurrogateCharacter(startCharacter)) {
      throw new ExpressionSyntaxError('Encountered low surrogate without a corresponding high surrogate');
   } else if (isHighSurrogateCharacter(startCharacter)) {
      endIndex = startIndex + 2;
      if (endIndex > expression.length || !isLowSurrogateCharacter(expression[startIndex + 1])) {
         throw new ExpressionSyntaxError('Encountered high surrogate without a corresponding low surrogate');
      }
   } else if (isAlphabeticCharacter(startCharacter)) {
      var substring = expression.substring(startIndex);

      var relativeEndIndex = substring.search(/[^A-Za-z]|$/);
      if (relativeEndIndex !== -1 && isDigitCharacter(expression[relativeEndIndex])) {
         // Some symbols can have digits directly after, such as log10
         substring = substring.substring(relativeEndIndex);
         relativeEndIndex += substring.search(/\D/);
      }

      if (relativeEndIndex !== -1) {
         endIndex = relativeEndIndex + startIndex;
      } else {
         endIndex = startIndex + 1;
      }
   } else {
      // Single character Unicode symbol
      endIndex = startIndex + 1;
   }

   return endIndex;
};

/**
 * Tokenizes an expression
 * @param  {string} expression The expression to tokenize
 * @return {Token}             The set of tokens
 */
var tokenize = function tokenize(expression) {
   // This method explicitly does not support using | to mean absolute since
   // allowing this notation as well as invisible times leads to ambiguous
   // expressions such as |x|x|x|
   var tokens = [];
   var startIndex = 0;
   while (startIndex !== expression.length) {
      var character = expression[startIndex];

      if (character === '\u0000') {
         // Reached the end of the string, explicitly not supporting embedded
         // nulls
         break;
      } else if (isSpaceCharacter(character)) {
         tokens.push(new Token(TokenType.space, ' '));
         ++startIndex;
      } else if (character === KnownCharacters.openParenthesis) {
         tokens.push(new Token(TokenType.openParenthesis, '('));
         ++startIndex;
      } else if (character === KnownCharacters.openFloor) {
         tokens.push(new Token(TokenType.unaryFunction, 'floor'));
         tokens.push(new Token(TokenType.openParenthesis, KnownCharacters.openFloor));
         ++startIndex;
      } else if (character === KnownCharacters.openCeiling) {
         tokens.push(new Token(TokenType.unaryFunction, 'ceil'));
         tokens.push(new Token(TokenType.openParenthesis, KnownCharacters.openCeiling));
         ++startIndex;
      } else if (character === KnownCharacters.openBracket) {
         tokens.push(new Token(TokenType.unaryFunction, 'nint'));
         tokens.push(new Token(TokenType.openParenthesis, KnownCharacters.openBracket));
         ++startIndex;
      } else if (character === KnownCharacters.closeParenthesis || character === KnownCharacters.closeFloor || character === KnownCharacters.closeCeiling || character === KnownCharacters.closeBracket) {
         tokens.push(new Token(TokenType.closeParenthesis, character));
         ++startIndex;
      } else if (character === KnownCharacters.comma || character === KnownCharacters.invisibleSeparator) {
         tokens.push(new Token(TokenType.comma, ','));
         ++startIndex;
      } else if (isNumericCharacter(character)) {
         // Tokenize number
         var substring = expression.substring(startIndex);
         var terminal = substring.match(/^\d+(?:\.\d+)?/);
         tokens.push(new Token(TokenType.number, terminal[0]));

         startIndex += terminal[0].length;
      } else if (character === KnownCharacters.plus || character === KnownCharacters.invisiblePlus) {
         tokens.push(new Token(TokenType.plus, '+'));
         ++startIndex;
      } else if (character === KnownCharacters.minus || character === KnownCharacters.minusSign) {
         tokens.push(new Token(TokenType.minus, '-'));
         ++startIndex;
      } else if (character === KnownCharacters.times || character === KnownCharacters.dotOperator || character === KnownCharacters.multiplicationSign) {
         tokens.push(new Token(TokenType.times, '*'));
         ++startIndex;
      } else if (character === KnownCharacters.invisibleTimes) {
         tokens.push(new Token(TokenType.invisibleTimes, '*'));
         ++startIndex;
      } else if (character === KnownCharacters.divide || character === KnownCharacters.divisionSign || character === KnownCharacters.fractionSlash || character === KnownCharacters.divisionSlash) {
         tokens.push(new Token(TokenType.divide, '/'));
         ++startIndex;
      } else {
         var endIndex = findSymbolEndIndex(startIndex, expression);
         var terminal = expression.substring(startIndex, endIndex);

         var tokenType = undefined;
         if (isKnownConstant(terminal)) {
            tokenType = TokenType.number;
         } else if (isKnownUnaryFunction(terminal)) {
            tokenType = TokenType.unaryFunction;
         } else if (isKnownBinaryFunction(terminal)) {
            tokenType = TokenType.binaryFunction;
         } else {
            tokenType = TokenType.symbol;
         }

         tokens.push(new Token(tokenType, terminal));
         startIndex = endIndex;
      }
   }

   return tokens;
};

/**
 * A phrase representing a number
 */

var NumberPhrase = (function () {
   /**
    * Constructs a NumberPhrase from a number
    * @param  {number|Complex} value The value of the number phrase
    * @return {NumberPhrase}
    */

   function NumberPhrase(value) {
      _classCallCheck(this, NumberPhrase);

      this.value = value;
   }

   /**
    * Evaluates the phrase
    * @return {number|Complex} The value of the phrase
    */

   _createClass(NumberPhrase, [{
      key: 'evaluate',
      value: function evaluate() {
         return this.value;
      }
   }]);

   return NumberPhrase;
})()

/**
 * An error raised when the expression is syntactically valid but cannot be
 * evaluated
 */
;

var ExpressionEvaluationError = (function (_Error2) {
   _inherits(ExpressionEvaluationError, _Error2);

   /**
    * Constructs an ExpressionEvaluationError
    * @param  {string}                    message The exception message
    * @return {ExpressionEvaluationError}
    */

   function ExpressionEvaluationError(message) {
      _classCallCheck(this, ExpressionEvaluationError);

      _get(Object.getPrototypeOf(ExpressionEvaluationError.prototype), 'constructor', this).call(this, message);
      this.message = message;
   }

   return ExpressionEvaluationError;
})(Error)

/**
 * A phrase representing a variable
 */
;

var VariablePhrase = (function () {
   /**
    * Constructs a VariablePhrase from a symbol
    * @param  {string}         symbol The symbol of the variable
    * @return {VariablePhrase}
    */

   function VariablePhrase(symbol) {
      _classCallCheck(this, VariablePhrase);

      this.symbol = symbol;
   }

   /**
    * Evaluates the phrase
    * @param  {Object.<string, number|Complex>=} symbols A dictionary of
    * symbols and their values
    * @return {number|Complex} The value of the phrase
    */

   _createClass(VariablePhrase, [{
      key: 'evaluate',
      value: function evaluate() {
         var symbols = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

         if (!symbols.hasOwnProperty(this.symbol)) {
            throw new ExpressionEvaluationError('Variable ' + this.symbol + ' does not have a defined value');
         }

         return symbols[this.symbol];
      }
   }]);

   return VariablePhrase;
})()

/**
 * A phrase representing a function
 */
;

var FunctionPhrase = (function () {
   /**
    * Constructs a FunctionPhrase from a function
    * @param  {callback}                                         evalFunction The
    * function used to evaluate this phrase
    * @param  {NumberPhrase[]|VariablePhrase[]|FunctionPhrase[]} children The child
    * phrases of this phrase
    * @return {FunctionPhrase}
    */

   function FunctionPhrase(evalFunction, children) {
      _classCallCheck(this, FunctionPhrase);

      if (children.length !== evalFunction.length) {
         throw new ExpressionSyntaxError('Improper number of arguments');
      }

      this.evalFunction = evalFunction;
      this.children = children;
   }

   /**
    * Evaluates the phrase
    * @param  {Object.<string, number|Complex>=} symbols A dictionary of
    * symbols and their values
    * @return {number|Complex} The value of the phrase
    */

   _createClass(FunctionPhrase, [{
      key: 'evaluate',
      value: function evaluate() {
         var symbols = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

         return this.evalFunction.apply(null, this.children.map(function (phrase) {
            return phrase.evaluate(symbols);
         }));
      }
   }]);

   return FunctionPhrase;
})()

/**
 * Builds a parse tree from a tokenized expression
 * @param  {Token[]} tokens A tokenized expression
 * @return {NumberPhrase|VariablePhrase|FunctionPhrase} The root of the parse
 * tree
 */
;

var buildParseTree = function buildParseTree(tokens) {
   var stack = [];

   tokens.forEach(function (token) {
      switch (token.tokenType) {
         case TokenType.number:
            stack.push(new NumberPhrase(numberFromTerminal(token.terminal)));
            break;

         case TokenType.symbol:
            stack.push(new VariablePhrase(token.terminal));
            break;

         case TokenType.unaryFunction:
            if (stack.length === 0) {
               throw new ExpressionSyntaxError('Too few arguments for function ' + token.terminal);
            }

            stack.push(new FunctionPhrase(unaryFunctionFromTerminal(token.terminal), [stack.pop()]));
            break;

         case TokenType.binaryFunction:
            if (stack.length < 2) {
               throw new ExpressionSyntaxError('Too few arguments for function ' + token.terminal);
            }

            var children = [stack.pop(), stack.pop()].reverse();
            stack.push(new FunctionPhrase(binaryFunctionFromTerminal(token.terminal), children));
            break;

         default:
            throw new Error('Assertion failed: unexpected token type');
      }
   });

   if (stack.length === 0) {
      throw new ExpressionSyntaxError('Empty expression');
   } else if (stack.length !== 1) {
      throw new ExpressionSyntaxError('Unexpected expression');
   }

   return stack[0];
};

/**
 * An expression
 */

var _default = (function () {
   /**
    * Constructs an expression from a string
    * @param  {string} expression The expression string
    * @return {Expression}
    */

   function _default(expression) {
      _classCallCheck(this, _default);

      this.phrase = buildParseTree(convertToReversePolishNotation(processHiddenElements(tokenize(expression))));
   }

   /**
    * Evaluates the expression
    * @param  {Object.<string, number|Complex>=} symbols A dictionary of
    * symbols and their values
    * @return {number|Complex} The value of the expression
    */

   _createClass(_default, [{
      key: 'evaluate',
      value: function evaluate() {
         var symbols = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

         return this.phrase.evaluate(symbols);
      }
   }]);

   return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];
},{"./complex-math.js":"complex-math","./complex.js":"complex"}]},{},[]);
