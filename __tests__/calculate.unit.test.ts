import { validateExpression, evaluateExpression, Errors } from '../pages/api/calculate';

const FIXTURES = {
  validateMap: {
    '2++2-*': false,
    '9 ': true,
    '*': false,
    '-12 + 8': true,
    '-9 * 77 + 3 - 19/0': true,
    '98 + 8*7/6 * 61': true,
    '09-78': true,
    '--87**': false,
    'abc_)(*': false,
  },
  evaluateMap: {
    '2+2': 4,
    '2 + 68/2': 36,
    '8*7 + 3 - 9': 50,
    '2 + 0*77 - 4/3': 1,
    '-3*8 + 4': -20,
    ' 2222 ': 2222,
    '-98': -98,
  },
  divisionByZero: '2 + 8 - 11/0 + 6',
};

describe('calculate.ts unit tests', () => {
  describe('validateExpression', () => {
    it('should validate correctly', () => {
      Object.entries(FIXTURES.validateMap).forEach(([expr, result]) => {
        expect(validateExpression(expr)).toEqual(result);
      });
    });
  });

  describe('evaluateExpression', () => {
    it('should evaluate correctly', () => {
      Object.entries(FIXTURES.evaluateMap).forEach(([expr, result]) => {
        expect(evaluateExpression(expr)).toEqual(result);
      });
    });
    it('should throw on division by zero', () => {
      try {
        evaluateExpression(FIXTURES.divisionByZero);
      } catch (error) {
        expect((error as Error).message).toEqual(Errors.DIVISION_BY_ZERO);
      }
    });
  });
});
