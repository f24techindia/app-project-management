import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Target, 
  FileText, 
  Calendar, 
  Zap, 
  Settings,
  Plus,
  Users
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Sidebar = () => {
  const { state, dispatch } = useApp();
  const { projects, tasks, currentPage } = state;

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', page: 'dashboard' as const },
    { icon: CheckSquare, label: 'Tasks', page: 'tasks' as const },
    { icon: Target, label: 'Goals', page: 'goals' as const },
    { icon: FileText, label: 'Docs', page: 'docs' as const },
    { icon: Calendar, label: 'Calendar', page: 'calendar' as const },
    { icon: Zap, label: 'Automations', page: 'automations' as const },
    { icon: Users, label: 'Workspaces', page: 'workspaces' as const },
    { icon: Settings, label: 'Settings', page: 'settings' as const },
  ];

  const getProjectTaskCount = (projectName: string) => {
    return tasks.filter(task => task.project === projectName).length;
  };

  return (
    <div className="w-60 bg-gray-50 dark:bg-gray-800 h-screen flex flex-col border-r border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 text-gray-700 dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 14 14">
              <path fill="currentColor" fillRule="evenodd" d="M11.673.834a.75.75 0 0 0-1.085.796l.168.946q-.676.14-1.369.173c-.747-.004-1.315-.287-2.041-.665l-.04-.02c-.703-.366-1.564-.814-2.71-.814h-.034A10.4 10.4 0 0 0 .416 2.328a.75.75 0 1 0 .668 1.343a8.9 8.9 0 0 1 3.529-.921c.747.004 1.315.287 2.041.665l.04.02c.703.366 1.564.815 2.71.815l.034-.001a10.3 10.3 0 0 0 4.146-1.078a.75.75 0 0 0 .338-1.005a.75.75 0 0 0-.334-.336zM4.562 5.751l.034-.001c1.146 0 2.007.448 2.71.814l.04.02c.726.378 1.294.662 2.041.666q.707-.034 1.398-.18l-.192-.916a.75.75 0 0 1 1.08-.82l1.915.996a.747.747 0 0 1 .36.943a.75.75 0 0 1-.364.399a10.5 10.5 0 0 1-1.705.668a10.3 10.3 0 0 1-2.475.41c-1.146 0-2.007-.448-2.71-.814l-.04-.02c-.726-.378-1.294-.662-2.041-.666a8.9 8.9 0 0 0-3.53.922a.75.75 0 1 1-.667-1.344a10.4 10.4 0 0 1 4.146-1.077m0 4.5h.034c1.146 0 2.007.448 2.71.814l.04.02c.726.378 1.294.661 2.041.665a9 9 0 0 0 1.402-.18l-.195-.912a.75.75 0 0 1 1.079-.823l1.915.996a.747.747 0 0 1 .36.942a.75.75 0 0 1-.364.4a10.4 10.4 0 0 1-4.18 1.078c-1.146 0-2.007-.449-2.71-.815l-.04-.02c-.726-.378-1.294-.661-2.041-.665a8.9 8.9 0 0 0-3.53.921a.75.75 0 1 1-.667-1.343a10.4 10.4 0 0 1 4.146-1.078" clipRule="evenodd"/>
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">ProjectFlow</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: item.page })}
              className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${
                currentPage === item.page
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-gray-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Workspace Section */}
        <div className="mt-8 px-3">
          <div className="flex items-center justify-between px-3 py-2">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Workspaces
            </h3>
            <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-1 mt-2">
            {projects.map((project) => (
              <a
                key={project.id}
                href="#"
                className="group flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
              >
                <div className="flex items-center">
                  <span className="mr-3 text-base">{project.emoji}</span>
                  {project.name}
                </div>
                <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                  {getProjectTaskCount(project.name)}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;