import React, { useState } from 'react';
import { Event, Booking } from '../types';

interface AdminDashboardProps {
  user: { displayName: string };
  events: Event[];
  bookings: Booking[];
  onCreateEvent: (event: Omit<Event, 'id' | 'booked'>) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, events, bookings, onCreateEvent }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    location: '',
    date: '',
    stockS24u: 10,
    stockI15pm: 10
  });

  const totalBookings = bookings.length;
  const activeEvents = events.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateEvent({
      name: newEvent.name,
      location: newEvent.location,
      date: newEvent.date,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400',
      stock: { s24u: newEvent.stockS24u, i15pm: newEvent.stockI15pm }
    });
    setShowCreate(false);
    setNewEvent({ name: '', location: '', date: '', stockS24u: 10, stockI15pm: 10 });
  };

  return (
    <div className="animate-fadeIn pb-10 space-y-8 text-white bg-midnight -mx-5 -mt-6 px-5 pt-6 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight uppercase">Hi, {user.displayName}</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">System Overview</p>
        </div>
        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-xl border border-white/10">🛡️</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-dark p-6 rounded-[32px] shadow-2xl border border-white/5">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Bookings</p>
          <p className="text-3xl font-black">{totalBookings}</p>
        </div>
        <div className="bg-slate-dark p-6 rounded-[32px] shadow-2xl border border-white/5">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Events</p>
          <p className="text-3xl font-black text-primary">{activeEvents}</p>
        </div>
      </div>

      {/* Event Management */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Manage Events</h3>
          <button 
            onClick={() => setShowCreate(!showCreate)}
            className="text-[9px] font-black text-primary uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full border border-primary/20"
          >
            {showCreate ? 'Close' : '+ Create New'}
          </button>
        </div>

        {showCreate && (
          <form onSubmit={handleSubmit} className="bg-slate-dark p-6 rounded-[32px] border border-white/10 space-y-4 animate-slideDown">
            <input 
              type="text" placeholder="Event Name" required
              className="w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              value={newEvent.name} onChange={e => setNewEvent({...newEvent, name: e.target.value})}
            />
            <input 
              type="text" placeholder="Location" required
              className="w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})}
            />
            <input 
              type="date" required
              className="w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 ml-2">S24U Stock</label>
                <input 
                  type="number" required min="0"
                  className="w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  value={newEvent.stockS24u} onChange={e => setNewEvent({...newEvent, stockS24u: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 ml-2">I15PM Stock</label>
                <input 
                  type="number" required min="0"
                  className="w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  value={newEvent.stockI15pm} onChange={e => setNewEvent({...newEvent, stockI15pm: parseInt(e.target.value)})}
                />
              </div>
            </div>
            <button type="submit" className="w-full py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20">
              Save Event
            </button>
          </form>
        )}
        
        <div className="space-y-4">
          {events.map(event => {
            const totalStock = event.stock.s24u + event.stock.i15pm;
            const totalBooked = event.booked.s24u + event.booked.i15pm;
            const percentage = Math.round((totalBooked / totalStock) * 100);

            return (
              <div key={event.id} className="bg-slate-dark p-5 rounded-[32px] border border-white/5 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10">
                    <img src={event.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-black uppercase tracking-tight">{event.name}</h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{event.location} • {event.date}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Booking Progress</p>
                    <p className="text-[10px] font-black text-primary">{totalBooked} / {totalStock} ({percentage}%)</p>
                  </div>
                  <div className="h-2 w-full bg-midnight rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-primary transition-all duration-1000" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
