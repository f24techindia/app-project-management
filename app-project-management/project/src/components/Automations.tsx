import React, { useState } from 'react';
import { Plus, Zap, Play, Pause, Settings, Trash2, Clock, TrendingUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Automation } from '../types';

const Automations = () => {
  const { state, dispatch } = useApp();
  const { automations } = state;

  const toggleAutomation = (automationId: string) => {
    dispatch({ type: 'TOGGLE_AUTOMATION', payload: automationId });
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive 
      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  };

  const automationTemplates = [
    {
      name: 'Task Assignment',
      description: 'Automatically assign tasks based on priority and team member availability',
      trigger: 'New task created',
      action: 'Assign to available team member',
      category: 'Task Management'
    },
    {
      name: 'Deadline Reminders',
      description: 'Send notifications before task deadlines',
      trigger: 'X days before due date',
      action: 'Send email/slack notification',
      category: 'Notifications'
    },
    {
      name: 'Status Updates',
      description: 'Automatically update project status based on task completion',
      trigger: 'Task status changed',
      action: 'Update project progress',
      category: 'Project Management'
    },
    {
      name: 'Time Tracking',
      description: 'Start time tracking when task status changes to "In Progress"',
      trigger: 'Task status = In Progress',
      action: 'Start time tracker',
      category: 'Time Management'
    }
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Automations</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Streamline your workflow with automated processes
            </p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Create Automation</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Active Automations */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Automations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {automations.map(automation => (
              <div key={automation.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${automation.isActive ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                      <Zap className={`h-5 w-5 ${automation.isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{automation.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(automation.isActive)}`}>
                        {automation.isActive ? 'Active' : 'Paused'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => toggleAutomation(automation.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        automation.isActive 
                          ? 'text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30'
                          : 'text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30'
                      }`}
                      title={automation.isActive ? 'Pause automation' : 'Start automation'}
                    >
                      {automation.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                    <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                      <Settings className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{automation.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Trigger:</span>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs">
                      {automation.trigger}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Action:</span>
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded text-xs">
                      {automation.action}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>{automation.runCount} runs</span>
                    </div>
                    {automation.lastRun && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Last: {new Date(automation.lastRun).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automation Templates */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Automation Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {automationTemplates.map((template, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <Zap className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                        {template.category}
                      </span>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                    Use Template
                  </button>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Trigger:</span>
                    <span className="text-gray-600 dark:text-gray-400">{template.trigger}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Action:</span>
                    <span className="text-gray-600 dark:text-gray-400">{template.action}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {automations.length === 0 && (
          <div className="text-center py-12">
            <Zap className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No automations yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your first automation to streamline your workflow
            </p>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
              Create Automation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Automations;