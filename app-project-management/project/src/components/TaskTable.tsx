import React from 'react';
import { 
  MoreHorizontal, 
  Calendar, 
  MessageSquare, 
  Paperclip,
  Flag,
  Flame,
  Edit3,
  UserPlus,
  Trash2,
  CheckCircle2,
  Circle,
  Clock,
  XCircle
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Task } from '../types';

const TaskTable = () => {
  const { state, dispatch, filteredTasks } = useApp();
  const { selectedTasks } = state;

  const handleSelectTask = (taskId: string) => {
    dispatch({ type: 'TOGGLE_TASK_SELECTION', payload: taskId });
  };

  const handleSelectAll = (checked: boolean) => {
    dispatch({ type: 'SELECT_ALL_TASKS', payload: checked });
  };

  const handleEditTask = (task: Task) => {
    dispatch({ type: 'OPEN_TASK_MODAL', payload: task });
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      dispatch({ type: 'DELETE_TASK', payload: taskId });
    }
  };

  const handleStatusChange = (task: Task, newStatus: Task['status']) => {
    const updatedTask = { ...task, status: newStatus, updatedAt: new Date().toISOString() };
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'todo':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'blocked':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-purple-500" />;
      case 'blocked':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'todo':
        return 'To Do';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'blocked':
        return 'Blocked';
      default:
        return status;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Flag className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Flame className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isAllSelected = filteredTasks.length > 0 && filteredTasks.every(task => selectedTasks.includes(task.id));
  const isIndeterminate = selectedTasks.length > 0 && !isAllSelected;

  return (
    <div className="flex-1 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Tasks</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {filteredTasks.length} tasks • {selectedTasks.length} selected
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0">
            <tr>
              <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white w-8">
                <input 
                  type="checkbox" 
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" 
                />
              </th>
              <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                Task Name
              </th>
              <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                Status
              </th>
              <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                Priority
              </th>
              <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                Assignee
              </th>
              <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                Due Date
              </th>
              <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                Project
              </th>
              <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white w-8">
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr 
                key={task.id} 
                className={`group hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors duration-150 ${
                  index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'
                }`}
              >
                <td className="py-4 px-6">
                  <input 
                    type="checkbox" 
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => handleSelectTask(task.id)}
                    className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" 
                  />
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{task.name}</span>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEditTask(task)}
                        className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <Edit3 className="h-3 w-3" />
                      </button>
                      {task.comments > 0 && (
                        <div className="flex items-center space-x-1 text-gray-400 dark:text-gray-500">
                          <MessageSquare className="h-3 w-3" />
                          <span className="text-xs">{task.comments}</span>
                        </div>
                      )}
                      {task.attachments > 0 && (
                        <div className="flex items-center space-x-1 text-gray-400 dark:text-gray-500">
                          <Paperclip className="h-3 w-3" />
                          <span className="text-xs">{task.attachments}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(task.status)}
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task, e.target.value as Task['status'])}
                      className={`text-xs font-medium rounded-full px-2 py-1 border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(task.status)}`}
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    {getPriorityIcon(task.priority)}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 capitalize">{task.priority}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-medium leading-none">{task.assignee.initials}</span>
                    </div>
                    <span className="text-sm text-gray-900 dark:text-white">{task.assignee.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-sm text-gray-900 dark:text-white">{formatDate(task.dueDate)}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{task.project}</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEditTask(task)}
                      className="p-1 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                      title="Edit task"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                      title="Delete task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-2">
              <CheckCircle2 className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No tasks found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {state.searchQuery || state.filterStatus !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Create your first task to get started'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskTable;