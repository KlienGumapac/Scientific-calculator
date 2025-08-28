import React from 'react';
import { motion } from 'framer-motion';
import { CalculatorButton, MemoryValue, AngleMode } from '../../types/calculator';
import { 
  NUMBER_BUTTONS, 
  OPERATOR_BUTTONS, 
  CLEAR_BUTTONS, 
  MEMORY_BUTTONS,
  PARENTHESES_BUTTONS 
} from '../../constants/calculatorButtons';

interface CalculatorButtonsProps {
  onNumberInput: (value: string) => void;
  onOperatorInput: (operator: string) => void;
  onFunctionInput: (value: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onClearEntry: () => void;
  onBackspace: () => void;
  onMemoryOperation: (operation: string) => void;
  onScientificModeToggle: () => void;
  onAngleModeToggle: () => void;
  isScientificMode: boolean;
  angleMode: AngleMode;
  memory: MemoryValue | null;
}

const CalculatorButtons: React.FC<CalculatorButtonsProps> = ({
  onNumberInput,
  onOperatorInput,
  onFunctionInput,
  onEquals,
  onClear,
  onClearEntry,
  onBackspace,
  onMemoryOperation,
  onScientificModeToggle,
  onAngleModeToggle,
  isScientificMode,
  angleMode,
  memory,
}) => {
  const handleButtonClick = (button: CalculatorButton) => {
    switch (button.type) {
      case 'number':
        onNumberInput(button.value);
        break;
      case 'operator':
        onOperatorInput(button.value);
        break;
      case 'function':
        if (button.value === 'backspace') {
          onBackspace();
        } else if (button.value === '±') {
  
          onFunctionInput('-');
        } else {
          onFunctionInput(button.value);
        }
        break;
      case 'clear':
        if (button.value === 'C') {
          onClear();
        } else if (button.value === 'CE') {
          onClearEntry();
        }
        break;
      case 'equals':
        onEquals();
        break;
      case 'memory':
        onMemoryOperation(button.value);
        break;
    }
  };

  const renderButton = (button: CalculatorButton, index: number) => {
    let buttonClass = 'calculator-button ';
    
    switch (button.type) {
      case 'number':
        buttonClass += 'calculator-button-number';
        break;
      case 'operator':
        buttonClass += 'calculator-button-operator';
        break;
      case 'clear':
        buttonClass += 'calculator-button-clear';
        break;
      case 'function':
        buttonClass += 'calculator-button-function';
        break;
      case 'equals':
        buttonClass += 'calculator-button-operator';
        break;
      case 'memory':
        buttonClass += memory ? 'calculator-button-function' : 'calculator-button-number';
        break;
    }

    return (
      <motion.button
        key={`${button.label}-${index}`}
        className={buttonClass}
        onClick={() => handleButtonClick(button)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.02 }}
      >
        {button.label}
      </motion.button>
    );
  };

  return (
    <div className="space-y-4">

      <div className="grid grid-cols-4 gap-2">
        {MEMORY_BUTTONS.map((button, index) => renderButton(button, index))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <motion.button
          className={`calculator-button calculator-button-function ${
            isScientificMode ? 'bg-blue-600 text-white' : ''
          }`}
          onClick={onScientificModeToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isScientificMode ? 'Standard' : 'Scientific'}
        </motion.button>
        
        <motion.button
          className="calculator-button calculator-button-function"
          onClick={onAngleModeToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {angleMode === 'degrees' ? 'DEG' : 'RAD'}
        </motion.button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {CLEAR_BUTTONS.map((button, index) => renderButton(button, index))}
      </div>

      {isScientificMode && (
        <div className="grid grid-cols-2 gap-2">
          {PARENTHESES_BUTTONS.map((button, index) => renderButton(button, index))}
        </div>
      )}

      <div className="grid grid-cols-4 gap-2">
    
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-2">
            {NUMBER_BUTTONS.map((button, index) => renderButton(button, index))}
          </div>
        </div>
        
        <div className="space-y-2">
          {OPERATOR_BUTTONS.map((button, index) => renderButton(button, index))}
        </div>
      </div>
    </div>
  );
};
export default CalculatorButtons; 