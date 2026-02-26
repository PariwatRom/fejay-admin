import React, { useState, useEffect } from 'react';
import { BookingResponse, Booking, Event } from '../types';
import { QrCode, Clock, CheckCircle2, AlertCircle, Smartphone, Users, List, Search, ChevronRight, Calendar, MapPin, ChevronLeft } from 'lucide-react';

interface CheckQueueProps {
  bookings: Booking[];
  events: Event[];
}

interface DeviceUnitStatus {
  id: string;
  unitNo: string;
  status: 'AVAILABLE' | 'BOOKED' | 'IN_USE';
  bookedBy?: string;
}

interface DeviceCategory {
  name: string;
  icon: string;
  units: DeviceUnitStatus[];
}

const CheckQueue: React.FC<CheckQueueProps> = ({ bookings, events }) => {
  const [tickets, setTickets] = useState<BookingResponse[]>([]);
  const [activeTab, setActiveTab] = useState<'TICKETS' | 'EVENTS'>('TICKETS');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const savedTickets = localStorage.getItem('fejay_my_tickets');
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    }
  }, []);

  const getSelectedEvent = () => events.find(e => e.id === selectedEventId);
  const getSelectedTicket = () => tickets.find(t => t.bookingId === selectedTicketId);

  const filteredTickets = tickets.filter(t => 
    t.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.event.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEvents = events.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const mockDeviceCategories: DeviceCategory[] = [
    {
      name: 'SAMSUNG GALAXY S23 ULTRA',
      icon: '🔭',
      units: [
        { id: '1', unitNo: 'S23U #1', status: 'BOOKED', bookedBy: 'UAU' },
        { id: '2', unitNo: 'S23U #2', status: 'BOOKED', bookedBy: 'IUI' },
        { id: '3', unitNo: 'S23U #3', status: 'IN_USE' },
        { id: '4', unitNo: 'S23U #4', status: 'AVAILABLE' },
      ]
    },
    {
      name: 'SAMSUNG GALAXY S24 ULTRA',
      icon: '📷',
      units: [
        { id: '5', unitNo: 'S24U #1', status: 'AVAILABLE' },
        { id: '6', unitNo: 'S24U #2', status: 'AVAILABLE' },
        { id: '7', unitNo: 'S24U #3', status: 'BOOKED', bookedBy: 'KIF' },
        { id: '8', unitNo: 'S24U #4', status: 'AVAILABLE' },
      ]
    },
    {
      name: 'SAMSUNG GALAXY S25 ULTRA',
      icon: '👑',
      units: [
        { id: 's25-1', unitNo: 'S25U #1', status: 'AVAILABLE' },
        { id: 's25-2', unitNo: 'S25U #2', status: 'BOOKED', bookedBy: 'JIB' },
        { id: 's25-3', unitNo: 'S25U #3', status: 'AVAILABLE' },
        { id: 's25-4', unitNo: 'S25U #4', status: 'AVAILABLE' },
      ]
    },
    {
      name: 'VIVO X200 PRO',
      icon: '📸',
      units: [
        { id: '9', unitNo: 'VX200P #1', status: 'AVAILABLE' },
        { id: '10', unitNo: 'VX200P #2', status: 'BOOKED', bookedBy: 'SAY' },
        { id: '11', unitNo: 'VX200P #3', status: 'IN_USE' },
        { id: '12', unitNo: 'VX200P #4', status: 'AVAILABLE' },
      ]
    },
    {
      name: 'VIVO X200 ULTRA',
      icon: '💎',
      units: [
        { id: 'vxu-1', unitNo: 'VX200U #1', status: 'AVAILABLE' },
        { id: 'vxu-2', unitNo: 'VX200U #2', status: 'AVAILABLE' },
        { id: 'vxu-3', unitNo: 'VX200U #3', status: 'IN_USE' },
        { id: 'vxu-4', unitNo: 'VX200U #4', status: 'AVAILABLE' },
      ]
    }
  ];

  const renderMyTickets = () => {
    if (selectedTicketId) {
      return renderTicketDetail();
    }

    if (tickets.length === 0) {
      return (
        <div className="animate-fadeIn flex flex-col items-center justify-center min-h-[40vh] text-center px-6">
          <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center text-4xl mb-6">
            🎫
          </div>
          <h2 className="text-xl font-black text-midnight uppercase tracking-tight">NO ACTIVE TICKETS</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">BOOK A DEVICE FROM THE HOME SCREEN</p>
        </div>
      );
    }

    return (
      <div className="space-y-3 animate-fadeIn">
        {filteredTickets.map((ticket) => (
          <button 
            key={ticket.bookingId} 
            onClick={() => setSelectedTicketId(ticket.bookingId)}
            className="w-full bg-white p-5 rounded-3xl shadow-lg shadow-indigo-900/5 border border-slate-100 flex items-center justify-between group active:scale-[0.98] transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{ticket.bookingId}</p>
                <h4 className="text-sm font-black text-midnight uppercase tracking-tight">{ticket.model}</h4>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl ${
                ticket.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {ticket.status === 'PAID' ? 'ชำระแล้ว' : 'รอชำระ'}
              </span>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
            </div>
          </button>
        ))}
      </div>
    );
  };

  const renderTicketDetail = () => {
    const ticket = getSelectedTicket();
    if (!ticket) return null;

    return (
      <div className="animate-fadeIn space-y-6">
        <button 
          onClick={() => setSelectedTicketId(null)}
          className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>BACK TO LIST</span>
        </button>

        <div className="bg-white rounded-[48px] shadow-2xl shadow-indigo-900/5 border border-slate-100 overflow-hidden">
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">Booking ID</p>
                <h3 className="text-xl font-black tracking-tight">{ticket.bookingId}</h3>
                <div className="mt-2 flex flex-col space-y-1">
                  <p className="text-[11px] font-black text-white/90 uppercase tracking-widest flex items-center">
                    <span className="mr-2">👤</span> {ticket.nickname || 'N/A'}
                  </p>
                  <p className="text-[11px] font-black text-white/80 uppercase tracking-widest flex items-center">
                    <span className="mr-2">📞</span> {ticket.phone || 'N/A'}
                  </p>
                </div>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-md">
                <span className="text-[10px] font-black uppercase tracking-widest">{ticket.status}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Smartphone className="w-4 h-4 text-indigo-200" />
              <span className="text-sm font-bold">{ticket.model}</span>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="p-10 flex flex-col items-center text-center">
            <div className="w-48 h-48 bg-slate-50 rounded-[40px] p-6 border-2 border-dashed border-slate-200 flex items-center justify-center relative">
              <svg viewBox="0 0 100 100" className="w-full h-full text-midnight opacity-80">
                <rect x="10" y="10" width="20" height="20" fill="currentColor" />
                <rect x="40" y="10" width="20" height="10" fill="currentColor" />
                <rect x="70" y="10" width="20" height="20" fill="currentColor" />
                <rect x="10" y="40" width="10" height="20" fill="currentColor" />
                <rect x="30" y="40" width="40" height="40" fill="currentColor" />
                <rect x="80" y="40" width="10" height="10" fill="currentColor" />
                <rect x="10" y="70" width="20" height="20" fill="currentColor" />
                <rect x="80" y="70" width="10" height="20" fill="currentColor" />
              </svg>
            </div>
            <p className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">แสดง QR นี้แก่พนักงาน</p>
          </div>

          {/* Details Section */}
          <div className="px-10 pb-10 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-5 rounded-3xl">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">ยอดชำระแล้ว</p>
                <p className="text-lg font-black text-emerald-600">฿{ticket.paidAmount.toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-3xl">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">ยอดค้างชำระ</p>
                <p className="text-lg font-black text-rose-500">฿{ticket.remainingAmount.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl">
              <div className="flex justify-between items-center mb-4">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">รายละเอียดอีเวนต์</p>
                <MapPin className="w-4 h-4 text-slate-300" />
              </div>
              <p className="text-sm font-black text-midnight">{ticket.event}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEventsTab = () => {
    if (selectedEventId) {
      return renderEventDetail();
    }

    return (
      <div className="grid grid-cols-3 gap-3 animate-fadeIn">
        {filteredEvents.map((event) => (
          <button 
            key={event.id}
            onClick={() => setSelectedEventId(event.id)}
            className="group relative bg-white rounded-[24px] overflow-hidden shadow-lg shadow-indigo-900/5 border border-slate-100 text-left transition-all active:scale-95"
          >
            <div className="aspect-[3/4] relative overflow-hidden bg-slate-100">
              <img 
                src={event.image} 
                alt={event.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {event.soldOut && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-rose-500/90 text-white text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest transform -rotate-12 shadow-lg">
                    SOLD OUT
                  </div>
                </div>
              )}
            </div>
            <div className="p-2.5">
              <h4 className="text-[8px] font-black text-midnight uppercase tracking-tight line-clamp-2 leading-tight mb-1.5">
                {event.name}
              </h4>
              <div className="flex items-center space-x-1 text-slate-400">
                <Calendar className="w-2 h-2" />
                <span className="text-[6px] font-bold uppercase tracking-widest">{event.date.split(' ').slice(0, 2).join(' ')}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  };

  const renderEventDetail = () => {
    const event = getSelectedEvent();
    if (!event) return null;

    return (
      <div className="animate-fadeIn space-y-8">
        {/* Event Banner */}
        <div className="bg-white p-6 rounded-[40px] shadow-xl shadow-indigo-900/5 border border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-midnight uppercase tracking-tight leading-tight mb-1">
              {event.name}
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              {event.date} 17.00
            </p>
          </div>
          <button 
            onClick={() => setSelectedEventId(null)}
            className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b-2 border-indigo-600/20 pb-1"
          >
            CHANGE EVENT
          </button>
        </div>

        {/* Device Categories */}
        <div className="space-y-10">
          {mockDeviceCategories.map((category, catIdx) => (
            <div key={catIdx} className="space-y-6">
              <div className="flex items-center space-x-4 ml-2">
                <div className="w-10 h-10 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-xl">
                  {category.icon}
                </div>
                <h4 className="text-[11px] font-black text-midnight uppercase tracking-[0.2em]">
                  {category.name}
                </h4>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {category.units.map((unit) => (
                  <div 
                    key={unit.id}
                    className={`aspect-[3/4] rounded-[32px] p-3 flex flex-col items-center justify-center text-center border-2 transition-all ${
                      unit.status === 'BOOKED' ? 'bg-indigo-50/50 border-indigo-100' :
                      unit.status === 'IN_USE' ? 'bg-slate-50 border-slate-100' :
                      'bg-emerald-50/30 border-emerald-100'
                    }`}
                  >
                    <span className={`text-[8px] font-black uppercase tracking-widest mb-2 ${
                      unit.status === 'BOOKED' ? 'text-indigo-600' :
                      unit.status === 'IN_USE' ? 'text-slate-400' :
                      'text-emerald-500'
                    }`}>
                      {unit.status}
                    </span>
                    <p className="text-[9px] font-black text-midnight uppercase mb-3">{unit.unitNo}</p>
                    
                    {unit.status === 'BOOKED' ? (
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm mb-1">
                          <Users className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{unit.bookedBy}</span>
                      </div>
                    ) : unit.status === 'IN_USE' ? (
                      <div className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center">
                        <div className="w-4 h-0.5 bg-slate-300 rounded-full" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fadeIn space-y-8 pb-10">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-midnight tracking-tight uppercase">
              {activeTab === 'TICKETS' ? 'MY TICKETS' : 'CHECK QUEUE'}
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
              {activeTab === 'TICKETS' ? 'YOUR ACTIVE RENTAL RECORDS' : 'REAL-TIME DEVICE AVAILABILITY'}
            </p>
          </div>
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`w-12 h-12 rounded-2xl shadow-xl shadow-indigo-900/5 border border-slate-100 flex items-center justify-center transition-all ${isSearchOpen ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}
          >
            <Search className="w-6 h-6" />
          </button>
        </div>

        {isSearchOpen && (
          <div className="animate-fadeIn relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input 
              type="text"
              placeholder={activeTab === 'TICKETS' ? "ค้นหารหัสการจอง..." : "ค้นหาอีเวนต์..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-lg shadow-indigo-900/5 transition-all"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-[32px] shadow-xl shadow-indigo-900/5 border border-slate-100 flex">
        <button 
          onClick={() => { setActiveTab('TICKETS'); setSelectedEventId(null); }}
          className={`flex-1 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
            activeTab === 'TICKETS' ? 'bg-midnight text-white shadow-lg shadow-midnight/20' : 'text-slate-400'
          }`}
        >
          TICKETS
        </button>
        <button 
          onClick={() => setActiveTab('EVENTS')}
          className={`flex-1 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
            activeTab === 'EVENTS' ? 'bg-midnight text-white shadow-lg shadow-midnight/20' : 'text-slate-400'
          }`}
        >
          EVENTS
        </button>
      </div>

      {activeTab === 'TICKETS' ? renderMyTickets() : renderEventsTab()}
    </div>
  );
};

export default CheckQueue;
