import React from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Task } from '../types';

const BoardView = () => {
  const { state, dispatch, filteredTasks } = useApp();

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100 dark:bg-gray-800' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-purple-100 dark:bg-purple-900/30' },
    { id: 'completed', title: 'Completed', color: 'bg-green-100 dark:bg-green-900/30' },
    { id: 'blocked', title: 'Blocked', color: 'bg-red-100 dark:bg-red-900/30' },
  ];

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const handleEditTask = (task: Task) => {
    dispatch({ type: 'OPEN_TASK_MODAL', payload: task });
  };

  const handleStatusChange = (task: Task, newStatus: Task['status']) => {
    const updatedTask = { ...task, status: newStatus, updatedAt: new Date().toISOString() };
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-orange-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex-1 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Board View</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Drag and drop tasks between columns
        </p>
      </div>

      <div className="flex-1 overflow-x-auto p-6">
        <div className="flex space-x-6 h-full min-w-max">
          {columns.map(column => {
            const tasks = getTasksByStatus(column.id);
            return (
              <div key={column.id} className="flex-shrink-0 w-80">
                <div className={`rounded-lg ${column.color} p-4 h-full`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {column.title}
                      </h3>
                      <span className="bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                        {tasks.length}
                      </span>
                    </div>
                    <button 
                      onClick={() => dispatch({ type: 'OPEN_TASK_MODAL' })}
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {tasks.map(task => (
                      <div
                        key={task.id}
                        className={`bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border-l-4 ${getPriorityColor(task.priority)} cursor-pointer hover:shadow-md transition-shadow`}
                        onClick={() => handleEditTask(task)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm leading-tight">
                            {task.name}
                          </h4>
                          <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>

                        {task.description && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {task.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-medium leading-none">
                                {task.assignee.initials}
                              </span>
                            </div>
                            <span className="text-gray-600 dark:text-gray-400">
                              {formatDate(task.dueDate)}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1">
                            {task.comments > 0 && (
                              <span className="text-gray-500 dark:text-gray-400">
                                💬 {task.comments}
                              </span>
                            )}
                            {task.attachments > 0 && (
                              <span className="text-gray-500 dark:text-gray-400">
                                📎 {task.attachments}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-3">
                          <select
                            value={task.status}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleStatusChange(task, e.target.value as Task['status']);
                            }}
                            className="w-full text-xs bg-gray-50 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded px-2 py-1 text-gray-700 dark:text-gray-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="blocked">Blocked</option>
                          </select>
                        </div>
                      </div>
                    ))}

                    {tasks.length === 0 && (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <p className="text-sm">No tasks in {column.title.toLowerCase()}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BoardView;