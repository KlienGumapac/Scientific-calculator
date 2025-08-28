import React from 'react';
import { motion } from 'framer-motion';
import { AngleMode } from '../../types/calculator';

interface CalculatorDisplayProps {
  display: string;
  expression: string;
  angleMode: AngleMode;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ 
  display, 
  expression, 
  angleMode 
}) => {
  return (
    <div className="calculator-display">
      <div className="w-full">
        {/* Expression line */}
        {expression && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-400 dark:text-gray-500 mb-2 min-h-[20px] break-all"
          >
            {expression}
          </motion.div>
        )}
        
        <motion.div
          key={display}
          initial={{ scale: 1.05, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="text-3xl font-semibold break-all"
        >
          {display}
        </motion.div>
        
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          {angleMode === 'degrees' ? 'DEG' : 'RAD'}
        </div>
      </div>
    </div>
  );
};
export default CalculatorDisplay; 