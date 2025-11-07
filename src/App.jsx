import React, { useMemo, useState } from 'react';
import LoginForm from './components/LoginForm';
import ProfileCard from './components/ProfileCard';
import AttendanceDashboard from './components/AttendanceDashboard';
import RequestPanels, { StatusBadge } from './components/RequestPanels';
import { LogOut, Clock, User, ListChecks, Bell } from 'lucide-react';

function seedDemoData(empNo) {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const makeDate = (d) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const base = [];
  for (let d = 1; d <= Math.min(28, new Date(year, month + 1, 0).getDate()); d++) {
    const isWeekend = new Date(year, month, d).getDay() % 6 === 0;
    if (isWeekend) continue;
    const late = Math.random() < 0.25 ? Math.floor(Math.random() * 30) : 0;
    const ot = Math.random() < 0.4 ? Number((Math.random() * 3).toFixed(2)) : 0;
    base.push({
      date: makeDate(d),
      in: late ? `09:${String(late).padStart(2, '0')}` : '08:55',
      out: ot ? '19:00' : '17:00',
      lateMinutes: late,
      overtimeHours: ot,
    });
  }
  return base;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [warningRequests, setWarningRequests] = useState([]);
  const [sickRequests, setSickRequests] = useState([]);

  const attendance = useMemo(() => (user ? seedDemoData(user.employeeNumber) : []), [user]);

  const handleLogin = ({ employeeNumber }) => {
    // Demo auth only; backend integration can replace this later
    const profile = {
      name: `Employee ${employeeNumber}`,
      employeeNumber,
      grade: 'G-3',
      position: 'Operator',
      insuranceNumber: `INS-${employeeNumber}`,
      photoUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${employeeNumber}`,
    };
    setUser(profile);
  };

  const handleLogout = () => setUser(null);

  if (!user) return <LoginForm onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/40 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <Clock className="text-indigo-400 h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">Daily Attendance</div>
              <div className="text-xs text-slate-400">Clock in / out • Overtime • Violations</div>
            </div>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 text-slate-300 hover:text-white">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-indigo-400" />
            <h2 className="font-semibold">Profile</h2>
          </div>
          <ProfileCard profile={user} />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <ListChecks className="h-5 w-5 text-indigo-400" />
            <h2 className="font-semibold">Attendance & Overtime</h2>
          </div>
          <AttendanceDashboard records={attendance} />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-indigo-400" />
            <h2 className="font-semibold">Warning Relief & Sick Leave</h2>
          </div>
          <RequestPanels
            onSubmitWarningRelief={(data) => {
              const item = { ...data, status: 'on review', submittedAt: new Date().toISOString() };
              setWarningRequests((arr) => [item, ...arr]);
            }}
            onSubmitSickLeave={(data) => {
              const item = { ...data, status: 'on review', submittedAt: new Date().toISOString() };
              setSickRequests((arr) => [item, ...arr]);
            }}
          />

          {(warningRequests.length > 0 || sickRequests.length > 0) && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {warningRequests.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="font-semibold mb-3">Recent Warning Relief Requests</h3>
                  <ul className="space-y-3 text-sm text-slate-300">
                    {warningRequests.map((w, i) => (
                      <li key={i} className="border border-white/10 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="text-slate-200">{w.reason}</div>
                          <StatusBadge status={w.status} />
                        </div>
                        <div className="text-xs text-slate-400 mt-1">{new Date(w.submittedAt).toLocaleString()}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {sickRequests.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="font-semibold mb-3">Recent Sick Leave Requests</h3>
                  <ul className="space-y-3 text-sm text-slate-300">
                    {sickRequests.map((s, i) => (
                      <li key={i} className="border border-white/10 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="text-slate-200">{s.date} • {s.reason}</div>
                          <StatusBadge status={s.status} />
                        </div>
                        <div className="text-xs text-slate-400 mt-1">{new Date(s.submittedAt).toLocaleString()}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
