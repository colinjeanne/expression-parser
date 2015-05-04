/**
 * @overview Describes an expression parser and evaluator over the complex
 * numbers
 * @author Colin Jeanne <colinjeanne@hotmail.com> (http://www.colinjeanne.net)
 */

import Complex from './complex.js';
import * as ComplexMath from './complex-math.js';

/**
 * Enumeration for known characters
 * @readonly
 * @enum string
 */
const KnownCharacters = {
   openParenthesis:     '(',
   closeParenthesis:    ')',
   openFloor:           '\u230A',
   closeFloor:          '\u230B',
   openCeiling:         '\u2308',
   closeCeiling:        '\u2309',
   openBracket:         '[',
   closeBracket:        ']',
   blackLetterCapitalI: '\u2111',
   blackLetterCapitalR: '\u211C',
   comma:               ',',
   invisibleSeparator:  '\u2063',
   plus:                '+',
   invisiblePlus:       '\u2064',
   minus:               '-',
   minusSign:           '\u2212',
   times:               '*',
   dotOperator:         '\u22C5',
   multiplicationSign:  '\u00D7',
   invisibleTimes:      '\u2062',
   divide:              '/',
   divisionSign:        '\u00F7',
   fractionSlash:       '\u2044',
   divisionSlash:       '\u2215'
};

/**
 * Determines whether two types of parentheses match
 * @param  {string} openTerminal  The terminal of the opening parenthesis
 * @param  {string} closeTerminal The terminal of the closing parenthesis
 * @return {boolean}              Whether the closing terminal is a valid match
 * for the opening terminal
 */
const doParenthesesMatch = (openTerminal, closeTerminal) =>
   ((openTerminal === KnownCharacters.openParenthesis) &&
      (closeTerminal === KnownCharacters.closeParenthesis)) ||
   ((openTerminal === KnownCharacters.openFloor) &&
      (closeTerminal === KnownCharacters.closeFloor)) ||
   ((openTerminal === KnownCharacters.openCeiling) &&
      (closeTerminal === KnownCharacters.closeCeiling)) ||
   ((openTerminal === KnownCharacters.openBracket) &&
      (closeTerminal === KnownCharacters.closeBracket));

/**
 * Enumeration for token types
 * @readonly
 * @enum {Number}
 */
const TokenType = {
   space:             1,
   symbol:            2,
   number:            3,
   openParenthesis:   4,
   closeParenthesis:  5,
   comma:             6,
   plus:              7,
   minus:             8,
   times:             9,
   invisibleTimes:   10,
   divide:           11,
   unaryFunction:    12,
   binaryFunction:   13
};

/**
 * Determines if a given token is an operator
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token is an operator
 */
const isTokenOperator = tokenType =>
   (tokenType === TokenType.plus) ||
   (tokenType === TokenType.minus) ||
   (tokenType === TokenType.times) ||
   (tokenType === TokenType.invisibleTimes) ||
   (tokenType === TokenType.divide);

/**
 * Determines if a given token is a function
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token is a function
 */
const isTokenFunction = tokenType =>
   (tokenType === TokenType.unaryFunction) ||
   (tokenType === TokenType.binaryFunction);

/**
 * Determines if a given token is a value
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token is a value
 */
const isTokenValue = tokenType =>
   (tokenType === TokenType.symbol) ||
   (tokenType === TokenType.number);

/**
 * Determines if a given token ends the current scope
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token ends the current scope
 */
const isTokenScopeEnding = tokenType =>
   (tokenType === TokenType.closeParenthesis) ||
   (tokenType === TokenType.comma);

/**
 * Determines if a given token forces a subexpression to be an unary function
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token forces the subexpression to
 * be an unary function
 */
const isTokenUnaryForcing = tokenType =>
   (tokenType === TokenType.openParenthesis) ||
   (tokenType === TokenType.comma) ||

   // Plus and minus are unary operators at the start of a subexpression or
   // after an infix operator
   (tokenType === TokenType.plus) ||
   (tokenType === TokenType.minus) ||
   (tokenType === TokenType.times) ||
   (tokenType === TokenType.divide);

/**
 * Determines whether this token implies that a multiplication has taken place
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token implies that a multiplication
 * has taken place
 */
const tokenImpliesMultiplication = tokenType =>
   (tokenType === TokenType.openParenthesis) ||
   (tokenType === TokenType.number) ||
   (tokenType === TokenType.symbol) ||
   (tokenType === TokenType.unaryFunction) ||
   (tokenType === TokenType.binaryFunction);

