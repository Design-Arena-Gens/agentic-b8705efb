'use client';

import { useState } from 'react';
import { Plus, Trash2, CheckCircle, Circle, Calendar, User } from 'lucide-react';

type TaskStatus = 'todo' | 'in-progress' | 'done';

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignee: string;
  dueDate: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Modernize company website',
      tasks: [
        {
          id: '1-1',
          title: 'Design homepage mockup',
          description: 'Create new design for homepage',
          status: 'done',
          assignee: 'Sarah',
          dueDate: '2025-11-05'
        },
        {
          id: '1-2',
          title: 'Implement responsive layout',
          description: 'Make design work on all devices',
          status: 'in-progress',
          assignee: 'Mike',
          dueDate: '2025-11-10'
        }
      ]
    }
  ]);

  const [selectedProject, setSelectedProject] = useState<string>('1');
  const [showNewProject, setShowNewProject] = useState(false);
  const [showNewTask, setShowNewTask] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: ''
  });

  const addProject = () => {
    if (newProject.name.trim()) {
      const project: Project = {
        id: Date.now().toString(),
        name: newProject.name,
        description: newProject.description,
        tasks: []
      };
      setProjects([...projects, project]);
      setNewProject({ name: '', description: '' });
      setShowNewProject(false);
      setSelectedProject(project.id);
    }
  };

  const deleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
    if (selectedProject === projectId && projects.length > 1) {
      setSelectedProject(projects[0].id);
    }
  };

  const addTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        status: 'todo',
        assignee: newTask.assignee,
        dueDate: newTask.dueDate
      };
      setProjects(projects.map(p =>
        p.id === selectedProject
          ? { ...p, tasks: [...p.tasks, task] }
          : p
      ));
      setNewTask({ title: '', description: '', assignee: '', dueDate: '' });
      setShowNewTask(false);
    }
  };

  const updateTaskStatus = (projectId: string, taskId: string, status: TaskStatus) => {
    setProjects(projects.map(p =>
      p.id === projectId
        ? {
            ...p,
            tasks: p.tasks.map(t =>
              t.id === taskId ? { ...t, status } : t
            )
          }
        : p
    ));
  };

  const deleteTask = (projectId: string, taskId: string) => {
    setProjects(projects.map(p =>
      p.id === projectId
        ? { ...p, tasks: p.tasks.filter(t => t.id !== taskId) }
        : p
    ));
  };

  const currentProject = projects.find(p => p.id === selectedProject);

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'todo': return 'bg-gray-200 text-gray-700';
      case 'in-progress': return 'bg-blue-200 text-blue-700';
      case 'done': return 'bg-green-200 text-green-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Projects */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
                <button
                  onClick={() => setShowNewProject(true)}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Plus size={20} />
                </button>
              </div>

              {showNewProject && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="text"
                    placeholder="Project name"
                    className="w-full px-3 py-2 border rounded-lg mb-2"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  />
                  <textarea
                    placeholder="Description"
                    className="w-full px-3 py-2 border rounded-lg mb-2"
                    rows={2}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={addProject}
                      className="flex-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowNewProject(false)}
                      className="flex-1 px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {projects.map(project => (
                  <div
                    key={project.id}
                    className={`p-3 rounded-lg cursor-pointer transition ${
                      selectedProject === project.id
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div onClick={() => setSelectedProject(project.id)} className="flex-1">
                        <h3 className="font-semibold text-gray-800">{project.name}</h3>
                        <p className="text-sm text-gray-600">{project.tasks.length} tasks</p>
                      </div>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Tasks */}
          <div className="col-span-9">
            {currentProject ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{currentProject.name}</h2>
                  <p className="text-gray-600">{currentProject.description}</p>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Tasks</h3>
                  <button
                    onClick={() => setShowNewTask(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Plus size={20} />
                    Add Task
                  </button>
                </div>

                {showNewTask && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="text"
                      placeholder="Task title"
                      className="w-full px-3 py-2 border rounded-lg mb-3"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                    <textarea
                      placeholder="Task description"
                      className="w-full px-3 py-2 border rounded-lg mb-3"
                      rows={2}
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Assignee"
                        className="px-3 py-2 border rounded-lg"
                        value={newTask.assignee}
                        onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                      />
                      <input
                        type="date"
                        className="px-3 py-2 border rounded-lg"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={addTask}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Add Task
                      </button>
                      <button
                        onClick={() => setShowNewTask(false)}
                        className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {currentProject.tasks.map(task => (
                    <div key={task.id} className="p-4 bg-gray-50 rounded-lg border hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-800">{task.title}</h4>
                          <p className="text-gray-600 text-sm">{task.description}</p>
                        </div>
                        <button
                          onClick={() => deleteTask(currentProject.id, task.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        {task.assignee && (
                          <div className="flex items-center gap-1">
                            <User size={16} />
                            <span>{task.assignee}</span>
                          </div>
                        )}
                        {task.dueDate && (
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => updateTaskStatus(currentProject.id, task.id, 'todo')}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                            task.status === 'todo'
                              ? getStatusColor('todo')
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          To Do
                        </button>
                        <button
                          onClick={() => updateTaskStatus(currentProject.id, task.id, 'in-progress')}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                            task.status === 'in-progress'
                              ? getStatusColor('in-progress')
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          In Progress
                        </button>
                        <button
                          onClick={() => updateTaskStatus(currentProject.id, task.id, 'done')}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                            task.status === 'done'
                              ? getStatusColor('done')
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  ))}

                  {currentProject.tasks.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Circle size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No tasks yet. Create your first task to get started!</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500 text-lg">Select or create a project to get started</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
