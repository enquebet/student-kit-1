import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  completed: boolean;
}

export default function SemesterPlannerTool() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [dueDate, setDueDate] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    
    setTasks([...tasks, {
      id: Math.random().toString(),
      title,
      course,
      dueDate,
      completed: false
    }].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
    
    setTitle('');
    setCourse('');
    setDueDate('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <ToolShell title="Semester Planner" description="Organize your semester assignments, exams, and projects in one place." category="student" seoTitle="Semester Planner & Assignment Tracker | StudentKit" seoDescription="A free online planner to track your university assignments, project deadlines, and exam dates across all your courses.">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <form onSubmit={addTask} className="bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Assignment / Task" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="flex-1 p-2 border rounded-md" 
            required 
          />
          <input 
            type="text" 
            placeholder="Course (e.g. CS101)" 
            value={course} 
            onChange={(e) => setCourse(e.target.value)} 
            className="w-full md:w-32 p-2 border rounded-md" 
          />
          <input 
            type="date" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
            className="w-full md:w-40 p-2 border rounded-md" 
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2 font-medium">
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          {tasks.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No tasks added yet. Start planning your semester!
            </div>
          ) : (
            <div className="divide-y">
              {tasks.map(task => (
                <div key={task.id} className={`p-4 flex items-center gap-4 transition-colors ${task.completed ? 'bg-gray-50 opacity-60' : 'hover:bg-gray-50'}`}>
                  <button onClick={() => toggleTask(task.id)} className="text-indigo-600 focus:outline-none">
                    {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-gray-900 truncate ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</p>
                    <div className="flex gap-4 text-sm text-gray-500 mt-1">
                      {task.course && <span>{task.course}</span>}
                      {task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
                    </div>
                  </div>
                  <button onClick={() => removeTask(task.id)} className="text-gray-400 hover:text-red-500 p-2">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
