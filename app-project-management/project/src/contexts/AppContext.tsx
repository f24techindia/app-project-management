import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Task, Project, User, ViewMode, FilterStatus, SortBy, AppPage, Goal, Document, Automation, Workspace } from '../types';

interface AppState {
  currentPage: AppPage;
  tasks: Task[];
  projects: Project[];
  users: User[];
  goals: Goal[];
  documents: Document[];
  automations: Automation[];
  workspaces: Workspace[];
  viewMode: ViewMode;
  filterStatus: FilterStatus;
  sortBy: SortBy;
  searchQuery: string;
  selectedTasks: string[];
  isTaskModalOpen: boolean;
  editingTask: Task | null;
}

type AppAction =
  | { type: 'SET_CURRENT_PAGE'; payload: AppPage }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'DELETE_TASKS'; payload: string[] }
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_FILTER_STATUS'; payload: FilterStatus }
  | { type: 'SET_SORT_BY'; payload: SortBy }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'TOGGLE_TASK_SELECTION'; payload: string }
  | { type: 'SELECT_ALL_TASKS'; payload: boolean }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'OPEN_TASK_MODAL'; payload?: Task }
  | { type: 'CLOSE_TASK_MODAL' }
  | { type: 'ADD_GOAL'; payload: Goal }
  | { type: 'UPDATE_GOAL'; payload: Goal }
  | { type: 'DELETE_GOAL'; payload: string }
  | { type: 'ADD_DOCUMENT'; payload: Document }
  | { type: 'UPDATE_DOCUMENT'; payload: Document }
  | { type: 'DELETE_DOCUMENT'; payload: string }
  | { type: 'TOGGLE_AUTOMATION'; payload: string }
  | { type: 'ADD_WORKSPACE'; payload: Workspace }
  | { type: 'UPDATE_WORKSPACE'; payload: Workspace };

