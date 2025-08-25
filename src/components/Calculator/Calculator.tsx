import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CalculatorState, CalculationHistory, MemoryValue, AngleMode } from '../../types/calculator';
import { evaluateExpression, formatDisplay, CalculationError } from '../../utils/calculations';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButtons from './CalculatorButtons';
import ScientificPanel from '../ScientificPanel/ScientificPanel';
import History from '../History/History';
import Memory from '../Memory/Memory';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    expression: '',
    history: [],
    memory: null,
    angleMode: 'degrees',
    isScientificMode: false,
    lastResult: null,
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      if (/[0-9.]/.test(key)) {
        handleNumberInput(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperatorInput(key === '*' ? '×' : key === '/' ? '÷' : key === '-' ? '−' : key);
      } else if (key === 'Enter' || key === '=') {
        handleEquals();
      } else if (key === 'Escape') {
        handleClear();
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === '(' || key === ')') {
        handleFunctionInput(key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state]);

  const handleNumberInput = useCallback((value: string) => {
    setState(prev => {
      if (prev.display === '0' && value !== '.') {
        return {
          ...prev,
          display: value,
          expression: prev.expression + value,
        };
      }
      
      if (value === '.' && prev.display.includes('.')) {
        return prev;
      }
      
      return {
        ...prev,
        display: prev.display + value,
        expression: prev.expression + value,
      };
    });
  }, []);

  const handleOperatorInput = useCallback((operator: string) => {
    setState(prev => {
      const lastChar = prev.expression.slice(-1);
      const operators = ['+', '−', '×', '÷'];
      
      if (operators.includes(lastChar)) {
      
        return {
          ...prev,
          expression: prev.expression.slice(0, -1) + operator,
          display: '0',
        };
      }
      
      return {
        ...prev,
        expression: prev.expression + operator,
        display: '0',
      };
    });
  }, []);

  const handleFunctionInput = useCallback((value: string) => {
    setState(prev => ({
      ...prev,
      expression: prev.expression + value,
      display: '0',
    }));
  }, []);

  const handleScientificFunction = useCallback((func: string, value: string) => {
    setState(prev => {
      let newExpression = prev.expression;
      
      if (func === 'pi') {
        newExpression += 'π';
      } else if (func === 'e') {
        newExpression += 'e';
      } else if (func === 'rand') {
        newExpression += Math.random().toString();
      } else {
        newExpression += func + '(';
      }
      
      return {
        ...prev,
        expression: newExpression,
        display: '0',
      };
    });
  }, []);

  const handleEquals = useCallback(() => {
    if (!state.expression.trim()) return;
    
    try {
      const result = evaluateExpression(state.expression, state.angleMode);
      const historyEntry: CalculationHistory = {
        id: Date.now().toString(),
        expression: formatDisplay(state.expression),
        result,
        timestamp: new Date(),
      };
      
      setState(prev => ({
        ...prev,
        display: result,
        expression: result,
        history: [historyEntry, ...prev.history.slice(0, 9)], 
        lastResult: result,
      }));
    } catch (error) {
      if (error instanceof CalculationError) {
        setState(prev => ({
          ...prev,
          display: 'Error',
        }));
      }
    }
  }, [state.expression, state.angleMode]);

  const handleClear = useCallback(() => {
    setState(prev => ({
      ...prev,
      display: '0',
      expression: '',
      lastResult: null,
    }));
  }, []);

  const handleClearEntry = useCallback(() => {
    setState(prev => ({
      ...prev,
      display: '0',
    }));
  }, []);

  const handleBackspace = useCallback(() => {
    setState(prev => {
      if (prev.display === '0' || prev.display === 'Error') {
        return prev;
      }
      
      const newDisplay = prev.display.slice(0, -1);
      const newExpression = prev.expression.slice(0, -1);
      
      return {
        ...prev,
        display: newDisplay || '0',
        expression: newExpression,
      };
    });
  }, []);

  const handleMemoryOperation = useCallback((operation: string) => {
    setState(prev => {
      const currentValue = parseFloat(prev.display) || 0;
      
      switch (operation) {
        case 'MC':
          return { ...prev, memory: null };
        case 'MR':
          if (prev.memory) {
            return {
              ...prev,
              display: prev.memory.value.toString(),
              expression: prev.memory.value.toString(),
            };
          }
          return prev;
        case 'M+':
          if (prev.memory) {
            return {
              ...prev,
              memory: {
                value: prev.memory.value + currentValue,
                timestamp: new Date(),
              },
            };
          } else {
            return {
              ...prev,
              memory: {
                value: currentValue,
                timestamp: new Date(),
              },
            };
          }
        case 'M-':
          if (prev.memory) {
            return {
              ...prev,
              memory: {
                value: prev.memory.value - currentValue,
                timestamp: new Date(),
              },
            };
          } else {
            return {
              ...prev,
              memory: {
                value: -currentValue,
                timestamp: new Date(),
              },
            };
          }
        default:
          return prev;
      }
    });
  }, []);

  const handleAngleModeToggle = useCallback(() => {
    setState(prev => ({
      ...prev,
      angleMode: prev.angleMode === 'degrees' ? 'radians' : 'degrees',
    }));
  }, []);

  const handleScientificModeToggle = useCallback(() => {
    setState(prev => ({
      ...prev,
      isScientificMode: !prev.isScientificMode,
    }));
  }, []);

  const handleHistorySelect = useCallback((entry: CalculationHistory) => {
    setState(prev => ({
      ...prev,
      expression: entry.expression,
      display: entry.result,
    }));
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 dark:text-white"
            >
              Scientific Calculator
            </motion.h1>
            <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <CalculatorDisplay 
                  display={state.display}
                  expression={formatDisplay(state.expression)}
                  angleMode={state.angleMode}
                />
                
                <div className="mt-6">
                  <CalculatorButtons
                    onNumberInput={handleNumberInput}
                    onOperatorInput={handleOperatorInput}
                    onFunctionInput={handleFunctionInput}
                    onEquals={handleEquals}
                    onClear={handleClear}
                    onClearEntry={handleClearEntry}
                    onBackspace={handleBackspace}
                    onMemoryOperation={handleMemoryOperation}
                    onScientificModeToggle={handleScientificModeToggle}
                    onAngleModeToggle={handleAngleModeToggle}
                    isScientificMode={state.isScientificMode}
                    angleMode={state.angleMode}
                    memory={state.memory}
                  />
                </div>

                {state.isScientificMode && (
                  <ScientificPanel
                    onFunctionSelect={handleScientificFunction}
                    angleMode={state.angleMode}
                  />
                )}
              </div>
            </motion.div>

           
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Memory 
                memory={state.memory}
                onMemoryOperation={handleMemoryOperation}
              />
              
              <History 
                history={state.history}
                onHistorySelect={handleHistorySelect}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator; 