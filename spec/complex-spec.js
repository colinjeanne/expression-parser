import Complex from './../src/complex.js';

describe('Complex numbers', () => {
    it('should default to zero', () => {
        const complex = new Complex();

        expect(complex.real).toBe(0);
        expect(complex.imaginary).toBe(0);
    });

    it('should wrap real numbers', () => {
        const complex = new Complex(8);

        expect(complex.real).toBe(8);
        expect(complex.imaginary).toBe(0);
    });

    it('should take both real and imaginary parts', () => {
        const complex = new Complex(11, 97);

        expect(complex.real).toBe(11);
        expect(complex.imaginary).toBe(97);
    });
});
