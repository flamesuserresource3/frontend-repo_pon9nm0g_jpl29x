import React from 'react';
import { UserCircle, IdCard, ShieldCheck, BadgeCheck } from 'lucide-react';

export default function ProfileCard({ profile }) {
  const { name, employeeNumber, grade, position, insuranceNumber, photoUrl } = profile || {};

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
      <div className="shrink-0">
        <img
          src={photoUrl || 'https://i.pravatar.cc/160'}
          alt={name || 'Employee'}
          className="h-32 w-32 rounded-xl object-cover ring-2 ring-white/10"
        />
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-300">
            <UserCircle className="h-5 w-5 text-indigo-400" />
            <span className="text-sm">Name</span>
          </div>
          <div className="text-white font-medium">{name || '—'}</div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-slate-300">
            <IdCard className="h-5 w-5 text-indigo-400" />
            <span className="text-sm">Employee Number</span>
          </div>
          <div className="text-white font-medium">{employeeNumber || '—'}</div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-slate-300">
            <BadgeCheck className="h-5 w-5 text-indigo-400" />
            <span className="text-sm">Grade</span>
          </div>
          <div className="text-white font-medium">{grade || '—'}</div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-slate-300">
            <BadgeCheck className="h-5 w-5 text-indigo-400" />
            <span className="text-sm">Position</span>
          </div>
          <div className="text-white font-medium">{position || '—'}</div>
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="h-5 w-5 text-indigo-400" />
            <span className="text-sm">Insurance Number</span>
          </div>
          <div className="text-white font-medium">{insuranceNumber || '—'}</div>
        </div>
      </div>
    </div>
  );
}
