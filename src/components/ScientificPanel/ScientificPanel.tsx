import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScientificButton, AngleMode } from '../../types/calculator';
import { SCIENTIFIC_BUTTONS } from '../../constants/calculatorButtons';

interface ScientificPanelProps {
  onFunctionSelect: (func: string, value: string) => void;
  angleMode: AngleMode;
}

const ScientificPanel: React.FC<ScientificPanelProps> = ({ 
  onFunctionSelect, 
  angleMode 
}) => {
  const [activeTab, setActiveTab] = useState('trig');

  const functionCategories = {
    trig: SCIENTIFIC_BUTTONS.filter(btn => 
      ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'].includes(btn.function)
    ),
    hyperbolic: SCIENTIFIC_BUTTONS.filter(btn => 
      ['sinh', 'cosh', 'tanh'].includes(btn.function)
    ),
    logarithmic: SCIENTIFIC_BUTTONS.filter(btn => 
      ['log', 'ln', 'log2'].includes(btn.function)
    ),
    power: SCIENTIFIC_BUTTONS.filter(btn => 
      ['sqrt', 'cbrt', 'pow'].includes(btn.function)
    ),
    other: SCIENTIFIC_BUTTONS.filter(btn => 
      ['factorial', 'abs', 'exp'].includes(btn.function)
    ),
    constants: SCIENTIFIC_BUTTONS.filter(btn => 
      ['pi', 'e', 'rand'].includes(btn.function)
    ),
  };

  const tabs = [
    { id: 'trig', label: 'Trig', icon: '∠' },
    { id: 'hyperbolic', label: 'Hyp', icon: 'h' },
    { id: 'logarithmic', label: 'Log', icon: 'ln' },
    { id: 'power', label: 'Power', icon: 'xⁿ' },
    { id: 'other', label: 'Other', icon: 'f(x)' },
    { id: 'constants', label: 'Const', icon: 'π' },
  ];

  const handleFunctionClick = (button: ScientificButton) => {
    onFunctionSelect(button.function, button.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-6 scientific-panel"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Scientific Functions
        </h3>
      
        <div className="flex space-x-1 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.icon}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {functionCategories[activeTab as keyof typeof functionCategories]?.map((button, index) => (
          <motion.button
            key={`${button.function}-${index}`}
            className="calculator-button calculator-button-function text-sm"
            onClick={() => handleFunctionClick(button)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            title={button.description}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg">{button.label}</span>
              {button.function === 'sin' || button.function === 'cos' || button.function === 'tan' ? (
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {angleMode === 'degrees' ? 'deg' : 'rad'}
                </span>
              ) : null}
            </div>
          </motion.button>
        ))}
      </div>

      {activeTab === 'constants' && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quick Constants
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span>π (Pi):</span>
              <span className="font-mono">3.14159...</span>
            </div>
            <div className="flex justify-between">
              <span>e (Euler):</span>
              <span className="font-mono">2.71828...</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
export default ScientificPanel; 