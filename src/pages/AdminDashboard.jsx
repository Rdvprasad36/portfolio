import React, { useState } from 'react';
import { usePortfolioInfo } from '../context/PortfolioContext';
import { useNavigate } from 'react-router-dom';
import EditableText from '../components/EditableText';

export default function AdminDashboard() {
  const { data, isAdmin, logout, updateProfile, updateSection, addProject, addExperience } = usePortfolioInfo();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [newProject, setNewProject] = useState({ title: '', description: '', tech: '', link: '' });

  if (!isAdmin) {
    navigate('/signin');
    return null;
  }

  const handleAddProject = () => {
    addProject(newProject);
    setNewProject({ title: '', description: '', tech: '', link: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <button 
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <nav className="space-y-4">
              {['overview', 'projects', 'experience', 'skills', 'posts', 'achievements'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full p-4 rounded-xl text-left font-semibold transition-all ${
                    activeTab === tab 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-white/10 hover:bg-white/20 text-gray-300'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Profile Overview</h2>
                {data.profile && (
                  <div className="space-y-4">
                    <EditableText 
                      label="Name" 
                      value={data.profile.name} 
                      onSave={(v) => updateProfile('name', v)} 
                    />
                    <EditableText 
                      label="Role" 
                      value={data.profile.role} 
                      onSave={(v) => updateProfile('role', v)} 
                    />
                    <EditableText 
                      label="Summary" 
                      multiline 
                      value={data.profile.summary} 
                      onSave={(v) => updateProfile('summary', v)} 
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'projects' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Projects</h2>
                <div className="bg-white/10 p-6 rounded-xl mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Add New Project</h3>
                  <div className="space-y-4">
                    <input 
                      placeholder="Title" 
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white"
                    />
                    <textarea 
                      placeholder="Description" 
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      rows={3}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white"
                    />
                    <input 
                      placeholder="Tech (comma separated)" 
                      value={newProject.tech}
                      onChange={(e) => setNewProject({...newProject, tech: e.target.value})}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white"
                    />
                    <input 
                      placeholder="Live Link" 
                      value={newProject.link}
                      onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white"
                    />
                    <button 
                      onClick={handleAddProject}
                      className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl font-semibold"
                    >
                      Add Project
                    </button>
                  </div>
                </div>
                <div>
                  {data.projects?.map((proj) => (
                    <div key={proj.id} className="bg-white/5 p-6 rounded-xl mb-4">
                      <EditableText value={proj.title} onSave={() => {/* update logic */}} />
                      <p className="text-gray-300">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add similar sections for other tabs */}
            {activeTab === 'experience' && <div>Experience editing panel</div>}
            {activeTab === 'skills' && <div>Skills editing panel</div>}
            {activeTab === 'posts' && <div>Posts editing panel</div>}
            {activeTab === 'achievements' && <div>Achievements editing panel</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

