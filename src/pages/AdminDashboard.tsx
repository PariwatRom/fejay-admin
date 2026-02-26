import React, { useState, useEffect } from 'react';
import { User, Event, Booking } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  LayoutDashboard, 
  Scan, 
  Calendar, 
  BookOpen, 
  Package, 
  Users, 
  Settings, 
  Bell, 
  LogOut, 
  Search, 
  Plus, 
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  ChevronRight,
  UserPlus,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

interface AdminDashboardProps {
  user: User;
  events: Event[];
  bookings: Booking[];
  onCreateEvent: (event: Omit<Event, 'id' | 'booked'>) => void;
  onLogout: () => void;
}

type AdminTab = 'DASHBOARD' | 'SCAN' | 'EVENTS' | 'BOOKINGS' | 'INVENTORY' | 'CUSTOMERS' | 'SETTINGS';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, events, bookings, onCreateEvent, onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('DASHBOARD');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-10 text-center bg-white space-y-6">
        <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center text-4xl">💻</div>
        <h2 className="text-xl font-black text-midnight uppercase tracking-widest">
          กรุณาใช้แท็บเล็ตหรือคอมพิวเตอร์
        </h2>
        <p className="text-slate-400 text-sm font-medium max-w-xs">
          ระบบแอดมินออกแบบมาเพื่อการใช้งานบนหน้าจอขนาดใหญ่ เพื่อประสิทธิภาพสูงสุดในการจัดการข้อมูล
        </p>
        <button onClick={onLogout} className="text-indigo-600 font-bold uppercase text-xs tracking-widest border-b-2 border-indigo-600/20 pb-1">
          ออกจากระบบ
        </button>
      </div>
    );
  }

  const menuItems = [
    { id: 'DASHBOARD', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'SCAN', label: 'Scan 🔥', icon: <Scan className="w-5 h-5" /> },
    { id: 'EVENTS', label: 'Events', icon: <Calendar className="w-5 h-5" /> },
    { id: 'BOOKINGS', label: 'Bookings', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'INVENTORY', label: 'Inventory', icon: <Package className="w-5 h-5" /> },
    { id: 'CUSTOMERS', label: 'Customers', icon: <Users className="w-5 h-5" /> },
    { id: 'SETTINGS', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const renderDashboard = () => {
    const stats = [
      { label: 'Total Users', value: '1,245', icon: <Users className="w-5 h-5" />, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Total Staff', value: '18', icon: <ShieldCheck className="w-5 h-5" />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
      { label: 'Total Events', value: events.length.toString(), icon: <Calendar className="w-5 h-5" />, color: 'text-rose-600', bg: 'bg-rose-50' },
      { label: 'Today\'s Bookings', value: '42', icon: <BookOpen className="w-5 h-5" />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    const chartData = [
      { name: 'Jan', revenue: 45000 },
      { name: 'Feb', revenue: 52000 },
      { name: 'Mar', revenue: 48000 },
      { name: 'Apr', revenue: 61000 },
      { name: 'May', revenue: 55000 },
      { name: 'Jun', revenue: 67000 },
    ];

    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="grid grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex items-center space-x-4">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-midnight tracking-tight">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-midnight uppercase tracking-tight">Monthly Revenue</h3>
              <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <span>Revenue (THB)</span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6C2BD9" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6C2BD9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6C2BD9" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <h3 className="text-lg font-black text-midnight uppercase tracking-tight mb-6">System Notifications</h3>
            <div className="space-y-6">
              {[
                { title: 'New Event Created', time: '2 mins ago', icon: <Plus className="w-4 h-4" />, color: 'text-blue-500', bg: 'bg-blue-50' },
                { title: 'Low Stock: S24 Ultra', time: '1 hour ago', icon: <AlertTriangle className="w-4 h-4" />, color: 'text-amber-500', bg: 'bg-amber-50' },
                { title: 'Payment Confirmed', time: '3 hours ago', icon: <CheckCircle2 className="w-4 h-4" />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { title: 'Backup Successful', time: 'Yesterday', icon: <ShieldCheck className="w-4 h-4" />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
              ].map((notif, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className={`${notif.bg} ${notif.color} p-2.5 rounded-xl`}>
                    {notif.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-midnight leading-tight">{notif.title}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 text-[10px] font-black text-indigo-600 uppercase tracking-widest border border-indigo-100 rounded-xl hover:bg-indigo-50 transition-all">
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderScan = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 text-center">
            <div className="aspect-square bg-slate-50 rounded-[24px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center space-y-4 mb-6">
              <Scan className="w-12 h-12 text-slate-300 animate-pulse" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Camera Preview Area</p>
            </div>
            <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-200">
              Start Scanning
            </button>
          </div>

          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <h3 className="text-sm font-black text-midnight uppercase tracking-widest mb-6">Manual Entry</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Enter Booking Code (e.g. BK-123456)" 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:border-indigo-600 transition-all"
              />
              <button className="w-full py-4 bg-midnight text-white rounded-2xl font-black text-xs uppercase tracking-widest">
                Verify Code
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-midnight uppercase tracking-tight">Recent Scans</h3>
            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Clear History</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-50">
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Booking ID</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { time: '11:42:05', id: 'BK-902134', name: 'Somchai R.', status: 'VALID', color: 'text-emerald-500' },
                  { time: '11:38:12', id: 'BK-882711', name: 'Wichai P.', status: 'USED', color: 'text-amber-500' },
                  { time: '11:35:44', id: 'BK-772100', name: 'Ananya K.', status: 'VALID', color: 'text-emerald-500' },
                  { time: '11:30:19', id: 'BK-662541', name: 'Prasert M.', status: 'EXPIRED', color: 'text-rose-500' },
                ].map((scan, i) => (
                  <tr key={i} className="group">
                    <td className="py-4 text-xs font-bold text-slate-500">{scan.time}</td>
                    <td className="py-4 text-xs font-black text-midnight">{scan.id}</td>
                    <td className="py-4 text-xs font-bold text-slate-600">{scan.name}</td>
                    <td className={`py-4 text-[10px] font-black uppercase tracking-widest ${scan.color}`}>{scan.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-black text-midnight uppercase tracking-tight">Event Management</h3>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-widest">
            {events.length} Active
          </span>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-2 transition-all shadow-lg shadow-indigo-200">
          <Plus className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-slate-50/50">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Event Details</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date & Time</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Capacity</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        <img src={ev.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-midnight uppercase tracking-tight line-clamp-1">{ev.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{ev.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="text-xs font-bold text-slate-600">{ev.date}</p>
                  </td>
                  <td className="p-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">S24U: {ev.booked.s24u}/{ev.stock.s24u}</p>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${(ev.booked.s24u / ev.stock.s24u) * 100}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="text-xs font-black text-indigo-600">฿900</p>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${ev.soldOut ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                      {ev.soldOut ? 'Closed' : 'Open'}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center space-x-3">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Settings className="w-4 h-4" /></button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors"><AlertTriangle className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-midnight uppercase tracking-tight">Booking Records</h3>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input 
              type="text" 
              placeholder="Search customer name..." 
              className="pl-11 pr-6 py-2.5 bg-white border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-600 w-64"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-slate-50/50">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Booking ID</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Device Model</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Event</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-6 text-xs font-black text-midnight">{booking.id}</td>
                  <td className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-black text-indigo-600">
                        {booking.nickname.substring(0, 1)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-midnight">{booking.nickname}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{booking.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-xs font-bold text-slate-600">{booking.model}</td>
                  <td className="p-6 text-xs font-bold text-slate-600 truncate max-w-[150px]">{booking.eventName}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      booking.status === 'PICKED_UP' ? 'bg-emerald-50 text-emerald-500' : 
                      booking.status === 'PENDING' ? 'bg-amber-50 text-amber-500' : 
                      'bg-slate-50 text-slate-400'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-6 text-xs font-bold text-slate-400">{booking.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-midnight uppercase tracking-tight">Inventory Management</h3>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {[
          { name: 'Samsung S24 Ultra', stock: 45, total: 50, price: '฿42,900', icon: '📱' },
          { name: 'iPhone 15 Pro Max', stock: 32, total: 40, price: '฿48,900', icon: '🍎' },
          { name: 'Vivo X200 Pro', stock: 8, total: 20, price: '฿32,900', icon: '📸', lowStock: true },
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 relative overflow-hidden">
            {item.lowStock && (
              <div className="absolute top-4 right-4 bg-rose-50 text-rose-500 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3" />
                <span>Low Stock</span>
              </div>
            )}
            <div className="text-4xl mb-6">{item.icon}</div>
            <h4 className="text-sm font-black text-midnight uppercase tracking-tight mb-2">{item.name}</h4>
            <p className="text-xs font-bold text-slate-400 mb-6">{item.price}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-400">Current Stock</span>
                <span className={item.lowStock ? 'text-rose-500' : 'text-midnight'}>{item.stock} / {item.total}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.lowStock ? 'bg-rose-500' : 'bg-indigo-500'}`} style={{ width: `${(item.stock / item.total) * 100}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-midnight uppercase tracking-tight">Customer Directory</h3>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <UserPlus className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-slate-50/50">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Membership</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Bookings</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: 'Somchai Rakdee', email: 'somchai@gmail.com', level: 'Platinum', count: 12, status: 'Active' },
                { name: 'Ananya Kong', email: 'ananya@yahoo.com', level: 'Gold', count: 5, status: 'Active' },
                { name: 'Wichai Pan', email: 'wichai@outlook.com', level: 'Silver', count: 2, status: 'Suspended' },
              ].map((cust, i) => (
                <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-lg">👤</div>
                      <div>
                        <p className="text-xs font-black text-midnight uppercase tracking-tight">{cust.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{cust.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      cust.level === 'Platinum' ? 'bg-indigo-50 text-indigo-600' : 
                      cust.level === 'Gold' ? 'bg-amber-50 text-amber-600' : 
                      'bg-slate-50 text-slate-500'
                    }`}>
                      {cust.level}
                    </span>
                  </td>
                  <td className="p-6 text-xs font-bold text-slate-600">{cust.count} Bookings</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      cust.status === 'Active' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'
                    }`}>
                      {cust.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View History</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-4xl space-y-8 animate-fadeIn">
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-8">
          <h3 className="text-sm font-black text-midnight uppercase tracking-widest">System Configuration</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Platform Name</label>
              <input type="text" defaultValue="FEJAY ADMIN" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:border-indigo-600" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Email</label>
              <input type="email" defaultValue={user.email} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:border-indigo-600" />
            </div>
            <div className="pt-4">
              <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-200">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-8">
          <h3 className="text-sm font-black text-midnight uppercase tracking-widest">Security & Access</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <p className="text-xs font-black text-midnight uppercase tracking-tight">Two-Factor Auth</p>
                <p className="text-[10px] text-slate-400 font-medium">Enable additional security</p>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <button className="w-full py-4 border border-slate-100 text-midnight rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50">
              Change Password
            </button>
            <button className="w-full py-4 border border-rose-100 text-rose-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-50">
              Manage Roles
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'DASHBOARD': return renderDashboard();
      case 'SCAN': return renderScan();
      case 'EVENTS': return renderEvents();
      case 'BOOKINGS': return renderBookings();
      case 'INVENTORY': return renderInventory();
      case 'CUSTOMERS': return renderCustomers();
      case 'SETTINGS': return renderSettings();
      default: return renderDashboard();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      {/* Sidebar */}
      <aside className="w-[260px] bg-gradient-to-b from-[#1E1B2E] to-[#2A243F] text-white fixed h-full flex flex-col">
        <div className="p-8">
          <h2 className="text-2xl font-black tracking-tighter uppercase">FEJAY ADMIN</h2>
          <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em] mt-1">Luxury Lean System</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as AdminTab)}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className={`${activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}`}>
                {item.icon}
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-rose-400 hover:bg-rose-500/10 transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span className="text-[11px] font-black uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-[260px] flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <h2 className="text-sm font-black text-midnight uppercase tracking-widest">
              {menuItems.find(m => m.id === activeTab)?.label}
            </h2>
            <div className="h-4 w-px bg-slate-200"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ROLE: Super</span>
          </div>

          <div className="flex items-center space-x-8">
            <div className="relative">
              <Bell className="w-5 h-5 text-slate-400 cursor-pointer hover:text-indigo-600 transition-colors" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></div>
            </div>
            
            <div className="flex items-center space-x-4 group cursor-pointer">
              <div className="text-right">
                <p className="text-xs font-black text-midnight uppercase tracking-tight">{user.displayName}</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">System Admin</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform">
                👑
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-10 flex-1">
          {renderContent()}
        </div>

        {/* Footer */}
        <footer className="p-10 text-center">
          <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">
            FEJAY ADMIN © 2026 • LUXURY LEAN TECHNOLOGY
          </p>
        </footer>
      </main>
    </div>
  );
};

export default AdminDashboard;
