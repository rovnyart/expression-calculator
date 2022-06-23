import type { NextApiRequest, NextApiResponse } from 'next';

import { expressionRegex } from '../../utils/helpers';

type Response = {
  result?: number;
  error?: string;
};

enum Operator {
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
}

export enum Errors {
  PAYLOAD = '👮 Payload validation error',
  PARSING = '🤷‍♀️ Error parsing expression',
  DIVISION_BY_ZERO = '🦖 Division by zero',
}

const isNotNumber = (value: string): boolean => Number.isNaN(Number(value));
const isNumber = (value: string): boolean => !isNotNumber(value);

/* Check for artifacts like "2+--3" etc. Also validate allowed symbols despite we already did
it on client side - just in case this API goes public =) */
export const validateExpression = (expression: string): boolean => {
  /* Check allowed chars */
  if (expression.replace(expressionRegex, '') !== expression) {
    return false;
  }
  const first = expression[0];
  /* Check for first char to be number (and "-" in case we want to evaluate negative number) */
  if (isNotNumber(first) && first !== '-') {
    return false;
  }

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    /* Char is number, skipping */
    if (isNumber(char)) {
      continue;
    }

    /* Checking next char, if not number - fail validation */
    if (isNotNumber(expression[i + 1])) {
      return false;
    }
  }

  return true;
};

export const evaluateExpression = (expression: string): number => {
  if (!expression) return 0;

  if (isNumber(expression)) {
    /* Return number itself if no operations passed */
    return Number(expression);
  }

  const stack: number[] = [];

  let operator = Operator.PLUS;

  for (let i = 0, num = 0; i <= expression.length; i++) {
    const current = expression[i];
    if (current === ' ') continue; // Skipping space. We could filter all spaces before loop, but this is more performant.

    /* Accumulating current number till operator met */
    if (isNumber(current)) {
      num = num * 10 + parseInt(current, 10);
      continue;
    }

    /* Performing operation when operator met */
    switch (operator) {
      case Operator.PLUS:
        stack.push(num);
        break;
      case Operator.MINUS:
        stack.push(-num);
        break;
      case Operator.MULTIPLY:
        stack.push((stack.pop() || 0) * num);
        break;
      case Operator.DIVIDE:
        if (num === 0) {
          throw new Error(Errors.DIVISION_BY_ZERO);
        }

        stack.push(parseInt(String((stack.pop() || 0) / num), 10));
        break;
      default:
        break;
    }
    operator = current as Operator;
    num = 0;
  }

  return stack.reduceRight((a, b) => a + b);
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  try {
    const { expression } = req.body;

    if (!expression) {
      throw new Error(Errors.PAYLOAD);
    }

    const isValid = validateExpression(expression);

    if (!isValid) {
      throw new Error(Errors.PARSING);
    }

    const result = evaluateExpression(expression);

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
}
