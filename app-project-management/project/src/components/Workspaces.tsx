import React, { useState } from 'react';
import { Plus, Users, Settings, Trash2, Crown, UserPlus, MoreHorizontal } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Workspace } from '../types';

const Workspaces = () => {
  const { state, dispatch } = useApp();
  const { workspaces, users } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    emoji: '🚀',
    color: 'blue',
  });

  const colorOptions = [
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
    { value: 'pink', label: 'Pink', class: 'bg-pink-500' },
  ];

  const emojiOptions = ['🚀', '📈', '💡', '🎯', '⚡', '🔥', '🌟', '🎨', '🔧', '📊'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const workspaceData: Workspace = {
      id: editingWorkspace?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      emoji: formData.emoji,
      color: formData.color,
      members: editingWorkspace?.members || [users[0]],
      createdAt: editingWorkspace?.createdAt || new Date().toISOString(),
      isDefault: editingWorkspace?.isDefault || false,
    };

    if (editingWorkspace) {
      dispatch({ type: 'UPDATE_WORKSPACE', payload: workspaceData });
    } else {
      dispatch({ type: 'ADD_WORKSPACE', payload: workspaceData });
    }

    setIsModalOpen(false);
    setEditingWorkspace(null);
    setFormData({ name: '', description: '', emoji: '🚀', color: 'blue' });
  };

  const handleEdit = (workspace: Workspace) => {
    setEditingWorkspace(workspace);
    setFormData({
      name: workspace.name,
      description: workspace.description,
      emoji: workspace.emoji,
      color: workspace.color,
    });
    setIsModalOpen(true);
  };

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500',
      orange: 'bg-orange-500',
      pink: 'bg-pink-500',
    };
    return colorMap[color] || 'bg-blue-500';
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Workspaces</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Organize your projects and collaborate with your team
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New Workspace</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map(workspace => (
            <div key={workspace.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${getColorClass(workspace.color)}`}>
                    <span className="text-white text-xl">{workspace.emoji}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                      <span>{workspace.name}</span>
                      {workspace.isDefault && (
                        <Crown className="h-4 w-4 text-yellow-500" title="Default workspace" />
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {workspace.members.length} members
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleEdit(workspace)}
                    className="p-1 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {workspace.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {workspace.members.slice(0, 4).map(member => (
                    <div
                      key={member.id}
                      className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800"
                      title={member.name}
                    >
                      <span className="text-white text-xs font-medium">{member.initials}</span>
                    </div>
                  ))}
                  {workspace.members.length > 4 && (
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                      <span className="text-gray-600 dark:text-gray-300 text-xs font-medium">
                        +{workspace.members.length - 4}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                    <UserPlus className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors">
                    <Users className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Created {new Date(workspace.createdAt).toLocaleDateString()}</span>
                  <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {workspaces.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No workspaces yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your first workspace to start collaborating with your team
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Create Workspace
            </button>
          </div>
        )}
      </div>

      {/* Workspace Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingWorkspace ? 'Edit Workspace' : 'Create New Workspace'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingWorkspace(null);
                  setFormData({ name: '', description: '', emoji: '🚀', color: 'blue' });
                }}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Workspace Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Emoji
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {emojiOptions.map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setFormData({ ...formData, emoji })}
                        className={`p-2 text-lg rounded border-2 transition-colors ${
                          formData.emoji === emoji
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorOptions.map(color => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, color: color.value })}
                        className={`p-3 rounded border-2 transition-colors ${
                          formData.color === color.value
                            ? 'border-blue-500'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className={`w-full h-4 rounded ${color.class}`}></div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingWorkspace(null);
                    setFormData({ name: '', description: '', emoji: '🚀', color: 'blue' });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  {editingWorkspace ? 'Update Workspace' : 'Create Workspace'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workspaces;