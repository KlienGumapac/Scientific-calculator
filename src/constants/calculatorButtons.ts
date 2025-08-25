import { CalculatorButton, ScientificButton } from '../types/calculator';

export const NUMBER_BUTTONS: CalculatorButton[] = [
  { label: '7', value: '7', type: 'number' },
  { label: '8', value: '8', type: 'number' },
  { label: '9', value: '9', type: 'number' },
  { label: '4', value: '4', type: 'number' },
  { label: '5', value: '5', type: 'number' },
  { label: '6', value: '6', type: 'number' },
  { label: '1', value: '1', type: 'number' },
  { label: '2', value: '2', type: 'number' },
  { label: '3', value: '3', type: 'number' },
  { label: '0', value: '0', type: 'number' },
  { label: '.', value: '.', type: 'number' },
  { label: '±', value: '±', type: 'function' },
];

export const OPERATOR_BUTTONS: CalculatorButton[] = [
  { label: '÷', value: '/', type: 'operator' },
  { label: '×', value: '*', type: 'operator' },
  { label: '−', value: '-', type: 'operator' },
  { label: '+', value: '+', type: 'operator' },
  { label: '=', value: '=', type: 'equals' },
];

export const CLEAR_BUTTONS: CalculatorButton[] = [
  { label: 'C', value: 'C', type: 'clear' },
  { label: 'CE', value: 'CE', type: 'clear' },
  { label: '⌫', value: 'backspace', type: 'function' },
];

export const MEMORY_BUTTONS: CalculatorButton[] = [
  { label: 'MC', value: 'MC', type: 'memory' },
  { label: 'MR', value: 'MR', type: 'memory' },
  { label: 'M+', value: 'M+', type: 'memory' },
  { label: 'M−', value: 'M-', type: 'memory' },
];

export const SCIENTIFIC_BUTTONS: ScientificButton[] = [
  // Trigonometric functions
  { label: 'sin', value: 'sin(', function: 'sin', type: 'function', description: 'Sine function' },
  { label: 'cos', value: 'cos(', function: 'cos', type: 'function', description: 'Cosine function' },
  { label: 'tan', value: 'tan(', function: 'tan', type: 'function', description: 'Tangent function' },
  { label: 'asin', value: 'asin(', function: 'asin', type: 'function', description: 'Inverse sine' },
  { label: 'acos', value: 'acos(', function: 'acos', type: 'function', description: 'Inverse cosine' },
  { label: 'atan', value: 'atan(', function: 'atan', type: 'function', description: 'Inverse tangent' },
  
  // Hyperbolic functions
  { label: 'sinh', value: 'sinh(', function: 'sinh', type: 'function', description: 'Hyperbolic sine' },
  { label: 'cosh', value: 'cosh(', function: 'cosh', type: 'function', description: 'Hyperbolic cosine' },
  { label: 'tanh', value: 'tanh(', function: 'tanh', type: 'function', description: 'Hyperbolic tangent' },
  
  // Logarithmic functions
  { label: 'ln', value: 'ln(', function: 'ln', type: 'function', description: 'Natural logarithm' },
  { label: 'log', value: 'log(', function: 'log', type: 'function', description: 'Logarithm base 10' },
  { label: 'log₂', value: 'log2(', function: 'log10', type: 'function', description: 'Logarithm base 2' },
  
  // Power and root functions
  { label: '√', value: 'sqrt(', function: 'sqrt', type: 'function', description: 'Square root' },
  { label: '∛', value: 'cbrt(', function: 'cbrt', type: 'function', description: 'Cube root' },
  { label: 'x²', value: '^2', function: 'pow', type: 'function', description: 'Square' },
  { label: 'x³', value: '^3', function: 'pow', type: 'function', description: 'Cube' },
  { label: 'xʸ', value: '^', function: 'pow', type: 'function', description: 'Power' },
  
  // Other functions
  { label: 'x!', value: 'factorial(', function: 'factorial', type: 'function', description: 'Factorial' },
  { label: '|x|', value: 'abs(', function: 'abs', type: 'function', description: 'Absolute value' },
  { label: 'eˣ', value: 'exp(', function: 'exp', type: 'function', description: 'Exponential' },
  
  // Constants
  { label: 'π', value: 'pi', function: 'pi', type: 'function', description: 'Pi constant' },
  { label: 'e', value: 'e', function: 'e', type: 'function', description: 'Euler\'s number' },
  { label: 'rand', value: 'random()', function: 'rand', type: 'function', description: 'Random number' },
];

export const PARENTHESES_BUTTONS: CalculatorButton[] = [
  { label: '(', value: '(', type: 'function' },
  { label: ')', value: ')', type: 'function' },
]; 