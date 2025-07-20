export interface Task {
  id: string;
  name: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high';
  assignee: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    initials: string;
  };
  dueDate: string;
  project: string;
  comments: number;
  attachments: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  emoji: string;
  color: string;
  taskCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initials: string;
}

export type ViewMode = 'list' | 'board' | 'calendar';
export type FilterStatus = 'all' | 'todo' | 'in-progress' | 'completed' | 'blocked';
export type SortBy = 'name' | 'dueDate' | 'priority' | 'status' | 'assignee';
export type AppPage = 'dashboard' | 'tasks' | 'goals' | 'docs' | 'calendar' | 'automations' | 'settings' | 'workspaces';

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  dueDate: string;
  status: 'active' | 'completed' | 'paused';
  category: string;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  isPublic: boolean;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  isActive: boolean;
  createdAt: string;
  lastRun?: string;
  runCount: number;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  members: User[];
  createdAt: string;
  isDefault: boolean;
}