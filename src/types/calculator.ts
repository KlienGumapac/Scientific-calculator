export interface CalculationHistory {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

export interface MemoryValue {
  value: number;
  timestamp: Date;
}

export type ButtonType = 'number' | 'operator' | 'function' | 'clear' | 'equals' | 'memory';

export interface CalculatorButton {
  label: string;
  value: string;
  type: ButtonType;
  className?: string;
  icon?: string;
}

export type AngleMode = 'degrees' | 'radians';

export interface CalculatorState {
  display: string;
  expression: string;
  history: CalculationHistory[];
  memory: MemoryValue | null;
  angleMode: AngleMode;
  isScientificMode: boolean;
  lastResult: string | null;
}

export type ScientificFunction = 
  | 'sin' | 'cos' | 'tan' 
  | 'asin' | 'acos' | 'atan'
  | 'sinh' | 'cosh' | 'tanh'
  | 'log' | 'ln' | 'log10'
  | 'sqrt' | 'cbrt' | 'pow'
  | 'factorial' | 'abs' | 'exp'
  | 'pi' | 'e' | 'rand';

export interface ScientificButton extends CalculatorButton {
  function: ScientificFunction;
  description: string;
} 