import React, { useState } from 'react';
import { User, Lock, LogIn } from 'lucide-react';

export default function LoginForm({ onLogin }) {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employeeNumber || !password) return;
    onLogin({ employeeNumber, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur rounded-2xl shadow-xl border border-white/10 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <User className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Employee Attendance</h1>
            <p className="text-slate-400 text-sm">Sign in to manage your day</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <User className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Employee Number"
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(e.target.value.replace(/\D/g, ''))}
            />
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full pl-10 pr-12 py-3 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-sm"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg transition-colors"
          >
            <LogIn className="h-5 w-5" />
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
