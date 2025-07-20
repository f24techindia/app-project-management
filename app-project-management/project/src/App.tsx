import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import Sidebar from './components/Sidebar';
import TopNavigation from './components/TopNavigation';
import Dashboard from './components/Dashboard';
import TaskTable from './components/TaskTable';
import BoardView from './components/BoardView';
import CalendarView from './components/CalendarView';
import Goals from './components/Goals';
import Docs from './components/Docs';
import Automations from './components/Automations';
import Settings from './components/Settings';
import Workspaces from './components/Workspaces';
import TaskModal from './components/TaskModal';
import { useApp } from './contexts/AppContext';

const AppContent = () => {
  const { state } = useApp();
  const { viewMode, currentPage } = state;

  const renderMainContent = () => {
    if (currentPage === 'dashboard') {
      return <Dashboard />;
    }
    
    if (currentPage === 'goals') {
      return <Goals />;
    }
    
    if (currentPage === 'docs') {
      return <Docs />;
    }
    
    if (currentPage === 'automations') {
      return <Automations />;
    }
    
    if (currentPage === 'settings') {
      return <Settings />;
    }
    
    if (currentPage === 'workspaces') {
      return <Workspaces />;
    }
    
    if (currentPage === 'calendar') {
      return <CalendarView />;
    }
    
    // Tasks page with different view modes
    switch (viewMode) {
      case 'board':
        return <BoardView />;
      default:
        return <TaskTable />;
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {state.currentPage === 'tasks' && <TopNavigation />}
        {renderMainContent()}
      </div>
      <TaskModal />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;