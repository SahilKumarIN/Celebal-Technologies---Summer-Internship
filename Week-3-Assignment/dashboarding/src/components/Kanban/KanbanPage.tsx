import React, { useState } from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { KanbanColumn } from './KanbanColumn';
import { TaskCard } from './TaskCard';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  tags: string[];
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export const KanbanPage: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: '1',
          title: 'Design new landing page',
          description: 'Create wireframes and mockups for the new homepage',
          priority: 'high',
          assignee: 'John Doe',
          dueDate: '2024-02-15',
          tags: ['Design', 'UI/UX']
        },
        {
          id: '2',
          title: 'Set up database schema',
          description: 'Design and implement the database structure',
          priority: 'medium',
          assignee: 'Jane Smith',
          dueDate: '2024-02-20',
          tags: ['Backend', 'Database']
        }
      ]
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      tasks: [
        {
          id: '3',
          title: 'Implement user authentication',
          description: 'Add login and registration functionality',
          priority: 'high',
          assignee: 'Bob Johnson',
          dueDate: '2024-02-18',
          tags: ['Frontend', 'Backend']
        }
      ]
    },
    {
      id: 'review',
      title: 'In Review',
      tasks: [
        {
          id: '4',
          title: 'Code review for API endpoints',
          description: 'Review and test all REST API endpoints',
          priority: 'medium',
          assignee: 'Alice Brown',
          dueDate: '2024-02-12',
          tags: ['Backend', 'Testing']
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: '5',
          title: 'Project setup and configuration',
          description: 'Initialize project with required dependencies',
          priority: 'low',
          assignee: 'Charlie Wilson',
          dueDate: '2024-02-01',
          tags: ['Setup', 'Config']
        }
      ]
    }
  ]);

  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<string | null>(null);

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask(task);
    setDraggedFromColumn(columnId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    if (!draggedTask || !draggedFromColumn) return;

    setColumns(prevColumns => {
      const newColumns = prevColumns.map(column => {
        if (column.id === draggedFromColumn) {
          return {
            ...column,
            tasks: column.tasks.filter(task => task.id !== draggedTask.id)
          };
        }
        if (column.id === targetColumnId) {
          return {
            ...column,
            tasks: [...column.tasks, draggedTask]
          };
        }
        return column;
      });
      return newColumns;
    });

    setDraggedTask(null);
    setDraggedFromColumn(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kanban Board</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Plus size={16} />
          <span>Add Task</span>
        </button>
      </div>

      <div className="flex space-x-6 overflow-x-auto pb-6">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDragStart={() => handleDragStart(task, column.id)}
              />
            ))}
          </KanbanColumn>
        ))}
      </div>
    </div>
  );
};