import React from 'react';
import { User, Booking } from '../types';

interface FinanceDashboardProps {
  user: User;
  bookings: Booking[];
}

const FinanceDashboard: React.FC<FinanceDashboardProps> = ({ user, bookings }) => {
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status === 'RETURNED' ? 900 : 0), 0);
  const pendingRevenue = bookings.reduce((sum, b) => sum + (b.status === 'PENDING' || b.status === 'PICKED_UP' ? 900 : 0), 0);

  return (
    <div className="animate-fadeIn space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-midnight tracking-tight uppercase">Finance Overview</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Revenue & Transaction Tracking</p>
        </div>
        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">
          💰
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[32px] shadow-xl shadow-indigo-900/5 border border-slate-100">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
          <p className="text-2xl font-black text-midnight tracking-tight">฿{totalRevenue.toLocaleString()}</p>
          <div className="mt-2 flex items-center text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
            <span>Completed</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] shadow-xl shadow-indigo-900/5 border border-slate-100">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending</p>
          <p className="text-2xl font-black text-midnight tracking-tight">฿{pendingRevenue.toLocaleString()}</p>
          <div className="mt-2 flex items-center text-[9px] font-bold text-amber-500 uppercase tracking-widest">
            <span>In Progress</span>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-[40px] shadow-xl shadow-indigo-900/5 border border-slate-100 overflow-hidden">
        <div className="p-6 border-bottom border-slate-50">
          <h3 className="text-sm font-black text-midnight uppercase tracking-widest">Recent Transactions</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {bookings.map((booking) => (
            <div key={booking.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                  booking.status === 'RETURNED' ? 'bg-emerald-100 text-emerald-600' : 
                  booking.status === 'CANCELLED' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {booking.status === 'RETURNED' ? '✓' : booking.status === 'CANCELLED' ? '✕' : '⋯'}
                </div>
                <div>
                  <p className="text-sm font-black text-midnight tracking-tight">{booking.nickname}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{booking.model}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-midnight tracking-tight">฿900.00</p>
                <p className={`text-[9px] font-black uppercase tracking-widest ${
                  booking.status === 'RETURNED' ? 'text-emerald-500' : 
                  booking.status === 'CANCELLED' ? 'text-red-500' : 'text-amber-500'
                }`}>{booking.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
