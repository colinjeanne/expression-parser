/**
 * @overview Describes an object analogous to the built-in Math object but over
 * the complex numbers
 * @author Colin Jeanne <colinjeanne@hotmail.com> (http://www.colinjeanne.net)
 */

import Complex from './complex.js';

/**
 * A common method to convert between various number-like objects to {Complex}
 * @param  {*} u     An object to convert to a {Complex}
 * @return {Complex}
 */
const toComplex = u => {
   if (u instanceof Complex) {
      return u;
   } else if (u instanceof Number) {
      return new Complex(u.valueOf);
   } else if (typeof u === 'number') {
      return new Complex(u);
   } else if ((typeof u === 'object') &&
      (u.hasOwnProperty('real') && (typeof u.real === 'number')) &&
      (u.hasOwnProperty('imaginary') && (typeof u.imaginary === 'number'))) {
      return new Complex(u.real, u.imaginary);
   }

   throw new TypeError('Expected numeric type');
}

/**
 * Euler's constant
 * @type {Complex}
 */
export const E = new Complex(Math.E);

/**
 * The imaginary unit
 * @type {Complex}
 */
export const I = new Complex(0, 1);

/**
 * Natural logarithm of 10
 * @type {Complex}
 */
export const LN10 = new Complex(Math.LN10);

/**
 * Natural logarithm of 2
 * @type {Complex}
 */
export const LN2 = new Complex(Math.LN2);

/**
 * Base 2 logarithm of E
 * @type {Complex}
 */
export const LOG2E = new Complex(Math.LOG2E);

/**
 * Base 10 logarithm of E
 * @type {Complex}
 */
export const LOG10E = new Complex(Math.LOG10E);

/**
 * Ratio of the circumference of a circle to its diameter
 * @type {Complex}
 */
export const PI = new Complex(Math.PI);

/**
 * Square root of 1/2
 * @type {Complex}
 */
export const SQRT1_2 = new Complex(Math.SQRT1_2);

/**
 * Square root of 2
 * @type {Complex}
 */
export const SQRT2 = new Complex(Math.SQRT2);

/**
 * The real part of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The real part of the number
 */
export const real = u => new Complex(toComplex(u).real);

/**
 * The imaginary part of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The imaginary part of the number
 */
export const imaginary = u => new Complex(toComplex(u).imaginary);

/**
 * Adds two numbers
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The sum of u and v
 */
export const add = (u, v) =>
   new Complex(
      real(u).real + real(v).real,
      imaginary(u).real + imaginary(v).real);

/**
 * Subtracts two numbers
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The result of u subtracting v
 */
export const subtract = (u, v) =>
   new Complex(
      real(u).real - real(v).real,
      imaginary(u).real - imaginary(v).real);

/**
 * Multiplies two numbers
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The product of u and v
 */
export const multiply = (u, v) => {
   const complexU = toComplex(u);
   const complexV = toComplex(v);

   return new Complex(
      complexU.real * complexV.real - complexU.imaginary * complexV.imaginary,
      complexU.real * complexV.imaginary + complexU.imaginary * complexV.real);
};

/**
 * Negates a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The negation of u
 */
export const negate = u => {
   const complexU = toComplex(u);
   return new Complex(-complexU.real, -complexU.imaginary);
};

/**
 * The argument or phase of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The argument of u
 */
export const arg = u =>
   new Complex(Math.atan2(imaginary(u).real, real(u).real));

/**
 * The smallest Gaussian Integer less than or equal to a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The ceiling of u
 */
export const ceil = u =>
   new Complex(Math.ceil(real(u).real), Math.ceil(imaginary(u).real));

/**
 * The complex conjugate of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The conjugate of u
 */
export const conj = u => new Complex(real(u).real, -(imaginary(u).real));

/**
 * Eular's constant raised to the power of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} Euler's constant raised to the power of u
 */
export const exp = u => {
   const complexU = toComplex(u);
   const newAbs = Math.exp(complexU.real);
   const newArg = complexU.imaginary;
   return new Complex(newAbs * Math.cos(newArg), newAbs * Math.sin(newArg));
};

