import React from 'react';
import { Calendar, User, Flag } from 'lucide-react';
import { Task } from './KanbanPage';

interface TaskCardProps {
  task: Task;
  onDragStart: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600 cursor-move hover:shadow-md transition-shadow"
    >
      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{task.title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{task.description}</p>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Flag size={14} className={getPriorityColor(task.priority)} />
          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{task.priority}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar size={14} className="text-gray-400" />
          <span className="text-xs text-gray-500 dark:text-gray-400">{task.dueDate}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <User size={14} className="text-gray-400" />
        <span className="text-xs text-gray-600 dark:text-gray-400">{task.assignee}</span>
      </div>
    </div>
  );
};