const initialState: AppState = {
  currentPage: 'dashboard',
  tasks: [],
  projects: [
    { id: '1', name: 'My Focus', emoji: '🧠', color: 'blue', taskCount: 0 },
    { id: '2', name: 'Product Launch', emoji: '🚀', color: 'purple', taskCount: 0 },
    { id: '3', name: 'Marketing', emoji: '📈', color: 'green', taskCount: 0 },
    { id: '4', name: 'Ideas', emoji: '💡', color: 'yellow', taskCount: 0 },
  ],
  users: [
    { id: '1', name: 'Sarah Chen', email: 'sarah@example.com', initials: 'SC' },
    { id: '2', name: 'Mike Johnson', email: 'mike@example.com', initials: 'MJ' },
    { id: '3', name: 'Alex Rodriguez', email: 'alex@example.com', initials: 'AR' },
    { id: '4', name: 'Emily Davis', email: 'emily@example.com', initials: 'ED' },
    { id: '5', name: 'John Smith', email: 'john@example.com', initials: 'JS' },
    { id: '6', name: 'Lisa Wang', email: 'lisa@example.com', initials: 'LW' },
  ],
  goals: [],
  documents: [],
  automations: [],
  workspaces: [],
  viewMode: 'list',
  filterStatus: 'all',
  sortBy: 'dueDate',
  searchQuery: '',
  selectedTasks: [],
  isTaskModalOpen: false,
  editingTask: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        selectedTasks: state.selectedTasks.filter(id => id !== action.payload),
      };
    case 'DELETE_TASKS':
      return {
        ...state,
        tasks: state.tasks.filter(task => !action.payload.includes(task.id)),
        selectedTasks: [],
      };
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    case 'SET_FILTER_STATUS':
      return { ...state, filterStatus: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'TOGGLE_TASK_SELECTION':
      return {
        ...state,
        selectedTasks: state.selectedTasks.includes(action.payload)
          ? state.selectedTasks.filter(id => id !== action.payload)
          : [...state.selectedTasks, action.payload],
      };
    case 'SELECT_ALL_TASKS':
      return {
        ...state,
        selectedTasks: action.payload ? state.tasks.map(task => task.id) : [],
      };
    case 'CLEAR_SELECTION':
      return { ...state, selectedTasks: [] };
    case 'OPEN_TASK_MODAL':
      return {
        ...state,
        isTaskModalOpen: true,
        editingTask: action.payload || null,
      };
    case 'CLOSE_TASK_MODAL':
      return {
        ...state,
        isTaskModalOpen: false,
        editingTask: null,
      };
    case 'ADD_GOAL':
      return { ...state, goals: [...state.goals, action.payload] };
    case 'UPDATE_GOAL':
      return {
        ...state,
        goals: state.goals.map(goal =>
          goal.id === action.payload.id ? action.payload : goal
        ),
      };
    case 'DELETE_GOAL':
      return {
        ...state,
        goals: state.goals.filter(goal => goal.id !== action.payload),
      };
    case 'ADD_DOCUMENT':
      return { ...state, documents: [...state.documents, action.payload] };
    case 'UPDATE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.map(doc =>
          doc.id === action.payload.id ? action.payload : doc
        ),
      };
    case 'DELETE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.filter(doc => doc.id !== action.payload),
      };
    case 'TOGGLE_AUTOMATION':
      return {
        ...state,
        automations: state.automations.map(automation =>
          automation.id === action.payload
            ? { ...automation, isActive: !automation.isActive }
            : automation
        ),
      };
    case 'ADD_WORKSPACE':
      return { ...state, workspaces: [...state.workspaces, action.payload] };
    case 'UPDATE_WORKSPACE':
      return {
        ...state,
        workspaces: state.workspaces.map(workspace =>
          workspace.id === action.payload.id ? action.payload : workspace
        ),
      };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  filteredTasks: Task[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize with sample data
  useEffect(() => {
    const sampleTasks: Task[] = [
      {
        id: '1',
        name: 'Design new landing page hero section',
        description: 'Create a compelling hero section that showcases our product value proposition',
        status: 'in-progress',
        priority: 'high',
        assignee: state.users[0],
        dueDate: '2024-12-15',
        project: 'Website Redesign',
        comments: 3,
        attachments: 2,
        createdAt: '2024-12-01',
        updatedAt: '2024-12-10',
      },
      {
        id: '2',
        name: 'Implement user authentication flow',
        description: 'Build secure login and registration system with JWT tokens',
        status: 'todo',
        priority: 'medium',
        assignee: state.users[1],
        dueDate: '2024-12-18',
        project: 'Auth System',
        comments: 1,
        attachments: 0,
        createdAt: '2024-12-02',
        updatedAt: '2024-12-02',
      },
      {
        id: '3',
        name: 'Write API documentation',
        description: 'Document all REST endpoints with examples and response schemas',
        status: 'completed',
        priority: 'low',
        assignee: state.users[2],
        dueDate: '2024-12-12',
        project: 'Documentation',
        comments: 5,
        attachments: 1,
        createdAt: '2024-11-28',
        updatedAt: '2024-12-12',
      },
      {
        id: '4',
        name: 'Set up CI/CD pipeline',
        description: 'Configure automated testing and deployment workflows',
        status: 'blocked',
        priority: 'high',
        assignee: state.users[3],
        dueDate: '2024-12-20',
        project: 'DevOps',
        comments: 2,
        attachments: 3,
        createdAt: '2024-12-03',
        updatedAt: '2024-12-08',
      },
      {
        id: '5',
        name: 'Conduct user research interviews',
        description: 'Interview 10 users to understand pain points and feature requests',
        status: 'in-progress',
        priority: 'medium',
        assignee: state.users[4],
        dueDate: '2024-12-16',
        project: 'User Research',
        comments: 0,
        attachments: 0,
        createdAt: '2024-12-04',
        updatedAt: '2024-12-09',
      },
      {
        id: '6',
        name: 'Optimize database queries',
        description: 'Improve performance of slow queries and add proper indexing',
        status: 'todo',
        priority: 'high',
        assignee: state.users[5],
        dueDate: '2024-12-22',
        project: 'Performance',
        comments: 1,
        attachments: 0,
        createdAt: '2024-12-05',
        updatedAt: '2024-12-05',
      },
    ];

    dispatch({ type: 'SET_TASKS', payload: sampleTasks });

    // Initialize sample goals
    const sampleGoals: Goal[] = [
      {
        id: '1',
        title: 'Complete Q4 Product Launch',
        description: 'Successfully launch the new product features by end of Q4',
        progress: 75,
        target: 100,
        dueDate: '2024-12-31',
        status: 'active',
        category: 'Product',
      },
      {
        id: '2',
        title: 'Increase Team Productivity',
        description: 'Improve team efficiency by 25% through better processes',
        progress: 45,
        target: 100,
        dueDate: '2024-12-30',
        status: 'active',
        category: 'Team',
      },
    ];

    // Initialize sample documents
    const sampleDocuments: Document[] = [
      {
        id: '1',
        title: 'Project Requirements Document',
        content: 'This document outlines the requirements for our upcoming project...',
        author: state.users[0],
        createdAt: '2024-12-01',
        updatedAt: '2024-12-10',
        tags: ['requirements', 'project'],
        isPublic: true,
      },
      {
        id: '2',
        title: 'Team Meeting Notes',
        content: 'Weekly team meeting notes and action items...',
        author: state.users[1],
        createdAt: '2024-12-08',
        updatedAt: '2024-12-08',
        tags: ['meeting', 'notes'],
        isPublic: false,
      },
    ];

    // Initialize sample automations
    const sampleAutomations: Automation[] = [
      {
        id: '1',
        name: 'Auto-assign high priority tasks',
        description: 'Automatically assign high priority tasks to team leads',
        trigger: 'Task created with high priority',
        action: 'Assign to team lead',
        isActive: true,
        createdAt: '2024-11-15',
        lastRun: '2024-12-10',
        runCount: 23,
      },
      {
        id: '2',
        name: 'Send deadline reminders',
        description: 'Send email reminders 2 days before task deadlines',
        trigger: '2 days before due date',
        action: 'Send email notification',
        isActive: true,
        createdAt: '2024-11-20',
        lastRun: '2024-12-09',
        runCount: 15,
      },
    ];

    // Initialize sample workspaces
    const sampleWorkspaces: Workspace[] = [
      {
        id: '1',
        name: 'Product Development',
        description: 'Main workspace for product development activities',
        emoji: '🚀',
        color: 'blue',
        members: state.users.slice(0, 4),
        createdAt: '2024-11-01',
        isDefault: true,
      },
      {
        id: '2',
        name: 'Marketing Team',
        description: 'Marketing campaigns and content creation',
        emoji: '📈',
        color: 'green',
        members: state.users.slice(2, 5),
        createdAt: '2024-11-05',
        isDefault: false,
      },
    ];

    dispatch({ type: 'ADD_GOAL', payload: sampleGoals[0] });
    dispatch({ type: 'ADD_GOAL', payload: sampleGoals[1] });
    dispatch({ type: 'ADD_DOCUMENT', payload: sampleDocuments[0] });
    dispatch({ type: 'ADD_DOCUMENT', payload: sampleDocuments[1] });
    sampleAutomations.forEach(automation => {
      dispatch({ type: 'TOGGLE_AUTOMATION', payload: automation.id });
      state.automations.push(automation);
    });
    dispatch({ type: 'ADD_WORKSPACE', payload: sampleWorkspaces[0] });
    dispatch({ type: 'ADD_WORKSPACE', payload: sampleWorkspaces[1] });
  }, []);

  // Filter and sort tasks
  const filteredTasks = React.useMemo(() => {
    let filtered = state.tasks;

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        task =>
          task.name.toLowerCase().includes(query) ||
          task.project.toLowerCase().includes(query) ||
          task.assignee.name.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (state.filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === state.filterStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (state.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'status':
          return a.status.localeCompare(b.status);
        case 'assignee':
          return a.assignee.name.localeCompare(b.assignee.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [state.tasks, state.searchQuery, state.filterStatus, state.sortBy]);

  return (
    <AppContext.Provider value={{ state, dispatch, filteredTasks }}>
      {children}
    </AppContext.Provider>
  );
};