/**
 * The cosine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The cosine of u
 */
export const cos = u => {
   const iu = multiply(I, u);
   return divide(add(exp(iu), exp(negate(iu))), 2);
};

/**
 * The hyperbolic cosine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic cosine of u
 */
export const cosh = u =>
   divide(add(exp(u), exp(negate(u))), 2);

/**
 * The largest Gaussian Integer less than or equal to a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The floor of u
 */
export const floor = u =>
   new Complex(Math.floor(real(u).real), Math.floor(imaginary(u).real));

/**
 * The fractional part of a real number
 * @param  {Number} n The number
 * @return {Number}   The fractional part of the number
 */
const realFrac = n => (n >= 0) ? (n - Math.floor(n)) : (n - Math.ceil(n));

/**
 * The fractional part of a complex number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The fractional part of u
 */
export const frac = u => {
   const complexU = toComplex(u);
   return new Complex(realFrac(complexU.real), realFrac(complexU.imaginary));
};

/**
 * The natural log (logarithm base e) of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The natural log of u
 */
export const ln = u =>
   new Complex(Math.log(abs(u).real), arg(u).real);

/**
 * The nearest Gaussian Integer to a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The nearest Gaussian Integer to u
 */
export const nint = u => floor(add(u, new Complex(0.5, 0.5)));

/**
 * The norm of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The norm of u
 */
export const norm = u =>
   new Complex(
      real(u).real * real(u).real +
      imaginary(u).real * imaginary(u).real);

/**
 * The absolute value, or magnitude, of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The absolute value of u
 */
export const abs = u => new Complex(Math.sqrt(norm(u).real));

/**
 * Divides two numbers
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The result of dividing u by v
 */
export const divide = (u, v) => {
   const complexU = toComplex(u);
   const complexV = toComplex(v);
   const normV = norm(v).real;

   return new Complex(
      (complexU.real * complexV.real + complexU.imaginary * complexV.imaginary) / normV,
      (complexU.imaginary * complexV.real - complexU.real * complexV.imaginary) / normV);
};

/**
 * The complex modulus of a number
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The result of u mod v
 */
export const mod = (u, v) => subtract(u, multiply(v, floor(divide(u, v))));

/**
 * The logarithm of a number to a given base
 * @param  {*} base  A number or complex number-like object that is the base of
 * the logarithm
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The logarithm base base of u
 */
export const log = (base, u) => divide(ln(u), ln(base));

/**
 * The logarithm base 2 of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The logarithm base 2 of u
 */
export const log2 = u => divide(ln(u), Math.LN2);

/**
 * The logarithm base 10 of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The logarithm base 10 of u
 */
export const log10 = u => divide(ln(u), Math.LN10);

/**
 * The exponent of a base raised to a power
 * @param  {*} base  A number or complex number-like object that is the base of
 * the exponent
 * @param  {*} power A number or complex number-like object that is the power of
 * the exponent
 * @return {Complex} The exponent of base raised to power
 */
export const pow = (base, power) => exp(multiply(power, ln(base)));

/**
 * The secant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The secant of u
 */
export const sec = u => divide(1, cos(u));

/**
 * The hyperbolic secant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic secant of u
 */
export const sech = u => divide(1, cosh(u));

/**
 * The sine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The sine of u
 */
export const sin = u => {
   const iu = multiply(I, u);
   return divide(subtract(exp(iu), exp(negate(iu))), new Complex(0, 2));
};

/**
 * The hyperbolic sine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic sine of u
 */
export const sinh = u =>
   divide(subtract(exp(u), exp(negate(u))), 2);

/**
 * The cosecant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The cosecant of u
 */
export const csc = u => divide(1, sin(u));

/**
 * The hyperbolic cosecant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic cosecant of u
 */
export const csch = u => divide(1, sinh(u));

/**
 * The square root of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The square root of u
 */
