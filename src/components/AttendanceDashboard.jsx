import React, { useMemo } from 'react';
import { CalendarDays, Clock, DollarSign, AlertTriangle } from 'lucide-react';

function formatMonthKey(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export default function AttendanceDashboard({ records = [] }) {
  // records: [{ date: '2025-11-01', in: '08:55', out: '17:30', lateMinutes: 0, overtimeHours: 1.5 }]
  const grouped = useMemo(() => {
    const g = {};
    for (const r of records) {
      const key = formatMonthKey(r.date);
      g[key] = g[key] || [];
      g[key].push(r);
    }
    return g;
  }, [records]);

  const rateOvertime = 100000; // per hour
  const penaltyLate = 20000; // per day

  return (
    <div className="space-y-6">
      {Object.keys(grouped).length === 0 && (
        <div className="text-slate-400">No attendance records yet.</div>
      )}

      {Object.entries(grouped).sort(([a],[b]) => a.localeCompare(b)).map(([month, list]) => {
        const lateDays = list.filter((r) => (r.lateMinutes || 0) > 0).length;
        const overtimeTotalHours = list.reduce((sum, r) => sum + (Number(r.overtimeHours) || 0), 0);
        const overtimeIncome = overtimeTotalHours * rateOvertime;
        const violationCut = lateDays * penaltyLate;
        const autoWarning = lateDays > 2;

        return (
          <div key={month} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white">
                <CalendarDays className="h-5 w-5 text-indigo-400" />
                <h3 className="font-semibold">{month}</h3>
              </div>
              {autoWarning && (
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-sm">Auto warning: more than 2 late days</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <Stat icon={Clock} label="Late Days" value={lateDays} />
              <Stat icon={Clock} label="Overtime Hours" value={overtimeTotalHours.toFixed(2)} />
              <Stat icon={DollarSign} label="Overtime Income" value={formatCurrency(overtimeIncome)} />
              <Stat icon={AlertTriangle} label="Violation Cut" value={formatCurrency(violationCut)} />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-slate-300">
                <thead className="text-slate-400">
                  <tr>
                    <th className="text-left py-2 pr-4">Date</th>
                    <th className="text-left py-2 pr-4">Clock In</th>
                    <th className="text-left py-2 pr-4">Clock Out</th>
                    <th className="text-left py-2 pr-4">Late (min)</th>
                    <th className="text-left py-2 pr-4">Overtime (h)</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((r, idx) => (
                    <tr key={idx} className="border-t border-white/5">
                      <td className="py-2 pr-4">{r.date}</td>
                      <td className="py-2 pr-4">{r.in}</td>
                      <td className="py-2 pr-4">{r.out}</td>
                      <td className="py-2 pr-4">{r.lateMinutes || 0}</td>
                      <td className="py-2 pr-4">{Number(r.overtimeHours || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
      <div className="text-slate-400 text-xs">{label}</div>
      <div className="flex items-center gap-2 mt-1">
        <Icon className="h-4 w-4 text-indigo-400" />
        <div className="text-white font-semibold">{value}</div>
      </div>
    </div>
  );
}

function formatCurrency(num) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);
}
