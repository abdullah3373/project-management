import React from 'react';
import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange }) => {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task._id, e.target.value as Task['status']);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>
      
      {task.description && (
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {task.assignee && typeof task.assignee === 'object' && (
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs">
            {task.assignee.username?.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs text-gray-600 ml-2">
            {task.assignee.username}
          </span>
        </div>
      )}

      {task.dueDate && (
        <div className="text-xs text-gray-500 mb-3">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}

      <select
        value={task.status}
        onChange={handleStatusChange}
        className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="review">Review</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
};

export default TaskCard;
