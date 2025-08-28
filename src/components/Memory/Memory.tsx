import React from 'react';
import { motion } from 'framer-motion';
import { MemoryValue } from '../../types/calculator';
import { Database, Trash2 } from 'lucide-react';

interface MemoryProps {
  memory: MemoryValue | null;
  onMemoryOperation: (operation: string) => void;
}

const Memory: React.FC<MemoryProps> = ({ memory, onMemoryOperation }) => {
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatValue = (value: number): string => {
    if (Math.abs(value) >= 1e10 || (Math.abs(value) < 1e-10 && value !== 0)) {
      return value.toExponential(6);
    }
    return value.toFixed(10).replace(/\.?0+$/, '');
  };

  return (
    <div className="scientific-panel">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Database className="w-5 h-5 mr-2" />
          Memory
        </h3>
        {memory && (
          <button
            onClick={() => onMemoryOperation('MC')}
            className="p-1 text-gray-500 hover:text-red-500 transition-colors"
            title="Clear memory"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {!memory ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Database className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No value in memory</p>
          <p className="text-xs">Use M+ to store a value</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {formatValue(memory.value)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Stored at {formatTime(memory.timestamp)}
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => onMemoryOperation('MR')}
              className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Recall
            </button>
            <button
              onClick={() => onMemoryOperation('M+')}
              className="px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add
            </button>
          </div>
        </motion.div>
      )}

      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Memory Operations
        </h4>
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <div className="flex justify-between">
            <span>MC:</span>
            <span>Memory Clear</span>
          </div>
          <div className="flex justify-between">
            <span>MR:</span>
            <span>Memory Recall</span>
          </div>
          <div className="flex justify-between">
            <span>M+:</span>
            <span>Memory Add</span>
          </div>
          <div className="flex justify-between">
            <span>M-:</span>
            <span>Memory Subtract</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Memory; 