import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalculationHistory } from '../../types/calculator';
import { Clock, Trash2 } from 'lucide-react';

interface HistoryProps {
  history: CalculationHistory[];
  onHistorySelect: (entry: CalculationHistory) => void;
}

const History: React.FC<HistoryProps> = ({ history, onHistorySelect }) => {
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const clearHistory = () => {

    console.log('Clear history');
  };

  return (
    <div className="scientific-panel">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          History
        </h3>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="p-1 text-gray-500 hover:text-red-500 transition-colors"
            title="Clear history"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No calculations yet</p>
          <p className="text-xs">Your calculation history will appear here</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <AnimatePresence>
            {history.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => onHistorySelect(entry)}
              >
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {entry.expression}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {entry.result}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {formatTime(entry.timestamp)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
export default History; 