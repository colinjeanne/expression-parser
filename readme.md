# Complex Expression Parser

Complex Expression Parser parses mathematical expression strings over the field
of complex numbers.

## Installation

If you want to use it in a browser:

* Just include es5/expression.js before your scripts.
* Include a shim such as [es6-shim](https://github.com/paulmillr/es6-shim/) if
your target browser does not support common ES6 features such as extra methods
on `Array` or `Number`.

For `node.js`, `io.js`, or `npm` just run

    npm install complex-expression-parser

If you are running in an environment that supports ES6 then you may begin using
`Expression` in your code using

    import Complex from './es6/complex.js';
    import Expression from './es6/expression.js';

ES6 environments can use the Complex and ComplexMath classes directly by
importing their respective files.

## Usage

`Expression` has four methods: `hasUnsetVariables`, `hasVariable`,
`setVariable`, and `evaluate`.

### Construction

`Expression` takes a single string as an argument to its constructor. This
string should be a valid mathematical expression. Any symbol which is not known
to the parser is interpreted as a variable. If the expression is not
syntactically valid then the constructor throws an exception.

    // Create an expression for the equation 2x^2 + 3x - i where i is the
    // imaginary constant
    const expression = new Expression('2x * x + 3x - i');

### hasUnsetVariables

`hasUnsetVariables` takes no arguments and returns true if the expression has
any unset variables.

    const expression = new Expression('x');
    console.log(expression.hasUnsetVariables()); // Outputs true

    expression.setVariable('x', new Complex(0, -5));
    console.log(expression.hasUnsetVariables()); // Outputs false

### hasVariable

`hasVariable` takes a single string, the variable's symbol, and returns true if
the expression contains a variable with that symbol.

   const expression = new Expression('x');
   console.log(expression.hasVariable('x')); // Outputs true
   console.log(expression.hasVariable('y')); // Outputs false

### setVariable

`setVariable` takes a string, the variable's symbol, and a `Complex`, the
variable's new value. It sets the value of the variable in the expression.

This method can be called again to change the value of the variable but once set
a variable cannot be unset.

    const expression = new Expression('x');
    expression.setVariable('x', new Complex(2, 5));

    let valueOfX = expression.evaluate(); // valueOfX is equal to 2 + 5i

    expression.setVariable('x', new Complex(-3));
    valueOfX = expression.evaluate(); // valueOfX is equal to -3

### evaluate

`evaluate` takes no arguments and returns the value of the expression as a
`Complex`. If the expression has any unset variables then this method throws an
exception.

    const expression = new Expression('2x + i');
    expression.setVariable('x', new Complex(3, 4));

    const value = expression.evaluate(); // value is 6 + 9i

## Naming Symbols

Symbols can be any number of alphabetic characters followed by any number of
digits or can be a single Unicode character.

Example symbols:

* `x`
* `yy`
* `M104`
* `☃`
* `\uD83D\uDE80`

Example non-symbols:

* `i` - Known constant
* `2x` - Interpreted as `2 * x`
* `M104M` - Interpreted as `M104 * M`
* `☃☃` - Interpreted as `☃ * ☃`
* `\uD83D\uDE80\uD83D\uDE80` - Interpreted as `\uD83D\uDE80 * \uD83D\uDE80`

## Supported Functions and Constants

### Constants

* `e`: Euler's constant
* `i`: The imaginary unit
* `pi`: The ratio of a circle's circumference to its diameter

### Functions

#### Arithmetic
* `+` (unary): The identity function
* `+` (binary): Addition
* `-` (unary): Negation
* `-` (binary): Subtraction
* `*`: Multiplication
* `/`: Division

#### Algebraic
* `abs(x)`: The magnitude of `x`
* `arg(x)`: The phase of `x`
* `ceil(x)`: The ceiling of `x`
* `conj(x)`: The conjugate of `x`
* `exp(x)`: The exponential of `x`
* `floor(x)`: The floor of `x`
* `frac(x)`: The fractional part of `x`
* `imag(x)`: The imaginary part of `x`
* `ℑ(x)`: The imaginary part of `x`
* `lg(x)`: The log base 2 of `x`
* `ln(x)`: The natural log of `x`
* `log(base, x)`: The log base `base` of `x`
* `log10(x)`: The log base 10 of `x`
* `mod(x, y)`: `x` mod `y`
* `nint(x)`: The nearest integer of `x`
* `norm(x)`: The norm of `x`
* `pow(base, power)`: `base` raised to the power of `power`
* `real(x)`: The real part of `x`
* `ℜ(x)`: The real part of `x`
* `sqrt(x)`: The square root of `x`

#### Trigonometric
* `arccos(x)`: The inverse cosine of `x`
* `arccosh(x)`: The inverse hyperbolic cosine of `x`
* `arccot(x)`: The inverse cotangent of `x`
* `arccoth(x)`: The inverse hyperbolic cotangent of `x`
* `arccsc(x)`: The inverse cosecant of `x`
* `arccsch(x)`: The inverse hyperbolic cosecant of `x`
* `arcsec(x)`: The inverse secant of `x`
* `arcsech(x)`: The inverse hyperbolic secant of `x`
* `arcsin(x)`: The inverse sine of `x`
* `arcsinh(x)`: The inverse hyperbolic sine of `x`
* `arctan(x)`: The inverse tangent of `x`
* `arctanh(x)`: The inverse hyperbolic tangent of `x`
* `cos(x)`: The cosine of `x`
* `cosh(x)`: The hyperbolic cosine of `x`
* `cot(x)`: The cotangent of `x`
* `coth(x)`: The hyperbolic cotangent of `x`
* `csc(x)`: The cosecant of `x`
* `csch(x)`: The hyperbolic cosecant of `x`
* `sec(x)`: The secant of `x`
* `sech(x)`: The hyperbolic secant of `x`
* `sin(x)`: The sine of `x`
* `sinh(x)`: The hyperbolic sine of `x`
* `tan(x)`: The tangent of `x`
* `tanh(x)`: The hyperbolic tangent of `x`

## Contributing

Submit a pull request and mail <colinjeanne@hotmail.com>.

Development should occur against the ES6 files. Build and test using

    npm run prepare

Please add appropriate tests and run `npm test` before submitting.

## License

Complex Expression Parser is open-sourced software licensed under the
[MIT license](http://opensource.org/licenses/MIT)
