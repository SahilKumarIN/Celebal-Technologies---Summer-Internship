import React from 'react';
import { Plus } from 'lucide-react';
import { Column } from './KanbanPage';

interface KanbanColumnProps {
  column: Column;
  children: React.ReactNode;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  children,
  onDragOver,
  onDrop,
}) => {
  return (
    <div
      className="flex-shrink-0 w-80 bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">{column.title}</h3>
          <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
            {column.tasks.length}
          </span>
        </div>
        <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          <Plus size={16} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      
      <div className="space-y-3 min-h-[200px]">
        {children}
      </div>
    </div>
  );
};