/**
 * A token in an expression
 */
class Token {
   /**
    * Constructs a token given a token type and terminal
    * @param  {TokenType}  tokenType The type of the token
    * @param  {string}     terminal  The terminal string of the token
    * @return {Token}
    */
   constructor(tokenType, terminal) {
      this.tokenType = tokenType;
      this.terminal = terminal;
   }
}

/**
 * Determines if the left token is of lower or equal precedence to the right
 * token for the purpose of the Shunting-Yard Algorithm
 * @param  {TokenType} leftToken  The type of the left token
 * @param  {TokenType} rightToken The type of the right token
 * @return {boolean}              Whether the left token is of lower or equal
 * precedence to the right token
 */
const isLeftTokenLowerOrEqualPrecedence = (leftToken, rightToken) =>
   // Invisible Times has the highest precedence of the operators since it is
   // elided in order to imply a strong coupling between terms
   (rightToken === TokenType.invisibleTimes) ||

   // Non-operators all have the same precedence
   (!isTokenOperator(leftToken) && !isTokenOperator(rightToken)) ||

   // Operators, except for invisible times, have lower precedence than
   // non-operators
   (isTokenOperator(leftToken) && (leftToken !== TokenType.invisibleTimes) &&
      !isTokenOperator(rightToken)) ||

   // Times and divide have the second highest precedence amongst operators
   ((rightToken === TokenType.times) || (rightToken === TokenType.divide)) ||

   // The right token must be plus or minus so verify that the left token is
   // also plus or minus
   ((leftToken === TokenType.plus) || (leftToken === TokenType.minus));

/**
 * Converts an infix operator into a binary function
 * @param  {Token} token The operator token
 * @return {Token}       A binary function token
 */
const operatorToBinaryFunction = token => {
   if (!isTokenOperator(token.tokenType)) {
      throw new Error('Assertion failed: expected operator token');
   }

   return new Token(TokenType.binaryFunction, token.terminal);
};


/**
 * An exception thrown when a syntactically-malformed expression is encountered
 */
class ExpressionSyntaxError extends Error {
}

/**
 * Coverts an expression from infix notation to reverse polish notation using
 * the Shunting-Yard Algorithm
 * @param  {Token[]} tokens An array of tokens in infix-notation
 * @return {Token[]}        An array of tokens in reverse polish notation
 */