export const sqrt = u => {
   const complexU = toComplex(u);
   const absU = abs(u).real;

   return new Complex(
      Math.sqrt((complexU.real + absU) / 2),
      Math.sign(complexU.imaginary) * Math.sqrt((-complexU.real + absU) / 2));
};

/**
 * The tangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The tangent of u
 */
export const tan = u => {
   const exp_2iu = exp(multiply(new Complex(0, 2), u));
   return divide(subtract(exp_2iu, 1), multiply(I, add(exp_2iu, 1)));
};

/**
 * The hyperbolic tangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic tangent of u
 */
export const tanh = u => {
   const exp_u = exp(u);
   const exp_negate_u = exp(negate(u));
   return divide(subtract(exp_u, exp_negate_u), add(exp_u, exp_negate_u));
};

/**
 * The cotangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The cotangent of u
 */
export const cot = u => divide(1, tan(u));

/**
 * The hyperbolic cotangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic cotangent of u
 */
export const coth = u => divide(1, tanh(u));

/**
 * The inverse cosine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse cosine of u
 */
export const acos = u =>
   add(
      Math.PI / 2,
      multiply(
         I,
         ln(
            add(
               multiply(I, u),
               sqrt(
                  subtract(
                     1,
                     multiply(u, u)))))));

/**
 * The inverse hyperbolic cosine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic cosine of u
 */
export const acosh = u =>
   ln(
      add(
         u,
         multiply(
            sqrt(add(u, 1)),
            sqrt(subtract(u, 1)))));

/**
 * The inverse cotangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse cotangent of u
 */
export const acot = u =>
   multiply(
      divide(I, 2),
      subtract(
         ln(
            divide(subtract(u, I), u)),
         ln(
            divide(add(u, I), u))));

/**
 * The inverse hyperbolic cotangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic cotangent of u
 */
export const acoth = u => {
   const reciprocal = divide(1, u);
   return divide(
      subtract(
         ln(add(1, reciprocal)),
         ln(subtract(1, reciprocal))),
      2);
};

/**
 * The inverse cosecant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse cosecant of u
 */
export const acsc = u =>
   multiply(
      new Complex(0, -1),
      ln(
         add(
            sqrt(
               subtract(
                  1,
                  divide(1, multiply(u, u)))),
            divide(I, u))));

/**
 * The inverse hyperbolic cosecant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic cosecant of u
 */
export const acsch = u =>
   add(
      new Complex(0, -Math.PI / 2),
      multiply(I, acos(divide(I, u))));

/**
 * The inverse secant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse secant of u
 */
export const asec = u =>
   add(
      new Complex(Math.PI / 2),
      multiply(
         I,
         ln(
            add(
               sqrt(
                  subtract(
                     1,
                     divide(1, multiply(u, u)))),
               divide(I, u)))));

/**
 * The inverse hyperbolic secant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic secant of u
 */
export const asech = u => {
   const reciprocal = divide(1, u);
   return ln(
      add(
         multiply(
            sqrt(subtract(reciprocal, 1)),
            sqrt(add(reciprocal, 1))),
         reciprocal));
};

/**
 * The inverse sine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse sine of u
 */
export const asin = u =>
   multiply(
      new Complex(0, -1),
      ln(
         add(
            multiply(I, u),
            sqrt(
               subtract(
                  1,
                  multiply(u, u))))));

/**
 * The inverse hyperbolic sine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic sine of u
 */
export const asinh = u =>
   ln(
      add(
         u,
         sqrt(add(multiply(u, u), 1))));

/**
 * The inverse tangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse tangent of u
 */
export const atan = u => {
   const iu = multiply(I, u);
   return multiply(
      divide(I, 2),
      subtract(
         ln(subtract(1, iu)),
         ln(add(1, iu))));
};

/**
 * The inverse hyperbolic tangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic tangent of u
 */
export const atanh = u =>
   divide(
      subtract(
         ln(add(1, u)),
         ln(subtract(1, u))),
      2);
