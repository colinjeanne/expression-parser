import Complex from './../src/complex.js';
import * as ComplexMath from './../src/complex-math.js';

describe('ComplexMath', () => {
   it('should have all the constants that Math does', () => {
      const mathConstantProperties = Object.getOwnPropertyNames(Math)
         .filter(p => typeof (Math[p]) === 'number');

      mathConstantProperties.forEach(p => {
         expect(ComplexMath[p]).toBeDefined();
         expect(ComplexMath[p]).toEqual(new Complex(Math[p]));
      });
   });

   describe('real', () => {
      it('should convert number-like inputs to real-valued Complex numbers', () => {
         expect(ComplexMath.real(1.2)).toEqual(new Complex(1.2));
         expect(ComplexMath.real(new Complex(1, 2))).toEqual(new Complex(1));
         expect(ComplexMath.real({real: 1, imaginary: 2})).toEqual(new Complex(1));
      });

      it('should reject non-number-like inputs', () => {
         expect(() => ComplexMath.real('1.2')).toThrow();
         expect(() => ComplexMath.real([])).toThrow();
         expect(() => ComplexMath.real()).toThrow();
         expect(() => ComplexMath.real({real: '1', imaginary: '2'})).toThrow();
      });
   });

   describe('imaginary', () => {
      it('should convert number-like inputs to real-valued Complex numbers', () => {
         expect(ComplexMath.imaginary(1.2)).toEqual(new Complex());
         expect(ComplexMath.imaginary(new Complex(1, 2))).toEqual(new Complex(2));
         expect(ComplexMath.imaginary({real: 1, imaginary: 2})).toEqual(new Complex(2));
      });

      it('should reject non-number-like inputs', () => {
         expect(() => ComplexMath.imaginary('1.2')).toThrow();
         expect(() => ComplexMath.imaginary([])).toThrow();
         expect(() => ComplexMath.imaginary()).toThrow();
         expect(() => ComplexMath.imaginary({real: '1', imaginary: '2'})).toThrow();
      });
   });

   describe('add', () => {
      it('adds two complex numbers', () => {
         expect(
            ComplexMath.add(
               new Complex(1, 2),
               new Complex(3, 4)))
         .toEqual(new Complex(4, 6));
      });
   });

   describe('subtract', () => {
      it('subtracts two complex numbers', () => {
         expect(
            ComplexMath.subtract(
               new Complex(1, 2),
               new Complex(5, -4)))
         .toEqual(new Complex(-4, 6));
      });
   });

   describe('multiply', () => {
      it('multiplies two complex numbers', () => {
         expect(
            ComplexMath.multiply(
               new Complex(2, 5),
               new Complex(3, -4)))
         .toEqual(new Complex(26, 7));
      });
   });

   describe('divide', () => {
      it('adds two complex numbers', () => {
         expect(
            ComplexMath.divide(
               new Complex(1, 2),
               new Complex(3, 4)))
         .toEqual(new Complex(0.44, 0.08));
      });
   });

   describe('negate', () => {
      it('negates a complex number', () => {
         expect(
            ComplexMath.negate(
               new Complex(1, 2)))
         .toEqual(new Complex(-1, -2));
      });
   });

   describe('arg', () => {
      it('is the argument of a complex number', () => {
         const c = ComplexMath.arg(new Complex(Math.sqrt(3), 1));

         expect(c.real).toBeCloseTo(Math.PI / 6);
         expect(c.imaginary).toBe(0);
      });
   });

   describe('ceil', () => {
      it('is the smallest Gaussian Integer less than a complex number', () => {
         expect(
            ComplexMath.ceil(
               new Complex(1.2, 2.7)))
         .toEqual(new Complex(2, 3));

         expect(
            ComplexMath.ceil(
               new Complex(-1.2, -2.7)))
         .toEqual(new Complex(-1, -2));
      });
   });

   describe('conj', () => {
      it('conjugates a complex number', () => {
         expect(
            ComplexMath.conj(
               new Complex(1, 2)))
         .toEqual(new Complex(1, -2));
      });
   });

   describe('exp', () => {
      it('raises E to a complex number', () => {
         let c = ComplexMath.exp(1);

         expect(c.real).toBeCloseTo(Math.E);
         expect(c.imaginary).toBe(0);

         c = ComplexMath.exp(new Complex(2, Math.PI / 3));
         expect(c.real).toBeCloseTo(Math.E * Math.E / 2);
         expect(c.imaginary).toBeCloseTo(Math.E * Math.E * Math.sqrt(3) / 2);
      });
   });

   describe('floor', () => {
      it('is the greatest Gaussian Integer less than a complex number', () => {
         expect(
            ComplexMath.floor(
               new Complex(1.2, 2.7)))
         .toEqual(new Complex(1, 2));

         expect(
            ComplexMath.floor(
               new Complex(-1.2, -2.7)))
         .toEqual(new Complex(-2, -3));
      });
   });

   describe('frac', () => {
      it('is the fractional part of a complex number', () => {
         let c = ComplexMath.frac(new Complex(1.2, 2.7));
         expect(c.real).toBeCloseTo(0.2);
         expect(c.imaginary).toBeCloseTo(0.7);

         c = ComplexMath.frac(new Complex(-1.2, -2.7));
         expect(c.real).toBeCloseTo(-0.2);
         expect(c.imaginary).toBeCloseTo(-0.7);
      });
   });

   describe('ln', () => {
      it('is the natural log of a complex number', () => {
         const c = ComplexMath.ln(new Complex(1, Math.sqrt(3)));
         expect(c.real).toBeCloseTo(Math.LN2);
         expect(c.imaginary).toBeCloseTo(Math.PI / 3);
      });
   });

   xdescribe('mandelbrot', () => {
      //
   });

   describe('nint', () => {
      it('is the nearest Gaussian Integer to a complex number', () => {
         expect(
            ComplexMath.nint(
               new Complex(1.2, 2.7)))
         .toEqual(new Complex(1, 3));

         expect(
            ComplexMath.nint(
               new Complex(-1.2, -2.7)))
         .toEqual(new Complex(-1, -3));
      });
   });

   describe('norm', () => {
      it('is the norm of a complex number', () => {
         expect(
            ComplexMath.norm(
               new Complex(3, 4)))
         .toEqual(new Complex(25, 0));
      });
   });

   describe('abs', () => {
      it('is the absolute value of a complex number', () => {
         expect(
            ComplexMath.abs(
               new Complex(3, 4)))
         .toEqual(new Complex(5, 0));
      });
   });

   describe('mod', () => {
      it('is the complex modulus of two complex numbers', () => {
         expect(
            ComplexMath.mod(new Complex(4, 2), new Complex(3, 4)))
         .toEqual(new Complex(0, 5));

         expect(
            ComplexMath.mod(new Complex(4, 2), new Complex(3, -1)))
         .toEqual(new Complex());

         expect(
            ComplexMath.mod(new Complex(1, 1), new Complex(3, -1)))
         .toEqual(new Complex(1, 1));
      });
   });

   describe('log', () => {
      it('is the log of a complex number in a complex base', () => {
         const c = ComplexMath.log(2, new Complex(1, Math.sqrt(3)));
         expect(c.real).toBeCloseTo(1);
         expect(c.imaginary).toBeCloseTo(Math.PI / (3 * Math.LN2));
      });
   });

   describe('log2', () => {
      it('is the log base 2 of a complex number', () => {
         const c = ComplexMath.log2(new Complex(1, Math.sqrt(3)));
         expect(c.real).toBeCloseTo(1);
         expect(c.imaginary).toBeCloseTo(Math.PI / (3 * Math.LN2));
      });
   });

   describe('log10', () => {
      it('is the log base 10 of a complex number', () => {
         const c = ComplexMath.log10(new Complex(1, Math.sqrt(3)));
         expect(c.real).toBeCloseTo(Math.LN2 / Math.LN10);
         expect(c.imaginary).toBeCloseTo(Math.PI / (3 * Math.LN10));
      });
   });

   describe('pow', () => {
      it('raises a complex number to a complex power', () => {
         const c = ComplexMath.pow(Math.E, new Complex(2, Math.PI / 3));
         expect(c.real).toBeCloseTo(Math.E * Math.E / 2);
         expect(c.imaginary).toBeCloseTo(Math.E * Math.E * Math.sqrt(3) / 2);
      });
   });

   describe('cos', () => {
      it('is the cosine of a complex number', () => {
         const c = ComplexMath.cos(new Complex(Math.PI / 3, 1));
         expect(c.real).toBeCloseTo(Math.cosh(1) / 2);
         expect(c.imaginary).toBeCloseTo(-Math.sinh(1) * Math.sqrt(3) / 2);
      });
   });

   describe('cosh', () => {
      it('is the hyperbolic cosine of a complex number', () => {
         const c = ComplexMath.cosh(new Complex(Math.PI / 3, 1));
         expect(c.real).toBeCloseTo(Math.cos(1) * Math.cosh(Math.PI / 3));
         expect(c.imaginary).toBeCloseTo(Math.sin(1) * Math.sinh(Math.PI / 3));
      });
   });

   describe('sec', () => {
      it('is the secant of a complex number', () => {
         const c = ComplexMath.sec(new Complex(Math.PI / 3, 1));

         const denominator = 0.5 - Math.cosh(2);
         expect(c.real).toBeCloseTo(-Math.cosh(1) / denominator);
         expect(c.imaginary).toBeCloseTo(-Math.sinh(1) * Math.sqrt(3) / denominator);
      });
   });

   describe('sech', () => {
      it('is the hyperbolic secant of a complex number', () => {
         const c = ComplexMath.sech(new Complex(3 / Math.PI, 1));

         const denominator = Math.cos(2) + Math.cosh(6 / Math.PI);
         expect(c.real).toBeCloseTo(2 * Math.cos(1) * Math.cosh(3 / Math.PI) / denominator);
         expect(c.imaginary).toBeCloseTo(-2 * Math.sin(1) * Math.sinh(3 / Math.PI) / denominator);
      });
   });

   describe('sin', () => {
      it('is the sine of a complex number', () => {
         const c = ComplexMath.sin(new Complex(Math.PI / 3, 1));
         expect(c.real).toBeCloseTo(Math.cosh(1) * Math.sqrt(3) / 2);
         expect(c.imaginary).toBeCloseTo(Math.sinh(1) / 2);
      });
   });

   describe('sinh', () => {
      it('is the hyperbolic sine of a complex number', () => {
         const c = ComplexMath.sinh(new Complex(Math.PI / 3, 1));
         expect(c.real).toBeCloseTo(Math.cos(1) * Math.sinh(Math.PI / 3));
         expect(c.imaginary).toBeCloseTo(Math.sin(1) * Math.cosh(Math.PI / 3));
      });
   });

   describe('csc', () => {
      it('is the cosecant of a complex number', () => {
         const c = ComplexMath.csc(new Complex(Math.PI / 3, 1));

         const denominator = 0.5 + Math.cosh(2);
         expect(c.real).toBeCloseTo(Math.sqrt(3) * Math.cosh(1) / denominator);
         expect(c.imaginary).toBeCloseTo(-Math.sinh(1) / denominator);
      });
   });

   describe('csch', () => {
      it('is the hyperbolic cosecant of a complex number', () => {
         const c = ComplexMath.csch(new Complex(3 / Math.PI, 1));

         const denominator = Math.cos(2) - Math.cosh(6 / Math.PI);
         expect(c.real).toBeCloseTo(-2 * Math.cos(1) * Math.sinh(3 / Math.PI) / denominator);
         expect(c.imaginary).toBeCloseTo(2 * Math.sin(1) * Math.cosh(3 / Math.PI) / denominator);
      });
   });

   describe('sqrt', () => {
      it('is the square root of a complex number', () => {
         const c = ComplexMath.sqrt(new Complex(-3, 4));

         expect(c.real).toBeCloseTo(1);
         expect(c.imaginary).toBeCloseTo(2);
      });
   });

   describe('tan', () => {
      it('is the tangent of a complex number', () => {
         const c = ComplexMath.tan(new Complex(Math.PI / 4, 1));

         expect(c.real).toBeCloseTo(1 / Math.cosh(2));
         expect(c.imaginary).toBeCloseTo(Math.tanh(2));
      });
   });

   describe('tanh', () => {
      it('is the hyperbolic tangent of a complex number', () => {
         const c = ComplexMath.tanh(new Complex(1, Math.PI / 4));
         expect(c.real).toBeCloseTo(Math.tanh(2));
         expect(c.imaginary).toBeCloseTo(1 / Math.cosh(2));
      });
   });

   describe('cot', () => {
      it('is the cotangent of a complex number', () => {
         const c = ComplexMath.cot(new Complex(Math.PI / 4, 1));

         expect(c.real).toBeCloseTo(1 / Math.cosh(2));
         expect(c.imaginary).toBeCloseTo(-Math.tanh(2));
      });
   });

   describe('coth', () => {
      it('is the hyperbolic cotangent of a complex number', () => {
         const c = ComplexMath.coth(new Complex(1, Math.PI / 4));
         expect(c.real).toBeCloseTo(Math.tanh(2));
         expect(c.imaginary).toBeCloseTo(-1 / Math.cosh(2));
      });
   });

   describe('acos', () => {
      it('is the inverse cosine of a complex number', () => {
         const c = ComplexMath.acos(new Complex(1, 2));
         expect(c.real).toBeCloseTo(1.14371774040242049375067);
         expect(c.imaginary).toBeCloseTo(-1.52857091948099816127245);
      });
   });

   describe('acosh', () => {
      it('is the inverse hyperbolic cosine of a complex number', () => {
         const c = ComplexMath.acosh(new Complex(1, 2));
         expect(c.real).toBeCloseTo(1.52857091948099816127245);
         expect(c.imaginary).toBeCloseTo(1.14371774040242049375067);
      });
   });

   describe('acot', () => {
      it('is the inverse cotangent of a complex number', () => {
         const c = ComplexMath.acot(new Complex(1, 2));
         expect(c.real).toBeCloseTo(0.23182380450040305810713);
         expect(c.imaginary).toBeCloseTo(-0.40235947810852509365019);
      });
   });

   describe('acoth', () => {
      it('is the inverse hyperbolic cotangent of a complex number', () => {
         const c = ComplexMath.acoth(new Complex(1, 2));
         expect(c.real).toBeCloseTo(0.17328679513998632735431);
         expect(c.imaginary).toBeCloseTo(-0.39269908169872415480783);
      });
   });

   describe('acsc', () => {
      it('is the inverse cosecant of a complex number', () => {
         const c = ComplexMath.acsc(new Complex(1, 2));
         expect(c.real).toBeCloseTo(0.18631805410781552583317);
         expect(c.imaginary).toBeCloseTo(-0.39656823011232897897892);
      });
   });

   describe('acsch', () => {
      it('is the inverse hyperbolic cosecant of a complex number', () => {
         const c = ComplexMath.acsch(new Complex(1, 2));
         expect(c.real).toBeCloseTo(0.21561241855582964496692);
         expect(c.imaginary).toBeCloseTo(-0.401586391667806068283436);
      });
   });

   describe('asec', () => {
      it('is the inverse secant of a complex number', () => {
         const c = ComplexMath.asec(new Complex(1, 2));
         expect(c.real).toBeCloseTo(1.384478272687081093409151);
         expect(c.imaginary).toBeCloseTo(0.396568230112328978916534);
      });
   });

   describe('asech', () => {
      it('is the inverse hyperbolic secant of a complex number', () => {
         const c = ComplexMath.asech(new Complex(1, 2));
         expect(c.real).toBeCloseTo(0.396568230112328978916534);
         expect(c.imaginary).toBeCloseTo(-1.384478272687081093409151);
      });
   });

   describe('asin', () => {
      it('is the inverse sine of a complex number', () => {
         const c = ComplexMath.asin(new Complex(1, 2));
         expect(c.real).toBeCloseTo(0.427078586392476125480647);
         expect(c.imaginary).toBeCloseTo(1.5285709194809981612724562);
      });
   });

   describe('asinh', () => {
      it('is the inverse hyperbolic sine of a complex number', () => {
         const c = ComplexMath.asinh(new Complex(1, 2));
         expect(c.real).toBeCloseTo(1.469351744368185273255844);
         expect(c.imaginary).toBeCloseTo(1.0634400235777520561894920);
      });
   });

   describe('atan', () => {
      it('is the inverse tangent of a complex number', () => {
         const c = ComplexMath.atan(new Complex(1, 2));
         expect(c.real).toBeCloseTo(1.3389725222944935611241936);
         expect(c.imaginary).toBeCloseTo(0.4023594781085250936501898);
      });
   });

   describe('atanh', () => {
      it('is the inverse hyperbolic tangent of a complex number', () => {
         const c = ComplexMath.atanh(new Complex(1, 2));
         expect(c.real).toBeCloseTo(0.1732867951399863273543080);
         expect(c.imaginary).toBeCloseTo(1.1780972450961724644234912);
      });
   });
});
