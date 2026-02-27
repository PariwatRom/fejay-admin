import React, { useState, useEffect } from 'react';
import { User, Event, Booking, Product, ScanHistory, ProductUnit, MaintenanceLog } from '../types';
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
  Smartphone,
  Trash2,
  Edit2,
  Activity,
  Heart,
  Battery,
  Wrench,
  History,
  TrendingUp
} from 'lucide-react';

interface AdminDashboardProps {
  user: User;
  events: Event[];
  bookings: Booking[];
  onCreateEvent: (event: Omit<Event, 'id' | 'booked'>) => void;
  onLogout: () => void;
}

type AdminTab = 'DASHBOARD' | 'SCAN' | 'EVENTS' | 'BOOKINGS' | 'INVENTORY' | 'CUSTOMERS' | 'SETTINGS' | 'EVALUATION';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, events, bookings, onCreateEvent, onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('DASHBOARD');
  const [isMobile, setIsMobile] = useState(false);
  
  // Modals State
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showScanModal, setShowScanModal] = useState(false);
  const [scannedBooking, setScannedBooking] = useState<Booking | null>(null);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<ProductUnit | null>(null);
  const [showAddMaintenanceModal, setShowAddMaintenanceModal] = useState(false);
  
  // Local Data State (Simulated for demo)
  const [localEvents, setLocalEvents] = useState<Event[]>(events);
  const [localBookings, setLocalBookings] = useState<Booking[]>(bookings);
  const [scanHistory, setScanHistory] = useState<ScanHistory[]>([
    { id: '1', timestamp: '2026-02-26 11:42:05', bookingId: 'BK-902134', customerName: 'Somchai R.', productName: 'S24 Ultra', status: 'RECEIVED', adminName: user.displayName },
  ]);
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'S23', brand: 'Samsung', price: 800, totalStock: 10, availableStock: 10, reservedStock: 0, inUseStock: 0, lowStockThreshold: 2, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400', description: 'Samsung S23', status: 'ACTIVE', lastUpdated: '2026-02-26', updatedBy: 'Admin' },
    { id: '2', name: 'S24', brand: 'Samsung', price: 1000, totalStock: 10, availableStock: 10, reservedStock: 0, inUseStock: 0, lowStockThreshold: 2, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400', description: 'Samsung S24', status: 'ACTIVE', lastUpdated: '2026-02-26', updatedBy: 'Admin' },
    { id: '3', name: 'S25', brand: 'Samsung', price: 1300, totalStock: 10, availableStock: 10, reservedStock: 0, inUseStock: 0, lowStockThreshold: 2, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400', description: 'Samsung S25', status: 'ACTIVE', lastUpdated: '2026-02-26', updatedBy: 'Admin' },
    { id: '4', name: 'X200P', brand: 'Vivo', price: 1100, totalStock: 10, availableStock: 10, reservedStock: 0, inUseStock: 0, lowStockThreshold: 2, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400', description: 'Vivo X200 Pro', status: 'ACTIVE', lastUpdated: '2026-02-26', updatedBy: 'Admin' },
    { id: '5', name: 'X200U', brand: 'Vivo', price: 1200, totalStock: 10, availableStock: 10, reservedStock: 0, inUseStock: 0, lowStockThreshold: 2, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400', description: 'Vivo X200 Ultra', status: 'ACTIVE', lastUpdated: '2026-02-26', updatedBy: 'Admin' },
    { id: '6', name: 'X300P', brand: 'Vivo', price: 1300, totalStock: 10, availableStock: 10, reservedStock: 0, inUseStock: 0, lowStockThreshold: 2, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400', description: 'Vivo X300 Pro', status: 'ACTIVE', lastUpdated: '2026-02-26', updatedBy: 'Admin' },
  ]);

  // Inventory Filter States
  const [inventoryFilters, setInventoryFilters] = useState({
    modelName: '',
    brand: '',
    minPrice: '',
    minStock: ''
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Evaluation & Maintenance State
  const [productUnits, setProductUnits] = useState<ProductUnit[]>([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceLog[]>([]);

  // Initialize Units for each product
  useEffect(() => {
    const initialUnits: ProductUnit[] = [];
    products.forEach(product => {
      for (let i = 1; i <= 10; i++) {
        const usageCount = Math.floor(Math.random() * 90); // Random usage for demo
        const batteryHealth = Math.max(0, 100 - (usageCount * 0.5));
        const conditionScore = (batteryHealth * 0.6) + (100 - usageCount * 0.4);
        
        let status: ProductUnit['maintenanceStatus'] = 'Excellent';
        if (conditionScore < 40) status = 'Maintenance Required';
        else if (conditionScore < 60) status = 'Warning';
        else if (conditionScore < 80) status = 'Good';

        initialUnits.push({
          id: `${product.id}-${i}`,
          productId: product.id,
          modelName: product.name,
          serialNumber: `${product.name}-${i.toString().padStart(2, '0')}`,
          usageCount,
          batteryHealth,
          conditionScore,
          maintenanceStatus: status,
          createdAt: '2026-01-01'
        });
      }
    });
    setProductUnits(initialUnits);
  }, []);

  const [maintenanceForm, setMaintenanceForm] = useState({
    issueType: 'Battery Replacement',
    description: '',
    repairCost: 0,
    repairDate: new Date().toISOString().split('T')[0],
    technician: user.displayName || 'Admin'
  });

  // Form States
  const [eventForm, setEventForm] = useState<Partial<Event>>({
    name: '', venue: '', date: '', time: '', capacity: 100, price: 900, status: 'OPEN', description: ''
  });
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '', brand: '', price: 0, totalStock: 0, lowStockThreshold: 5, description: '', status: 'ACTIVE'
  });
  const [receiverForm, setReceiverForm] = useState({
    name: '', phone: '', idCard: '', notes: ''
  });

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
    { id: 'EVALUATION', label: 'Evaluation ✨', icon: <Activity className="w-5 h-5" /> },
    { id: 'CUSTOMERS', label: 'Customers', icon: <Users className="w-5 h-5" /> },
    { id: 'SETTINGS', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  // Handlers
  const handleStartScan = () => {
    // Simulate scanning a random booking
    const randomBooking = localBookings[Math.floor(Math.random() * localBookings.length)];
    setScannedBooking(randomBooking);
    setReceiverForm({
      name: randomBooking.nickname,
      phone: randomBooking.phone,
      idCard: '',
      notes: ''
    });
    setShowScanModal(true);
  };

  const handleConfirmReceive = () => {
    if (!scannedBooking) return;

    // 1. Update Booking Status
    const updatedBookings = localBookings.map(b => 
      b.id === scannedBooking.id ? { 
        ...b, 
        status: 'RECEIVED' as const,
        receiverName: receiverForm.name,
        receiverPhone: receiverForm.phone,
        idCard: receiverForm.idCard,
        notes: receiverForm.notes,
        receiveDate: new Date().toLocaleString()
      } : b
    );
    setLocalBookings(updatedBookings);

    // 2. Deduct Stock Logic
    const modelName = scannedBooking.model;
    const updatedProducts = products.map(p => {
      if (p.name === modelName) {
        return {
          ...p,
          availableStock: p.availableStock - 1,
          inUseStock: p.inUseStock + 1,
          lastUpdated: new Date().toISOString().split('T')[0],
          updatedBy: user.displayName
        };
      }
      return p;
    });
    setProducts(updatedProducts);

    // 3. Log History
    const newHistory: ScanHistory = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      bookingId: scannedBooking.id,
      customerName: scannedBooking.nickname,
      productName: scannedBooking.model,
      status: 'RECEIVED',
      adminName: user.displayName
    };
    setScanHistory([newHistory, ...scanHistory]);

    setShowScanModal(false);
    setScannedBooking(null);
    alert('Equipment Received Successfully!');
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation: Event Name is required
    if (!eventForm.name) {
      alert('Please enter Event Name');
      return;
    }

    // Validation: Prices must be > 0
    const invalidPrice = eventForm.mobilePrices?.some(p => p.eventPrice <= 0);
    if (invalidPrice) {
      alert('Event Price must be greater than 0 for all models');
      return;
    }

    if (editingEvent) {
      setLocalEvents(localEvents.map(ev => ev.id === editingEvent.id ? { ...ev, ...eventForm } as Event : ev));
    } else {
      const newEv: Event = {
        ...eventForm,
        id: Date.now().toString(),
        booked: { s24u: 0, i15pm: 0 },
        stock: { s24u: 50, i15pm: 50 },
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800'
      } as Event;
      setLocalEvents([...localEvents, newEv]);
    }
    setShowEventModal(false);
    setEditingEvent(null);
    alert('Event Saved Successfully!');
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setLocalEvents(localEvents.filter(ev => ev.id !== id));
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productForm, lastUpdated: new Date().toISOString().split('T')[0], updatedBy: user.displayName } as Product : p));
    } else {
      const newProd: Product = {
        ...productForm,
        id: Date.now().toString(),
        availableStock: productForm.totalStock || 0,
        reservedStock: 0,
        inUseStock: 0,
        lastUpdated: new Date().toISOString().split('T')[0],
        updatedBy: user.displayName,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400'
      } as Product;
      setProducts([...products, newProd]);
    }
    setShowProductModal(false);
    setEditingProduct(null);
  };

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
            <button 
              onClick={handleStartScan}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
            >
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
            <button 
              onClick={() => setScanHistory([])}
              className="text-[10px] font-black text-indigo-600 uppercase tracking-widest"
            >
              Clear History
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-50">
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Booking ID</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {scanHistory.map((scan, i) => (
                  <tr key={scan.id} className="group">
                    <td className="py-4 text-xs font-bold text-slate-500">{scan.timestamp}</td>
                    <td className="py-4 text-xs font-black text-midnight">{scan.bookingId}</td>
                    <td className="py-4 text-xs font-bold text-slate-600">{scan.customerName}</td>
                    <td className="py-4 text-xs font-bold text-slate-600">{scan.productName}</td>
                    <td className={`py-4 text-[10px] font-black uppercase tracking-widest ${
                      scan.status === 'RECEIVED' ? 'text-emerald-500' : 'text-indigo-500'
                    }`}>{scan.status}</td>
                  </tr>
                ))}
                {scanHistory.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">No scan history</td>
                  </tr>
                )}
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
            {localEvents.length} Active
          </span>
        </div>
        <button 
          onClick={() => {
            setEditingEvent(null);
            // Initialize mobile prices from current stock
            const initialPrices = products
              .filter(p => p.availableStock > 0)
              .map(p => ({
                productId: p.id,
                modelName: p.name,
                eventPrice: p.price
              }));
            
            setEventForm({ 
              name: '', 
              venue: '', 
              date: '', 
              time: '', 
              capacity: 100, 
              price: 900, 
              status: 'OPEN', 
              description: '',
              mobilePrices: initialPrices
            });
            setShowEventModal(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-2 transition-all shadow-lg shadow-indigo-200"
        >
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
              {localEvents.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        <img src={ev.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-midnight uppercase tracking-tight line-clamp-1">{ev.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{ev.venue || ev.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="text-xs font-bold text-slate-600">{ev.date}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{ev.time || '09:00 AM'}</p>
                  </td>
                  <td className="p-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        Booked: {ev.booked.s24u + ev.booked.i15pm} / {ev.capacity || (ev.stock.s24u + ev.stock.i15pm)}
                      </p>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500" 
                          style={{ width: `${((ev.booked.s24u + ev.booked.i15pm) / (ev.capacity || (ev.stock.s24u + ev.stock.i15pm))) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="text-xs font-black text-indigo-600">฿{ev.price || 900}</p>
                  </td>
                  <td className="p-6">
                    <button 
                      onClick={() => {
                        const newStatus = ev.status === 'OPEN' ? 'CLOSED' : 'OPEN';
                        setLocalEvents(localEvents.map(e => e.id === ev.id ? { ...e, status: newStatus as any } : e));
                      }}
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                        ev.status === 'OPEN' ? 'bg-emerald-50 text-emerald-500' : 
                        ev.status === 'CLOSED' ? 'bg-rose-50 text-rose-500' : 
                        'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {ev.status || (ev.soldOut ? 'CLOSED' : 'OPEN')}
                    </button>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => {
                          setEditingEvent(ev);
                          setEventForm({ ...ev });
                          setShowEventModal(true);
                        }}
                        className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteEvent(ev.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
              {localBookings.map((booking) => (
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
                      booking.status === 'RECEIVED' ? 'bg-emerald-50 text-emerald-500' : 
                      booking.status === 'PICKED_UP' ? 'bg-blue-50 text-blue-500' : 
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

  const renderInventory = () => {
    const filteredProducts = products.filter(p => {
      const matchName = p.name.toLowerCase().includes(inventoryFilters.modelName.toLowerCase());
      const matchBrand = p.brand.toLowerCase().includes(inventoryFilters.brand.toLowerCase());
      const matchPrice = inventoryFilters.minPrice === '' || p.price >= parseFloat(inventoryFilters.minPrice);
      const matchStock = inventoryFilters.minStock === '' || p.availableStock >= parseInt(inventoryFilters.minStock);
      return matchName && matchBrand && matchPrice && matchStock;
    });

    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-midnight uppercase tracking-tight">Inventory Management</h2>
            <p className="text-slate-400 font-medium text-sm">Manage your mobile stock and pricing</p>
          </div>
          <button 
            onClick={() => {
              setEditingProduct(null);
              setProductForm({ name: '', brand: '', price: 0, totalStock: 0, lowStockThreshold: 5, description: '', status: 'ACTIVE' });
              setImagePreview(null);
              setShowProductModal(true);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center space-x-2 transition-all shadow-xl shadow-indigo-100"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Filter System */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-black text-midnight uppercase tracking-widest">Filter Products</h3>
          </div>
          <div className="grid grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Model Name</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input 
                  type="text" 
                  placeholder="Search model..." 
                  value={inventoryFilters.modelName}
                  onChange={e => setInventoryFilters({...inventoryFilters, modelName: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Brand</label>
              <input 
                type="text" 
                placeholder="Search brand..." 
                value={inventoryFilters.brand}
                onChange={e => setInventoryFilters({...inventoryFilters, brand: e.target.value})}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Min Price</label>
              <input 
                type="number" 
                placeholder="Min price..." 
                value={inventoryFilters.minPrice}
                onChange={e => setInventoryFilters({...inventoryFilters, minPrice: e.target.value})}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Min Stock</label>
              <input 
                type="number" 
                placeholder="Min stock..." 
                value={inventoryFilters.minStock}
                onChange={e => setInventoryFilters({...inventoryFilters, minStock: e.target.value})}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-[32px] border border-slate-100 overflow-hidden group hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 flex flex-col">
              <div className="relative aspect-square overflow-hidden bg-slate-50">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                    product.status === 'ACTIVE' ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-white'
                  }`}>
                    {product.status}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                <div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">{product.brand}</p>
                  <h3 className="text-lg font-black text-midnight uppercase tracking-tight leading-tight">{product.name}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Price</p>
                    <p className="text-sm font-black text-midnight">฿{product.price.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Stock</p>
                    <p className={`text-sm font-black ${product.availableStock <= product.lowStockThreshold ? 'text-rose-500' : 'text-midnight'}`}>
                      {product.availableStock}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-auto">
                  <button 
                    onClick={() => {
                      setEditingProduct(product);
                      setProductForm(product);
                      setImagePreview(product.image);
                      setShowProductModal(true);
                    }}
                    className="w-full py-3 bg-slate-50 hover:bg-indigo-600 hover:text-white text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center space-x-2"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit Product</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-midnight uppercase tracking-tight">No products found</h3>
            <p className="text-slate-400 font-medium">Try adjusting your filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    );
  };

  const handleSaveMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUnit) return;

    const newLog: MaintenanceLog = {
      id: Date.now().toString(),
      unitId: selectedUnit.id,
      ...maintenanceForm,
      createdAt: new Date().toISOString()
    };

    setMaintenanceLogs([newLog, ...maintenanceLogs]);

    // Update unit health if battery was replaced
    if (maintenanceForm.issueType === 'Battery Replacement') {
      const updatedUnits = productUnits.map(u => {
        if (u.id === selectedUnit.id) {
          const newBatteryHealth = 100;
          const newConditionScore = (newBatteryHealth * 0.6) + (100 - u.usageCount * 0.4);
          
          let status: ProductUnit['maintenanceStatus'] = 'Excellent';
          if (newConditionScore < 40) status = 'Maintenance Required';
          else if (newConditionScore < 60) status = 'Warning';
          else if (newConditionScore < 80) status = 'Good';

          return {
            ...u,
            batteryHealth: newBatteryHealth,
            conditionScore: newConditionScore,
            maintenanceStatus: status,
            lastMaintenance: maintenanceForm.repairDate
          };
        }
        return u;
      });
      setProductUnits(updatedUnits);
      // Update selected unit for the modal
      const updatedSelected = updatedUnits.find(u => u.id === selectedUnit.id);
      if (updatedSelected) setSelectedUnit(updatedSelected);
    }

    setShowAddMaintenanceModal(false);
    alert('Maintenance Record Added Successfully!');
  };

  const renderEvaluation = () => {
    const stats = {
      total: productUnits.length,
      excellent: productUnits.filter(u => u.maintenanceStatus === 'Excellent').length,
      maintenance: productUnits.filter(u => u.maintenanceStatus === 'Maintenance Required').length,
      avgBattery: Math.round(productUnits.reduce((acc, u) => acc + u.batteryHealth, 0) / productUnits.length)
    };

    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-midnight uppercase tracking-tight">Mobile Evaluation</h2>
            <p className="text-slate-400 font-medium text-sm">Monitor device health and maintenance cycles</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-6">
          {[
            { label: 'Total Devices', value: stats.total, icon: <Smartphone className="w-5 h-5" />, color: 'bg-indigo-50 text-indigo-600' },
            { label: 'Excellent Condition', value: stats.excellent, icon: <ShieldCheck className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600' },
            { label: 'Need Maintenance', value: stats.maintenance, icon: <AlertTriangle className="w-5 h-5" />, color: 'bg-rose-50 text-rose-600' },
            { label: 'Avg Battery Health', value: `${stats.avgBattery}%`, icon: <Battery className="w-5 h-5" />, color: 'bg-amber-50 text-amber-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-xl font-black text-midnight">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Units Table */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 text-left">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Serial Number</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Model</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Used (Times)</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Battery Health</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Condition Score</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {productUnits.map(unit => (
                <tr key={unit.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-6">
                    <p className="text-xs font-black text-midnight uppercase tracking-tight">{unit.serialNumber}</p>
                  </td>
                  <td className="p-6 text-xs font-bold text-slate-600">{unit.modelName}</td>
                  <td className="p-6 text-xs font-black text-midnight text-center">{unit.usageCount}</td>
                  <td className="p-6">
                    <div className="space-y-2 w-32">
                      <div className="flex justify-between text-[8px] font-black uppercase tracking-widest">
                        <span className="text-slate-400">Health</span>
                        <span className={unit.batteryHealth < 70 ? 'text-rose-500' : 'text-emerald-500'}>{Math.round(unit.batteryHealth)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${unit.batteryHealth < 70 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                          style={{ width: `${unit.batteryHealth}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className={`w-3 h-3 ${unit.conditionScore < 60 ? 'text-rose-500' : 'text-emerald-500'}`} />
                      <span className="text-xs font-black text-midnight">{Math.round(unit.conditionScore)}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                      unit.maintenanceStatus === 'Excellent' ? 'bg-emerald-50 text-emerald-600' :
                      unit.maintenanceStatus === 'Good' ? 'bg-blue-50 text-blue-600' :
                      unit.maintenanceStatus === 'Warning' ? 'bg-amber-50 text-amber-600' :
                      'bg-rose-50 text-rose-600'
                    }`}>
                      {unit.maintenanceStatus}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button 
                      onClick={() => {
                        setSelectedUnit(unit);
                        setShowMaintenanceModal(true);
                      }}
                      className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      <Wrench className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

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

        {/* SCAN MODAL */}
        {showScanModal && scannedBooking && (
          <div className="fixed inset-0 bg-midnight/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl p-10 animate-slideDown max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-midnight uppercase tracking-tight">Equipment Receiving</h3>
                <button onClick={() => setShowScanModal(false)} className="text-slate-400 hover:text-midnight transition-colors"><XCircle className="w-6 h-6" /></button>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="bg-indigo-50 p-6 rounded-3xl space-y-4">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Booking Details</p>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-500">Customer: <span className="text-midnight">{scannedBooking.nickname}</span></p>
                    <p className="text-xs font-bold text-slate-500">Model: <span className="text-indigo-600">{scannedBooking.model}</span></p>
                    <p className="text-xs font-bold text-slate-500">Status: <span className="text-amber-600">{scannedBooking.status}</span></p>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory Status</p>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-500">Available: <span className="text-midnight">{products.find(p => p.name === scannedBooking.model)?.availableStock}</span></p>
                    <p className="text-xs font-bold text-slate-500">Total: <span className="text-midnight">{products.find(p => p.name === scannedBooking.model)?.totalStock}</span></p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-sm font-black text-midnight uppercase tracking-widest">Receiver Information</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Receiver Name</label>
                    <input type="text" value={receiverForm.name} onChange={e => setReceiverForm({...receiverForm, name: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-indigo-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <input type="text" value={receiverForm.phone} onChange={e => setReceiverForm({...receiverForm, phone: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-indigo-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ID Card Number</label>
                    <input type="text" value={receiverForm.idCard} onChange={e => setReceiverForm({...receiverForm, idCard: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-indigo-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Receive Date</label>
                    <input type="text" value={new Date().toLocaleDateString()} readOnly className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Notes</label>
                  <textarea value={receiverForm.notes} onChange={e => setReceiverForm({...receiverForm, notes: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-indigo-600 h-24" />
                </div>
              </div>

              <div className="flex space-x-4 mt-10">
                <button onClick={() => setShowScanModal(false)} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
                <button onClick={handleConfirmReceive} className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all">Confirm Receive</button>
              </div>
            </div>
          </div>
        )}

        {/* EVENT MODAL */}
        {showEventModal && (
          <div className="fixed inset-0 bg-midnight/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl p-10 animate-slideDown max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-midnight uppercase tracking-tight">
                  {editingEvent ? 'Edit Event' : 'Add New Event'}
                </h3>
                <button onClick={() => setShowEventModal(false)} className="text-slate-400 hover:text-midnight transition-colors">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveEvent} className="space-y-10">
                {/* 1. ส่วนข้อมูล Event */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Event Information</h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Name</label>
                      <input required type="text" value={eventForm.name} onChange={e => setEventForm({...eventForm, name: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-indigo-600" placeholder="Enter event name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Poster</label>
                      <input type="file" className="w-full px-6 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Date</label>
                      <input required type="date" value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-indigo-600" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Time</label>
                      <input required type="time" value={eventForm.time} onChange={e => setEventForm({...eventForm, time: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-indigo-600" />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                      <input required type="text" value={eventForm.venue} onChange={e => setEventForm({...eventForm, venue: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-indigo-600" placeholder="Enter location" />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                      <textarea value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-indigo-600 h-24" placeholder="Enter event description" />
                    </div>
                  </div>
                </div>

                {/* 2. ส่วนเลือกมือถือจากสต็อก */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Mobile Stock & Pricing</h4>
                  </div>

                  <div className="bg-white border border-slate-100 rounded-[24px] overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50/50 text-left">
                          <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">รุ่นมือถือ</th>
                          <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">จำนวนคงเหลือ</th>
                          <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">ราคาปกติ</th>
                          <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">ราคาสำหรับงานนี้</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {eventForm.mobilePrices?.map((mp, index) => {
                          const product = products.find(p => p.id === mp.productId);
                          if (!product) return null;
                          return (
                            <tr key={mp.productId}>
                              <td className="p-5 text-xs font-black text-midnight uppercase tracking-tight">{mp.modelName}</td>
                              <td className="p-5 text-xs font-bold text-slate-500">{product.availableStock}</td>
                              <td className="p-5 text-xs font-bold text-slate-400">฿{product.price.toLocaleString()}</td>
                              <td className="p-5">
                                <div className="relative">
                                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-indigo-400">฿</span>
                                  <input 
                                    type="number" 
                                    value={mp.eventPrice === 0 ? '' : mp.eventPrice} 
                                    onChange={e => {
                                      const val = e.target.value;
                                      const newPrices = [...(eventForm.mobilePrices || [])];
                                      newPrices[index].eventPrice = val === '' ? 0 : parseFloat(val);
                                      setEventForm({...eventForm, mobilePrices: newPrices});
                                    }}
                                    placeholder="0"
                                    className="w-full pl-8 pr-4 py-2 bg-indigo-50/50 border border-indigo-100 rounded-xl text-xs font-black text-indigo-600 focus:outline-none focus:border-indigo-600"
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                        {(!eventForm.mobilePrices || eventForm.mobilePrices.length === 0) && (
                          <tr>
                            <td colSpan={4} className="p-10 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                              No available stock to display
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button type="button" onClick={() => setShowEventModal(false)} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
                  <button type="submit" className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all">SAVE EVENT</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* PRODUCT MODAL */}
        {showProductModal && (
          <div className="fixed inset-0 bg-midnight/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl p-10 animate-slideDown max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-midnight uppercase tracking-tight">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button onClick={() => setShowProductModal(false)} className="text-slate-400 hover:text-midnight transition-colors">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-8">
                {/* Image Upload Section */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Image</label>
                  <div className="flex items-start space-x-6">
                    <div className="w-32 h-32 bg-slate-50 rounded-[24px] border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group relative">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-4">
                          <Plus className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Upload</p>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 2 * 1024 * 1024) {
                              alert('File size must be less than 2MB');
                              return;
                            }
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const base64 = reader.result as string;
                              setImagePreview(base64);
                              setProductForm({...productForm, image: base64});
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-[10px] font-bold text-slate-400">Allowed: JPG, PNG, JPEG</p>
                      <p className="text-[10px] font-bold text-slate-400">Max Size: 2MB</p>
                      <p className="text-[10px] font-medium text-slate-300 italic">Preview will appear on the left after selection</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Model Name</label>
                    <input required type="text" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-indigo-600" placeholder="e.g. S25" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Brand</label>
                    <input required type="text" value={productForm.brand} onChange={e => setProductForm({...productForm, brand: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-indigo-600" placeholder="e.g. Samsung" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price (THB)</label>
                    <input required type="number" value={productForm.price === 0 ? '' : productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value === '' ? 0 : parseFloat(e.target.value)})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-indigo-600" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Total Stock</label>
                    <input required type="number" value={productForm.totalStock === 0 ? '' : productForm.totalStock} onChange={e => setProductForm({...productForm, totalStock: e.target.value === '' ? 0 : parseInt(e.target.value)})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-indigo-600" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Low Stock Threshold</label>
                    <input required type="number" value={productForm.lowStockThreshold === 0 ? '' : productForm.lowStockThreshold} onChange={e => setProductForm({...productForm, lowStockThreshold: e.target.value === '' ? 0 : parseInt(e.target.value)})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-indigo-600" placeholder="5" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
                    <select value={productForm.status} onChange={e => setProductForm({...productForm, status: e.target.value as any})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-indigo-600">
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-indigo-600 h-24" placeholder="Enter product description..." />
                </div>
                <div className="flex space-x-4 pt-4">
                  <button type="button" onClick={() => setShowProductModal(false)} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
                  <button type="submit" className="flex-1 py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transition-all">SAVE PRODUCT</button>
                </div>
              </form>
            </div>
          </div>
        )}

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