const convertToReversePolishNotation = tokens => {
   // The current stack of operators. This uses shift/unshift so that the first
   // element is the top of the stack.
   let ops = [];

   // The tokens in reverse polish notation
   let rpn = [];

   tokens.forEach((token, index) => {
      if (isTokenValue(token.tokenType)) {
         rpn.push(token);
      } else if (token.tokenType === TokenType.openParenthesis) {
         ops.unshift(token);
      } else if (isTokenScopeEnding(token.tokenType)) {
         while ((ops.length !== 0) &&
            (ops[0].tokenType !== TokenType.openParenthesis)) {
            if (isTokenOperator(ops[0].tokenType)) {
               rpn.push(operatorToBinaryFunction(ops[0]));
            } else {
               rpn.push(ops[0]);
            }

            ops.shift();
         }

         if ((ops.length === 0) ||
            (ops[0].tokenType !== TokenType.openParenthesis)) {
            if (token.tokenType === TokenType.comma) {
               throw new ExpressionSyntaxError('Misplaced comma');
            } else if (token.terminal === KnownCharacters.closeParenthesis) {
               throw new ExpressionSyntaxError('Too many close parentheses');
            } else {
               throw new ExpressionSyntaxError('Mismatched circumfix operator');
            }
         }

         if ((ops.length !== 0) &&
            (token.tokenType === TokenType.closeParenthesis)) {
            if (!doParenthesesMatch(ops[0].terminal, token.terminal)) {
               throw new ExpressionSyntaxError('Mismatched circumfix operator');
            }

            // Pop open parenthesis
            ops.shift();

            if ((ops.length !== 0) && isTokenFunction(ops[0].tokenType)) {
               rpn.push(ops[0]);
               ops.shift();
            }
         }
      } else if (isTokenOperator(token.tokenType)) {
         // Check for a right hand operand. This is required because a syntax
         // error elsewhere in the expression may create an opporunity for an
         // operand to appear - for example "real(2, 3) +"
         const nextIndex = index + 1;
         if (nextIndex >= tokens.length) {
            throw new ExpressionSyntaxError('Missing right hand operand');
         }

         while ((ops.length !== 0) &&
            isLeftTokenLowerOrEqualPrecedence(
               token.tokenType,
               ops[0].tokenType)) {
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
         const nextIndex = index + 1;
         if ((nextIndex >= tokens.length) ||
            (tokens[nextIndex].tokenType !== TokenType.openParenthesis)) {
            throw new ExpressionSyntaxError(
               'Binary functions must use parentheses');
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
const KnownConstants = {
   e: ComplexMath.E,
   i: ComplexMath.I,
   pi: ComplexMath.PI
};

/**
 * Whether a terminal is a known constant
 * @param  {string} terminal The terminal
 * @return {boolean}         Whether the terminal is a known constant
 */
const isKnownConstant = terminal => KnownConstants.hasOwnProperty(terminal);

/**
 * Converts a terminal into either the value of a known constant or a complex
 * number
 * @param  {string} terminal The terminal
 * @return {Complex}         The complex value of the terminal
 */
const numberFromTerminal = terminal => {
   if (isKnownConstant(terminal)) {
      return KnownConstants[terminal];
   }

   return new Complex(Number.parseFloat(terminal));
}

/**
 * The known unary functions
 * @readonly
 * @enum {callback}
 */
const KnownUnaryFunctions = {
   abs:                                   ComplexMath.abs,
   arccos:                                ComplexMath.acos,
   arccosh:                               ComplexMath.acosh,
   arccot:                                ComplexMath.acot,
   arccoth:                               ComplexMath.acoth,
   arccsc:                                ComplexMath.acsc,
   arccsch:                               ComplexMath.acsch,
   arcsec:                                ComplexMath.asec,
   arcsech:                               ComplexMath.asech,
   arcsin:                                ComplexMath.asin,
   arcsinh:                               ComplexMath.asinh,
   arctan:                                ComplexMath.atan,
   arctanh:                               ComplexMath.atanh,
   arg:                                   ComplexMath.arg,
   ceil:                                  ComplexMath.ceil,
   conj:                                  ComplexMath.conj,
   cos:                                   ComplexMath.cos,
   cosh:                                  ComplexMath.cosh,
   cot:                                   ComplexMath.cot,
   coth:                                  ComplexMath.coth,
   csc:                                   ComplexMath.csc,
   csch:                                  ComplexMath.csch,
   exp:                                   ComplexMath.exp,
   floor:                                 ComplexMath.floor,
   frac:                                  ComplexMath.frac,
   imag:                                  ComplexMath.imag,
   [KnownConstants.blackLetterCapitalI]:  ComplexMath.imag,
   log10:                                 ComplexMath.log10,
   lg:                                    ComplexMath.log2,
   ln:                                    ComplexMath.ln,
   '-':                                   ComplexMath.negate,
   nint:                                  ComplexMath.nint,
   norm:                                  ComplexMath.norm,
   real:                                  ComplexMath.real,
   [KnownConstants.blackLetterCapitalR]:  ComplexMath.real,
   sec:                                   ComplexMath.sec,
   sech:                                  ComplexMath.sech,
   sin:                                   ComplexMath.sin,
   sinh:                                  ComplexMath.sinh,
   sqrt:                                  ComplexMath.sqrt,
   tan:                                   ComplexMath.tan,
   tanh:                                  ComplexMath.tanh
};

/**
 * Whether a terminal is a known unary function
 * @param  {string} terminal The terminal
 * @return {boolean}         Whether the terminal is a known unary function
 */
const isKnownUnaryFunction = terminal =>
   KnownUnaryFunctions.hasOwnProperty(terminal);

/**
 * Converts a terminal into an unary function
 * @param  {string}   terminal The terminal
 * @return {callback}          The function implementing the unary function
 */
const unaryFunctionFromTerminal = terminal => {
   if (isKnownUnaryFunction(terminal)) {
      return KnownUnaryFunctions[terminal];
   }

   throw new Error(
      'Assertion failed: attempting to create unknown unary function');
}

/**
 * The known binary functions
 * @readonly
 * @enum {callback}
 */
const KnownBinaryFunctions = {
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
const isKnownBinaryFunction = terminal =>
   KnownBinaryFunctions.hasOwnProperty(terminal);

/**
 * Converts a terminal into an binary function
 * @param  {string}   terminal The terminal
 * @return {callback}          The function implementing the binary function
 */
const binaryFunctionFromTerminal = terminal => {
   if (isKnownBinaryFunction(terminal)) {
      return KnownBinaryFunctions[terminal];
   }

   throw new Error(
      'Assertion failed: attempting to create unknown binary function');
}

/**
 * Processes a set of tokens to add implied elements such as invisible times or
 * to differentiate between elements which are ambiguous at tokenization time
 * such as unary vs. binary plus and minus.
 * @param  {Token[]} tokens An array of tokens
 * @return {Token[]}        An array of tokens in which implied and ambiguous
 * elements are resolved
 */
const processHiddenElements = tokens => {
   let processedTokens = [];
   tokens.forEach((token, index) => {
      let nextIndex = index + 1;
      let isLastToken = nextIndex === tokens.length;

      switch (token.tokenType) {
         case TokenType.space:
            // Spaces are no longer needed for correct processing
            break;

         case TokenType.closeParenthesis:
         case TokenType.number:
         case TokenType.symbol:
            processedTokens.push(token);

            if (!isLastToken &&
               tokenImpliesMultiplication(tokens[nextIndex].tokenType)) {
               processedTokens.push(new Token(TokenType.invisibleTimes, '*'));
            }
            break;

         case TokenType.comma:
            if ((processedTokens.length === 0) ||
                (processedTokens[processedTokens.length - 1].tokenType === TokenType.openParenthesis) ||
                (!isLastToken && tokens[nextIndex].tokenType === TokenType.closeParenthesis)) {
               throw new ExpressionSyntaxError("Misplaced comma");
            }

            processedTokens.push(token);
            break;

         case TokenType.plus:
         case TokenType.minus:
            if ((processedTokens.length === 0) ||
                isTokenUnaryForcing(processedTokens[processedTokens.length - 1].tokenType)) {
               if (token.tokenType === TokenType.minus) {
                  // Unary plus is the identity function, so ignore it
                  // altogether
                  processedTokens.push(
                     new Token(TokenType.unaryFunction, token.terminal));
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
const isAlphabeticCharacter = c => /[A-Za-z]/.test(c);

/**
 * Determines whether a character is a digit
 * @param  {string} c The character
 * @return {boolean}  Whether the character is a digit
 */
const isDigitCharacter = c => /\d/.test(c);

/**
 * Determines whether a character is a numeric
 * @param  {string} c The character
 * @return {boolean}  Whether the character is a numeric
 */
const isNumericCharacter = c => /\d|\./.test(c);

/**
 * Determines whether a character is a space
 * @param  {string} c The character
 * @return {boolean}  Whether the character is a space
 */
const isSpaceCharacter = c => /\s/.test(c);

/**
 * Determines whether a character is a high surrogate
 * @param  {string} c The character
 * @return {boolean}  Whether the character is a high surrogate
 */
const isHighSurrogateCharacter = c =>
   (c.charCodeAt(0) >= 0xD800) && (c.charCodeAt(0) <= 0xDBFF);

/**
 * Determines whether a character is a loe surrogate
 * @param  {string} c The character
 * @return {boolean}  Whether the character is a low surrogate
 */
const isLowSurrogateCharacter = c =>
   (c.charCodeAt(0) >= 0xDC00) && (c.charCodeAt(0) <= 0xDFFF);

/**
 * Finds the ending index of a symbol
 * @param  {number}   startIndex The starting index of the symbol
 * @param  {string}   expression The expression
 * points
 * @return {number}              The ending index of the symbol
 */
const findSymbolEndIndex = (startIndex, expression) => {
   const startCharacter = expression[startIndex];

   let endIndex;
   if (isLowSurrogateCharacter(startCharacter)) {
      throw new ExpressionSyntaxError(
         'Encountered low surrogate without a corresponding high surrogate');
   } else if (isHighSurrogateCharacter(startCharacter)) {
      endIndex = startIndex + 2;
      if ((endIndex > expression.length) ||
         !isLowSurrogateCharacter(expression[startIndex + 1])) {
         throw new ExpressionSyntaxError(
            'Encountered high surrogate without a corresponding low surrogate');
      }
   } else if (isAlphabeticCharacter(startCharacter)) {
      let substring = expression.substring(startIndex);

      let relativeEndIndex = substring.search(/[^A-Za-z]|$/);
      if ((relativeEndIndex !== -1) &&
         isDigitCharacter(expression[relativeEndIndex])) {
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
const tokenize = expression => {
   // This method explicitly does not support using | to mean absolute since
   // allowing this notation as well as invisible times leads to ambiguous
   // expressions such as |x|x|x|
   let tokens = [];
   let startIndex = 0;
   while (startIndex !== expression.length) {
      let character = expression[startIndex];

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
      } else if ((character === KnownCharacters.closeParenthesis) ||
         (character === KnownCharacters.closeFloor) ||
         (character === KnownCharacters.closeCeiling) ||
         (character === KnownCharacters.closeBracket)) {
         tokens.push(new Token(TokenType.closeParenthesis, character));
         ++startIndex;
      } else if ((character === KnownCharacters.comma) ||
         (character === KnownCharacters.invisibleSeparator)) {
         tokens.push(new Token(TokenType.comma, ','));
         ++startIndex;
      } else if (isNumericCharacter(character)) {
         // Tokenize number
         const substring = expression.substring(startIndex);
         const terminal = substring.match(/^\d+(?:\.\d+)?/);
         tokens.push(new Token(TokenType.number, terminal[0]));
         
         startIndex += terminal[0].length;
      } else if ((character === KnownCharacters.plus) ||
         (character === KnownCharacters.invisiblePlus)) {
         tokens.push(new Token(TokenType.plus, '+'));
         ++startIndex;
      } else if ((character === KnownCharacters.minus) ||
         (character === KnownCharacters.minusSign)) {
         tokens.push(new Token(TokenType.minus, '-'));
         ++startIndex;
      } else if ((character === KnownCharacters.times) ||
         (character === KnownCharacters.dotOperator) ||
         (character === KnownCharacters.multiplicationSign)) {
         tokens.push(new Token(TokenType.times, '*'));
         ++startIndex;
      } else if (character === KnownCharacters.invisibleTimes) {
         tokens.push(new Token(TokenType.invisibleTimes, '*'));
         ++startIndex;
      } else if ((character === KnownCharacters.divide) ||
         (character === KnownCharacters.divisionSign) ||
         (character === KnownCharacters.fractionSlash) ||
         (character === KnownCharacters.divisionSlash)) {
         tokens.push(new Token(TokenType.divide, '/'));
         ++startIndex;
      } else {
         const endIndex = findSymbolEndIndex(startIndex, expression);
         const terminal = expression.substring(startIndex, endIndex);

         let tokenType;
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
class NumberPhrase {
   /**
    * Constructs a NumberPhrase from a number
    * @param  {number|Complex} value The value of the number phrase
    * @return {NumberPhrase}
    */
   constructor(value) {
      this.value = value;
   }

   /**
    * Determines if the phrase has any unset variables
    * @return {boolean} Whether the phrase has any unset variables
    */
   hasUnsetVariables() {
      return false;
   }

   /**
    * Determines if the phrase has a specific variable
    * @return {boolean} Whether the phrase has a specific variable
    */
   hasVariable() {
      return false;
   }

   /**
    * Sets the value of a variable in the phrase
    */
   setVariable() {
   }

   /**
    * Evaluates the phrase
    * @return {number|Complex} The value of the phrase
    */
   evaluate() {
      return this.value;
   }
}

/**
 * An error raised when the expression is syntactically valid but cannot be
 * evaluated
 */
class ExpressionEvaluationError extends Error {
}

/**
 * A phrase representing a variable
 */
class VariablePhrase {
   /**
    * Constructs a VariablePhrase from a symbol
    * @param  {string}         symbol The symbol of the variable
    * @param  {number|Complex} value  The value of the symbol
    * @return {VariablePhrase}
    */
   constructor(symbol, value) {
      this.symbol = symbol;
      this.value = value;
   }

   /**
    * Determines if the phrase has any unset variables
    * @return {boolean} Whether the phrase has any unset variables
    */
   hasUnsetVariables() {
      return this.value === undefined;
   }

   /**
    * Determines if the phrase has a specific variable
    * @param  {string}  symbol The symbol of the variable
    * @return {boolean}        Whether the phrase has a specific variable
    */
   hasVariable(symbol) {
      return this.symbol === symbol;
   }

   /**
    * Sets the value of a variable in the phrase
    * @param  {string}         symbol The symbol of the variable
    * @param  {number|Complex} value  The value of the symbol
    */
   setVariable(symbol, value) {
      if (this.hasVariable(symbol)) {
         this.value = value;
      }
   }

   /**
    * Evaluates the phrase
    * @return {number|Complex} The value of the phrase
    */
   evaluate() {
      if (this.hasUnsetVariables()) {
         throw new ExpressionEvaluationError(
            `Variable ${this.symbol} does not have a defined value`);
      }

      return this.value;
   }
}

/**
 * A phrase representing a function
 */
class FunctionPhrase {
   /**
    * Constructs a FunctionPhrase from a function
    * @param  {callback}                                     evalFunction The
    * function used to evaluate this phrase
    * @param  {NumberPhrase|VariablePhrase|FunctionPhrase[]} children The child
    * phrases of this phrase
    * @return {FunctionPhrase}
    */
   constructor(evalFunction, children) {
      if (children.length !== evalFunction.length) {
         throw new ExpressionSyntaxError('Improper number of arguments');
      }

      this.evalFunction = evalFunction;
      this.children = children;
   }

   /**
    * Determines if the phrase has any unset variables
    * @return {boolean} Whether the phrase has any unset variables
    */
   hasUnsetVariables() {
      return this.children.some(phrase => pharse.hasUnsetVariables());
   }

   /**
    * Determines if the phrase has a specific variable
    * @param  {string}  symbol The symbol of the variable
    * @return {boolean}        Whether the phrase has a specific variable
    */
   hasVariable(symbol) {
      return this.children.some(phrase => phrase.hasVariable(symbol));
   }

   /**
    * Sets the value of a variable in the phrase
    * @param  {string}         symbol The symbol of the variable
    * @param  {number|Complex} value  The value of the symbol
    */
   setVariable(symbol, value) {
      this.children.forEach(phrase => phrase.setVariable(symbol, value));
   }

   /**
    * Evaluates the phrase
    * @return {number|Complex} The value of the phrase
    */
   evaluate() {
      return this.evalFunction.apply(
         null,
         this.children.map(phrase => phrase.evaluate()));
   }
}

/**
 * Builds a parse tree from a tokenized expression
 * @param  {Token[]} tokens A tokenized expression
 * @return {NumberPhrase|VariablePhrase|FunctionPhrase} The root of the parse
 * tree
 */
const buildParseTree = tokens => {
   let stack = [];

   tokens.forEach(token => {
      switch (token.tokenType) {
         case TokenType.number:
            stack.push(new NumberPhrase(numberFromTerminal(token.terminal)));
            break;

         case TokenType.symbol:
            stack.push(new VariablePhrase(token.terminal));
            break;

         case TokenType.unaryFunction:
            if (stack.length === 0) {
               throw new ExpressionSyntaxError(
                  `Too few arguments for function ${token.terminal}`);
            }

            stack.push(
               new FunctionPhrase(
                  unaryFunctionFromTerminal(token.terminal), [stack.pop()]));
            break;

         case TokenType.binaryFunction:
            if (stack.length < 2) {
               throw new ExpressionSyntaxError(
                  `Too few arguments for function ${token.terminal}`);
            }

            const children = [stack.pop(), stack.pop()].reverse();
            stack.push(
               new FunctionPhrase(
                  binaryFunctionFromTerminal(token.terminal),
                  children));
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
export default class {
   /**
    * Constructs an expression from a string
    * @param  {string} expression The expression string
    * @return {Expression}
    */
   constructor(expression) {
      this.phrase = buildParseTree(
         convertToReversePolishNotation(
            processHiddenElements(
               tokenize(
                  expression))));
   }

   /**
    * Determines if the expression has any unset variables
    * @return {boolean} Whether the expression has any unset variables
    */
   hasUnsetVariables() {
      return this.phrase.hasUnsetVariables();
   }

   /**
    * Determines if the expression has a specific variable
    * @param  {string}  symbol The symbol of the variable
    * @return {boolean}        Whether the expression has a specific variable
    */
   hasVariable(symbol) {
      return this.phrase.hasVariable(symbol);
   }

   /**
    * Sets the value of a variable in the expression
    * @param  {string}         symbol The symbol of the variable
    * @param  {number|Complex} value  The value of the symbol
    */
   setVariable(symbol, value) {
      this.phrase.setVariable(symbol, value);
   }

   /**
    * Evaluates the expression
    * @return {number|Complex} The value of the expression
    */
   evaluate() {
      return this.phrase.evaluate();
   }
}
