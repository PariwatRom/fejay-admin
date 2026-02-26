import React, { useState } from 'react';
import { Booking } from '../types';

interface StaffDashboardProps {
  user: { displayName: string };
  bookings: Booking[];
  onUpdateBookingStatus: (id: string, status: Booking['status']) => void;
}

const StaffDashboard: React.FC<StaffDashboardProps> = ({ user, bookings, onUpdateBookingStatus }) => {
  const [search, setSearch] = useState('');

  const filteredBookings = bookings.filter(b => 
    b.nickname.toLowerCase().includes(search.toLowerCase()) || 
    b.phone.includes(search)
  );

  return (
    <div className="animate-fadeIn pb-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-midnight tracking-tight uppercase">Hi, {user.displayName}</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Ground Operations</p>
        </div>
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl shadow-sm">📋</div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search by name or phone..." 
          className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-[24px] text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300">🔍</span>
      </div>

      {/* Booking List */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-midnight uppercase tracking-[0.2em] px-2">Recent Bookings</h3>
        <div className="space-y-4">
          {filteredBookings.length > 0 ? filteredBookings.map(booking => (
            <div key={booking.id} className="bg-white p-6 rounded-[32px] border border-slate-100 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-black text-midnight uppercase">{booking.nickname}</span>
                    <span className="text-[9px] text-slate-300 font-bold">#{booking.id}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{booking.model} • {booking.phone}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                  booking.status === 'RETURNED' ? 'bg-slate-100 text-slate-400' :
                  booking.status === 'PICKED_UP' ? 'bg-indigo-50 text-indigo-600' :
                  'bg-emerald-50 text-emerald-600'
                }`}>
                  {booking.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {booking.status === 'PENDING' && (
                  <button 
                    onClick={() => onUpdateBookingStatus(booking.id, 'PICKED_UP')}
                    className="w-full py-3 bg-primary text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all"
                  >
                    รับเครื่อง
                  </button>
                )}
                {booking.status === 'PICKED_UP' && (
                  <button 
                    onClick={() => onUpdateBookingStatus(booking.id, 'RETURNED')}
                    className="w-full py-3 bg-midnight text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-indigo-900/20 active:scale-95 transition-all"
                  >
                    คืนเครื่อง
                  </button>
                )}
                {booking.status === 'RETURNED' && (
                  <div className="col-span-2 text-center py-3 bg-slate-50 rounded-2xl text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Completed
                  </div>
                )}
              </div>
            </div>
          )) : (
            <div className="text-center py-12 bg-slate-50 rounded-[32px] border border-dashed border-slate-200">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">No bookings found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
