import * as math from 'mathjs';
import { AngleMode } from '../types/calculator';

math.config({
  number: 'BigNumber',
  precision: 20,
  predictable: true,
});

export class CalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CalculationError';
  }
}

export const formatNumber = (value: number | string): string => {
  try {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(num)) return 'Error';
    
    if (Math.abs(num) >= 1e10 || (Math.abs(num) < 1e-10 && num !== 0)) {
      return num.toExponential(6);
    }
    
    if (Number.isInteger(num)) {
      return num.toString();
    }
    
    const decimalPlaces = Math.min(10, Math.max(0, 10 - Math.floor(Math.log10(Math.abs(num))) - 1));
    return num.toFixed(decimalPlaces).replace(/\.?0+$/, '');
  } catch {
    return 'Error';
  }
};

export const evaluateExpression = (expression: string, angleMode: AngleMode = 'degrees'): string => {
  try {
    if (!expression.trim()) return '0';
   
    math.config({ angle: angleMode });
    
    let processedExpression = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/π/g, 'pi')
      .replace(/e/g, 'e');
    
    const result = math.evaluate(processedExpression);
    
    return formatNumber(result);
  } catch (error) {
    console.error('Calculation error:', error);
    throw new CalculationError('Invalid expression');
  }
};

export const calculateScientificFunction = (
  func: string, 
  value: number, 
  angleMode: AngleMode = 'degrees'
): number => {
  try {
    math.config({ angle: angleMode });
    
    switch (func) {
      case 'sin':
        return math.sin(value);
      case 'cos':
        return math.cos(value);
      case 'tan':
        return math.tan(value);
      case 'asin':
        return math.asin(value);
      case 'acos':
        return math.acos(value);
      case 'atan':
        return math.atan(value);
      case 'sinh':
        return math.sinh(value);
      case 'cosh':
        return math.cosh(value);
      case 'tanh':
        return math.tanh(value);
      case 'log':
        return math.log10(value);
      case 'ln':
        return math.log(value);
      case 'log2':
        return math.log2(value);
      case 'sqrt':
        return math.sqrt(value);
      case 'cbrt':
        return math.cbrt(value);
      case 'factorial':
        return math.factorial(value);
      case 'abs':
        return math.abs(value);
      case 'exp':
        return math.exp(value);
      default:
        throw new Error(`Unknown function: ${func}`);
    }
  } catch (error) {
    console.error('Scientific function error:', error);
    throw new CalculationError('Invalid function');
  }
};

export const getConstants = () => ({
  pi: math.pi,
  e: math.e,
  random: () => math.random(),
});

export const validateExpression = (expression: string): boolean => {
  try {
    if (!expression.trim()) return true;
    
    let parenthesesCount = 0;
    for (const char of expression) {
      if (char === '(') parenthesesCount++;
      if (char === ')') parenthesesCount--;
      if (parenthesesCount < 0) return false;
    }
    
    if (parenthesesCount !== 0) return false;
    
    const testExpression = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/π/g, '3.14159')
      .replace(/e/g, '2.71828');
    
    math.evaluate(testExpression);
    return true;
  } catch {
    return false;
  }
};

export const formatDisplay = (expression: string): string => {
  return expression
    .replace(/\*/g, '×')
    .replace(/\//g, '÷')
    .replace(/-/g, '−')
    .replace(/pi/g, 'π');
}; 