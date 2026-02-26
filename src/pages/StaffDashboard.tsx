import React, { useState } from 'react';
import { User, Booking } from '../types';
import { Scan, Search, CheckCircle2, Clock, History, User as UserIcon } from 'lucide-react';

interface StaffDashboardProps {
  user: User;
  bookings: Booking[];
  onUpdateBookingStatus: (id: string, status: Booking['status']) => void;
}

const StaffDashboard: React.FC<StaffDashboardProps> = ({ user, bookings, onUpdateBookingStatus }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scannedBooking, setScannedBooking] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter(b => 
    b.nickname.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.phone.includes(searchQuery) ||
    b.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScan = () => {
    setScanning(true);
    // Simulate scan delay
    setTimeout(() => {
      const randomBooking = bookings[Math.floor(Math.random() * bookings.length)];
      setScannedBooking(randomBooking);
      setScanning(false);
    }, 1500);
  };

  const handleConfirm = (status: Booking['status']) => {
    if (scannedBooking) {
      onUpdateBookingStatus(scannedBooking.id, status);
      setScannedBooking(null);
    }
  };

  return (
    <div className="animate-fadeIn space-y-8 pb-10">
      {/* Staff Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-midnight tracking-tight uppercase">Staff Portal</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Ground Operations Control</p>
        </div>
        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
          <UserIcon className="w-6 h-6" />
        </div>
      </div>

      {/* Main Scanner Section */}
      <div className="bg-white p-10 rounded-[48px] shadow-2xl shadow-indigo-900/5 border border-slate-100 flex flex-col items-center text-center">
        <div className="relative">
          <button 
            onClick={handleScan}
            disabled={scanning}
            className={`w-32 h-32 rounded-[40px] flex items-center justify-center transition-all active:scale-90 shadow-2xl ${
              scanning ? 'bg-slate-100 animate-pulse' : 'bg-indigo-600 shadow-indigo-200 hover:bg-indigo-700'
            }`}
          >
            <Scan className={`w-12 h-12 ${scanning ? 'text-slate-400' : 'text-white'}`} />
          </button>
          {scanning && (
            <div className="absolute inset-0 border-4 border-indigo-500 rounded-[40px] animate-ping opacity-20" />
          )}
        </div>
        <h3 className="mt-8 text-lg font-black text-midnight uppercase tracking-tight">Tap to Scan QR</h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Scan customer ticket to manage queue</p>
      </div>

      {/* Scanned Result Modal (Overlay) */}
      {scannedBooking && (
        <div className="fixed inset-0 bg-midnight/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white w-full max-w-sm rounded-[48px] shadow-2xl p-10 animate-slideUp">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-indigo-50 rounded-[32px] flex items-center justify-center text-3xl">
                👤
              </div>
              <div>
                <h4 className="text-2xl font-black text-midnight tracking-tight">{scannedBooking.nickname}</h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{scannedBooking.id}</p>
              </div>
              
              <div className="w-full bg-slate-50 p-6 rounded-3xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Model</span>
                  <span className="text-sm font-black text-midnight">{scannedBooking.model}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                    scannedBooking.status === 'PENDING' ? 'bg-amber-100 text-amber-600' : 
                    scannedBooking.status === 'PICKED_UP' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'
                  }`}>{scannedBooking.status}</span>
                </div>
              </div>

              <div className="w-full grid grid-cols-1 gap-4 pt-4">
                {scannedBooking.status === 'PENDING' && (
                  <button 
                    onClick={() => handleConfirm('PICKED_UP')}
                    className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-200"
                  >
                    Confirm Pickup
                  </button>
                )}
                {scannedBooking.status === 'PICKED_UP' && (
                  <button 
                    onClick={() => handleConfirm('RETURNED')}
                    className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-200"
                  >
                    Confirm Return
                  </button>
                )}
                <button 
                  onClick={() => setScannedBooking(null)}
                  className="w-full py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Scans / Search */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-sm font-black text-midnight uppercase tracking-widest flex items-center space-x-2">
            <History className="w-4 h-4 text-slate-400" />
            <span>Recent Bookings</span>
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input 
              type="text" 
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-32 md:w-48"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center justify-between group hover:border-indigo-200 transition-all">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                  booking.status === 'PICKED_UP' ? 'bg-indigo-50 text-indigo-600' : 
                  booking.status === 'RETURNED' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                }`}>
                  {booking.status === 'PICKED_UP' ? <Clock className="w-6 h-6" /> : 
                   booking.status === 'RETURNED' ? <CheckCircle2 className="w-6 h-6" /> : <UserIcon className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="text-sm font-black text-midnight tracking-tight">{booking.nickname}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{booking.model}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{booking.id}</p>
                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${
                  booking.status === 'PICKED_UP' ? 'bg-indigo-50 text-indigo-600' : 
                  booking.status === 'RETURNED' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                }`}>{booking.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
