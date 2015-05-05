import Complex from './../src/complex.js';
import Expression from './../src/expression.js';

describe('Expression', () => {
   it('should require an argument', () => {
      expect(() => new Expression()).toThrow();
   });

   it('should fail on empty expressions', () => {
      expect(() => new Expression('')).toThrowError('Empty expression');
   });

   it('should end processing at embedded nulls', () => {
      const expression = new Expression('2 \u0000 + 3');
      expect(expression.evaluate()).toEqual(new Complex(2));
   });

   it('should parse numbers', () => {
      const simple = new Expression('3');
      expect(simple.evaluate()).toEqual(new Complex(3));

      const decimal = new Expression('13.03');
      expect(decimal.evaluate()).toEqual(new Complex(13.03));
   });

   it('should parse symbols', () => {
      const simple = new Expression('h');
      simple.setVariable('h', new Complex(2));
      expect(simple.evaluate()).toEqual(new Complex(2));

      const longer = new Expression('hello');
      longer.setVariable('hello', new Complex(3));
      expect(longer.evaluate()).toEqual(new Complex(3));

      const astral = new Expression('\uD83D\uDE80');
      astral.setVariable('\uD83D\uDE80', new Complex(0, 1));
      expect(astral.evaluate()).toEqual(new Complex(0, 1));
   });

   it('should parse symbols with trailing numbers', () => {
      const expression = new Expression('log10(1)');
      expect(expression.evaluate()).toEqual(new Complex(0));
   });

   it('should parse known constants', () => {
      const expression = new Expression('i');
      expect(expression.evaluate()).toEqual(new Complex(0, 1));
   });

   it('should handle unary functions', () => {
      const expression = new Expression('-3');
      expect(expression.evaluate()).toEqual(new Complex(-3, -0));
   });

   it('should handle binary functions', () => {
      const expression = new Expression('pow(2, 3)');
      expect(expression.evaluate()).toEqual(new Complex(8));
   });

   it('should handle the identity function', () => {
      const expression = new Expression('+3');
      expect(expression.evaluate()).toEqual(new Complex(3));
   });

   it('should ignore leading and trailing whitespace', () => {
      const expression = new Expression('   3   ');
      expect(expression.evaluate()).toEqual(new Complex(3));
   });

   it('should parse infix operators', () => {
      const minus = new Expression('2-3');
      expect(minus.evaluate()).toEqual(new Complex(-1));

      const plus = new Expression('2+3');
      expect(plus.evaluate()).toEqual(new Complex(5));

      const times = new Expression('2*3');
      expect(times.evaluate()).toEqual(new Complex(6));

      const divide = new Expression('2/3');
      expect(divide.evaluate()).toEqual(new Complex(2/3));
   });

   it('should handle circumfix operators', () => {
      const expression = new Expression('[3.3]');
      expect(expression.evaluate()).toEqual(new Complex(3));
   });

   it('should collapse interior whitespace', () => {
      const expression = new Expression('2 -  3');
      expect(expression.evaluate()).toEqual(new Complex(-1));
   });

   it('should fail on extra expressions', () => {
      expect(() => new Expression('2 3')).toThrowError('Unexpected expression');
   });

   describe('Complex expressions', () => {
      it('should evaluate subexpressions', () => {
         expect((new Expression('5 + -3')).evaluate()).toEqual(new Complex(2));
         expect((new Expression('5 - +3')).evaluate()).toEqual(new Complex(2));
         expect((new Expression('-3 + 4')).evaluate()).toEqual(new Complex(1));
      });

      it('should obey operator precedence', () => {
         expect((new Expression('5 * 3 + 2')).evaluate()).toEqual(new Complex(17));
         expect((new Expression('5 + 3 * 2')).evaluate()).toEqual(new Complex(11));
      });
   });

   describe('Infix operators', () => {
      it('should require both arguments', () => {
         expect(() => new Expression('2*'))
            .toThrowError('Missing right hand operand');

         expect(() => new Expression('*2'))
            .toThrowError('Too few arguments for function *');
      });
   });

   describe('Unary functions', () => {
      it('should be callable without parentheses', () => {
         const expression = new Expression('real 3');
         expect(expression.evaluate()).toEqual(new Complex(3));
      });

      it('should not use non-parentheses scopes as a scope delimiter', () => {
         const expression = new Expression('real[2.7 + 3.2i]');
         expect(expression.evaluate()).toEqual(new Complex(3));
      });

      it('should not take arguments across operators', () => {
         const expression = new Expression('real 3 + 5i');
         expect(expression.evaluate()).toEqual(new Complex(3, 5));
      });

      it('should take arguments across invisible times', () => {
         const expression = new Expression('real 3i');
         expect(expression.evaluate()).toEqual(new Complex(0));
      });

      it('should be callable with parentheses', () => {
         const expression = new Expression('real(3 + 5i)');
         expect(expression.evaluate()).toEqual(new Complex(3));
      });

      it('should ignore whitespace between it and the parentheses', () => {
         const expression = new Expression('real  (3 + 5i)');
         expect(expression.evaluate()).toEqual(new Complex(3));
      });

      it('should ensure there are enough arguments', () => {
         expect(() => new Expression('real'))
            .toThrowError('Too few arguments for function real');
      });

      it("should ensure there aren't too many arguments", () => {
         expect(() => new Expression('real(2, 3)'))
            .toThrowError('Unexpected expression');
      });

      it('should ensure arguments apply to only the unary function', () => {
         expect(() => new Expression('real(2, 3) +'))
            .toThrowError('Missing right hand operand');
      });
   });

   describe('Binary functions', () => {
      it('should require parentheses', () => {
         expect(() => new Expression('pow 2 3'))
            .toThrowError('Binary functions must use parentheses');
      });

      it('should not use non-parentheses scopes as a scope delimiter', () => {
         expect(() => new Expression('pow[2, 3]'))
            .toThrowError('Binary functions must use parentheses');
      });

      it('should ensure there are enough arguments', () => {
         expect(() => new Expression('pow(2)'))
            .toThrowError('Too few arguments for function pow');
      });

      it("should ensure there aren't too many arguments", () => {
         expect(() => new Expression('pow(2, 3, 3)'))
            .toThrowError('Unexpected expression');
      });

      it('should ensure arguments apply to only the binary function', () => {
         expect(() => new Expression('pow(2, 3, 3) +'))
            .toThrowError('Missing right hand operand');
      });
   });

   it('should not allow commas outside of arguments', () => {
      expect(() => new Expression(','))
         .toThrowError('Misplaced comma');

      expect(() => new Expression('2,'))
         .toThrowError('Misplaced comma');

      expect(() => new Expression('2, 3'))
         .toThrowError('Misplaced comma');
   });

   describe('Invisible times', () => {
      it('should apply between numbers and functions', () => {
         const expression = new Expression('3floor(3.5)');
         expect(expression.evaluate()).toEqual(new Complex(9));
      });

      it('should apply between numbers and symbols', () => {
         const expression = new Expression('2i');
         expect(expression.evaluate()).toEqual(new Complex(0, 2));
      });

      it('should apply between numbers and parentheses', () => {
         const expression = new Expression('floor(3(3.5))');
         expect(expression.evaluate()).toEqual(new Complex(10));
      });

      it('should apply between two functions', () => {
         const expression = new Expression('floor(3.5)floor(4.5)');
         expect(expression.evaluate()).toEqual(new Complex(12));
      });
   });

   describe('Circumfix operators', () => {
      it('should group expressions', () => {
         const expression = new Expression('2 - (4 + 3)');
         expect(expression.evaluate()).toEqual(new Complex(-5));
      });

      it('should have higher precedence than operators', () => {
         const simple = new Expression('(5 + 3) * 2');
         expect(simple.evaluate()).toEqual(new Complex(16));

         const complex = new Expression('(5 + 3) * 2 + (3 - (4 - 5))');
         expect(complex.evaluate()).toEqual(new Complex(20));
      });

      it('should require open and close parentheses', () => {
         expect(() => new Expression('(3'))
            .toThrowError('Too many open parentheses');

         expect(() => new Expression('[3'))
            .toThrowError('Mismatched circumfix operator');

         expect(() => new Expression('((3)'))
            .toThrowError('Too many open parentheses');

         expect(() => new Expression('3)'))
            .toThrowError('Too many close parentheses');

         expect(() => new Expression('3]'))
            .toThrowError('Mismatched circumfix operator');

         expect(() => new Expression('(3))'))
            .toThrowError('Too many close parentheses');
      });

      it('should never be empty', () => {
         expect(() => new Expression('()'))
            .toThrowError('Empty expression');
      });

      it('should match start and end types', () => {
         expect(() => new Expression(']2.2]'))
            .toThrowError('Mismatched circumfix operator');

         expect(() => new Expression('[2.2)'))
            .toThrowError('Mismatched circumfix operator');

         expect(() => new Expression('\u230B 2.2]'))
            .toThrowError('Mismatched circumfix operator');
      });
   });

   describe('hasUnsetVariables', () => {
      it('should detect unset variables', () => {
         const expression = new Expression('hello');
         expect(expression.hasUnsetVariables()).toBe(true);

         expression.setVariable('world', new Complex(1));
         expect(expression.hasUnsetVariables()).toBe(true);
      });

      it('should detect set variables', () => {
         const expression = new Expression('hello');
         expression.setVariable('hello', new Complex(2));
         expect(expression.hasUnsetVariables()).toBe(false);
      });
   });

   describe('hasVariable', () => {
      it('should detect existing variables', () => {
         const expression = new Expression('2x');
         expect(expression.hasVariable('x')).toBe(true);
         expect(expression.hasVariable('y')).toBe(false);
      });

      it('should detect existing set variables', () => {
         const expression = new Expression('2x');
         expression.setVariable('x', new Complex(2));
         expect(expression.hasVariable('x')).toBe(true);
         expect(expression.hasVariable('y')).toBe(false);
      });
   });

   describe('setVariable', () => {
      it('should should set the value of existing variables', () => {
         const expression = new Expression('2 - 3x');
         expression.setVariable('x', new Complex(0, 2));

         expect(expression.evaluate()).toEqual(new Complex(2, -6));
      });
   });

   it('should require all variables to be set', () => {
      const expression = new Expression('2 - 3x');
      expect(() => expression.evaluate())
         .toThrowError('Variable x does not have a defined value');
   });
});
