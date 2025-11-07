import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, XCircle, UploadCloud, FilePlus2, MessageSquare } from 'lucide-react';

const statusColors = {
  'on review': 'text-amber-400',
  approved: 'text-emerald-400',
  denied: 'text-rose-400',
};

export default function RequestPanels({ onSubmitWarningRelief, onSubmitSickLeave }) {
  const [warning, setWarning] = useState({ reason: '', file: null });
  const [sick, setSick] = useState({ reason: '', file: null, date: '' });

  const handleFile = (setter) => (e) => {
    const file = e.target.files?.[0] || null;
    setter((prev) => ({ ...prev, file }));
  };

  const submitWarning = (e) => {
    e.preventDefault();
    if (!warning.reason) return;
    onSubmitWarningRelief?.({ ...warning });
    setWarning({ reason: '', file: null });
  };

  const submitSick = (e) => {
    e.preventDefault();
    if (!sick.reason || !sick.date) return;
    onSubmitSickLeave?.({ ...sick });
    setSick({ reason: '', file: null, date: '' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-amber-400" />
          <h3 className="text-white font-semibold">Warning Relief Request</h3>
        </div>
        <form onSubmit={submitWarning} className="space-y-4">
          <div>
            <label className="text-sm text-slate-300">Late Reason</label>
            <textarea
              className="mt-1 w-full rounded-lg bg-slate-900/60 border border-white/10 text-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              placeholder="Describe the reason for being late"
              value={warning.reason}
              onChange={(e) => setWarning((p) => ({ ...p, reason: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">Upload Evidence</label>
            <div className="mt-1 flex items-center gap-3">
              <input type="file" onChange={handleFile(setWarning)} className="text-slate-300" />
              <UploadCloud className="h-5 w-5 text-slate-400" />
            </div>
          </div>
          <button type="submit" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg">
            <MessageSquare className="h-4 w-4" />
            Submit Request
          </button>
          <div className="text-xs text-slate-400">Status will be shown as on review / approved / denied after submission.</div>
        </form>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <FilePlus2 className="h-5 w-5 text-emerald-400" />
          <h3 className="text-white font-semibold">Sick Leave Request</h3>
        </div>
        <form onSubmit={submitSick} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-300">Date</label>
              <input
                type="date"
                className="mt-1 w-full rounded-lg bg-slate-900/60 border border-white/10 text-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={sick.date}
                onChange={(e) => setSick((p) => ({ ...p, date: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm text-slate-300">Upload Evidence</label>
              <div className="mt-1 flex items-center gap-3">
                <input type="file" onChange={handleFile(setSick)} className="text-slate-300" />
                <UploadCloud className="h-5 w-5 text-slate-400" />
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm text-slate-300">Reason</label>
            <textarea
              className="mt-1 w-full rounded-lg bg-slate-900/60 border border-white/10 text-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              placeholder="Describe your symptoms or reason"
              value={sick.reason}
              onChange={(e) => setSick((p) => ({ ...p, reason: e.target.value }))}
            />
          </div>
          <button type="submit" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg">
            <CheckCircle2 className="h-4 w-4" />
            Request Sick Leave
          </button>
        </form>
      </div>
    </div>
  );
}

export function StatusBadge({ status = 'on review' }) {
  const normalized = String(status).toLowerCase();
  const color = statusColors[normalized] || 'text-slate-300';
  const Icon = normalized === 'approved' ? CheckCircle2 : normalized === 'denied' ? XCircle : AlertCircle;
  return (
    <div className={`inline-flex items-center gap-1 text-xs ${color}`}>
      <Icon className="h-4 w-4" />
      <span className="capitalize">{normalized}</span>
    </div>
  );
}
