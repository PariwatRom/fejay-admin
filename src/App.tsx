import React, { useState, useEffect } from 'react';
import { AppView, Event, DeviceModel, DeviceUnit, BookingResponse, User, UserRole, Booking } from './types';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Toast, { ToastMessage } from './components/Toast';
import { apiGetUnits } from './mockApi';

// Pages
import Events from './pages/Events';
import Models from './pages/Models';
import BookingSummary from './pages/BookingSummary';
import CustomerForm from './pages/CustomerForm';
import Payment from './pages/Payment';
import Success from './pages/Success';
import CheckQueue from './pages/CheckQueue';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import FinanceDashboard from './pages/FinanceDashboard';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);
  const [history, setHistory] = useState<AppView[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Global Management State
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      name: '[FRI] RISER CONCERT : THE...',
      location: 'Impact Arena',
      date: 'ศุกร์ 13 กุมภาพันธ์ 2569',
      image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=600',
      stock: { s24u: 20, i15pm: 20 },
      booked: { s24u: 20, i15pm: 20 },
      soldOut: true
    },
    {
      id: '2',
      name: 'SMTOWN LIVE 2025-26 in BANGKOK',
      location: 'Rajamangala Stadium',
      date: 'เสาร์ 14 กุมภาพันธ์ 2569',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600',
      stock: { s24u: 50, i15pm: 50 },
      booked: { s24u: 10, i15pm: 15 }
    },
    {
      id: '3',
      name: '[SAT] RISER CONCERT : THE...',
      location: 'Impact Arena',
      date: 'เสาร์ 14 กุมภาพันธ์ 2569',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600',
      stock: { s24u: 20, i15pm: 20 },
      booked: { s24u: 5, i15pm: 2 }
    },
    {
      id: '4',
      name: '[SAT] 2026 G-DRAGON FAM...',
      location: 'Thunder Dome',
      date: 'เสาร์ 21 กุมภาพันธ์ 2569',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600',
      stock: { s24u: 30, i15pm: 30 },
      booked: { s24u: 30, i15pm: 30 },
      soldOut: true
    },
    {
      id: '5',
      name: '[SUN] 2026 G-DRAGON FAM...',
      location: 'Thunder Dome',
      date: 'อาทิตย์ 22 กุมภาพันธ์ 2569',
      image: 'https://images.unsplash.com/photo-1514525253361-bee8718a7439?auto=format&fit=crop&q=80&w=600',
      stock: { s24u: 30, i15pm: 30 },
      booked: { s24u: 12, i15pm: 8 }
    },
    {
      id: '6',
      name: '[SAT] MARK TUAN...',
      location: 'Impact Exhibition Hall',
      date: 'เสาร์ 28 กุมภาพันธ์ 2569',
      image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=600',
      stock: { s24u: 40, i15pm: 40 },
      booked: { s24u: 5, i15pm: 5 }
    }
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    { id: 'BK-001', nickname: 'Jib', phone: '0812345678', model: 'S24 Ultra', eventId: '1', eventName: 'GRAND OPENING', status: 'PENDING', timestamp: '2024-02-25 10:00' },
    { id: 'BK-002', nickname: 'Non', phone: '0898765432', model: 'iPhone 15 Pro Max', eventId: '1', eventName: 'GRAND OPENING', status: 'PICKED_UP', timestamp: '2024-02-25 11:30' }
  ]);

  // Selection State (Customer View)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedModel, setSelectedModel] = useState<DeviceModel | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<DeviceUnit | null>(null);
  const [paymentType, setPaymentType] = useState<'DEPOSIT' | 'FULL'>('DEPOSIT');
  const [bookingResponse, setBookingResponse] = useState<BookingResponse | null>(null);

  // Load user from session storage
  useEffect(() => {
    const savedUser = sessionStorage.getItem('fejay_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      // If logged in, go to their dashboard
      if (parsedUser.role === UserRole.ADMIN) {
        setCurrentView(AppView.ADMIN_DASHBOARD);
      } else if (parsedUser.role === UserRole.STAFF) {
        setCurrentView(AppView.STAFF_DASHBOARD);
      } else if (parsedUser.role === UserRole.FINANCE) {
        setCurrentView(AppView.FINANCE_DASHBOARD);
      } else if (parsedUser.role === UserRole.USER) {
        setCurrentView(AppView.EVENTS);
      } else {
        setCurrentView(AppView.EVENTS);
      }
    } else {
      setCurrentView(AppView.LOGIN);
    }
  }, []);

  const addToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateTo = (view: AppView, back: boolean = false) => {
    if (!back) {
      setHistory(prev => [...prev, currentView]);
    }
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentView(prev);
    } else {
      setCurrentView(user ? AppView.EVENTS : AppView.LOGIN);
    }
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    sessionStorage.setItem('fejay_user', JSON.stringify(loggedInUser));
    addToast(`Welcome back, ${loggedInUser.displayName}`);
    if (loggedInUser.role === UserRole.ADMIN) {
      navigateTo(AppView.ADMIN_DASHBOARD);
    } else if (loggedInUser.role === UserRole.STAFF) {
      navigateTo(AppView.STAFF_DASHBOARD);
    } else if (loggedInUser.role === UserRole.FINANCE) {
      navigateTo(AppView.FINANCE_DASHBOARD);
    } else if (loggedInUser.role === UserRole.USER) {
      navigateTo(AppView.EVENTS);
    } else {
      navigateTo(AppView.EVENTS);
    }
  };

  const handleSignup = (role: UserRole) => {
    addToast('Account created! Please log in.');
    navigateTo(AppView.LOGIN);
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('fejay_user');
    addToast('Logged out successfully', 'info');
    navigateTo(AppView.LOGIN);
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setUser(updatedUser);
    sessionStorage.setItem('fejay_user', JSON.stringify(updatedUser));
    addToast('Profile updated successfully');
    goBack();
  };

  const handleCreateEvent = (eventData: Omit<Event, 'id' | 'booked'>) => {
    const newEvent: Event = {
      ...eventData,
      id: (events.length + 1).toString(),
      booked: { s24u: 0, i15pm: 0 }
    };
    setEvents(prev => [newEvent, ...prev]);
    addToast('Event created successfully');
  };

  const handleUpdateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    addToast(`Booking ${id} updated to ${status}`);
  };

  // --- Handlers ---
  
  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    navigateTo(AppView.MODELS);
  };

  const handleModelSelect = async (model: DeviceModel) => {
    setSelectedModel(model);
    
    try {
        const units = await apiGetUnits(selectedEvent?.id || '', model.id);
        const availableUnit = units.find(u => u.status === 'AVAILABLE');
        
        if (availableUnit) {
            setSelectedUnit(availableUnit);
            navigateTo(AppView.SUMMARY);
        } else {
            alert('ขออภัย ไม่มีเครื่องว่างในขณะนี้');
        }
    } catch (e) {
        console.error("Error fetching units", e);
    }
  };

  const handleSummaryConfirm = (type: 'DEPOSIT' | 'FULL') => {
    setPaymentType(type);
    navigateTo(AppView.CUSTOMER_FORM);
  };

  const handleBookingCreated = (response: BookingResponse) => {
    setBookingResponse(response);
    
    try {
      const savedTickets = localStorage.getItem('fejay_my_tickets');
      const tickets: BookingResponse[] = savedTickets ? JSON.parse(savedTickets) : [];
      tickets.unshift(response); 
      localStorage.setItem('fejay_my_tickets', JSON.stringify(tickets));
    } catch (error) {
      console.error("Failed to save ticket", error);
    }

    navigateTo(AppView.PAYMENT);
  };

  const handlePaymentComplete = () => {
    if (bookingResponse) {
       try {
        const savedTickets = localStorage.getItem('fejay_my_tickets');
        if (savedTickets) {
            const tickets: BookingResponse[] = JSON.parse(savedTickets);
            const updatedTickets = tickets.map(t => 
                t.bookingId === bookingResponse.bookingId ? { ...t, status: 'PAID' as const, remainingAmount: 0, paidAmount: t.totalPrice } : t
            );
            localStorage.setItem('fejay_my_tickets', JSON.stringify(updatedTickets));
        }
       } catch (e) { console.error(e); }
    }
    navigateTo(AppView.SUCCESS);
  };

  // --- Render ---

  const renderView = () => {
    if (!user && currentView !== AppView.LOGIN && currentView !== AppView.SIGNUP) {
      return <Login onLogin={handleLogin} onGoToSignup={() => navigateTo(AppView.SIGNUP)} />;
    }

    switch (currentView) {
      case AppView.EVENTS:
        return <Events onSelect={handleEventSelect} />;
        
      case AppView.MODELS:
        return <Models event={selectedEvent!} onSelect={handleModelSelect} />;
        
      case AppView.SUMMARY:
        return (
          <BookingSummary 
            event={selectedEvent!} 
            model={selectedModel!} 
            unit={selectedUnit!} 
            onConfirm={handleSummaryConfirm} 
          />
        );
        
      case AppView.CUSTOMER_FORM:
        return (
          <CustomerForm 
            eventId={selectedEvent!.id}
            modelId={selectedModel!.id}
            unitId={selectedUnit!.id}
            paymentType={paymentType}
            onSuccess={handleBookingCreated}
            onBack={goBack}
          />
        );

      case AppView.PAYMENT:
        return <Payment booking={bookingResponse!} onComplete={handlePaymentComplete} />;
        
      case AppView.SUCCESS:
        return <Success bookingId={bookingResponse?.bookingId || ''} onFinish={() => navigateTo(AppView.EVENTS)} />;
        
      case AppView.CHECK_QUEUE:
        return <CheckQueue bookings={bookings} events={events} />;

      case AppView.LOGIN:
        return <Login onLogin={handleLogin} onGoToSignup={() => navigateTo(AppView.SIGNUP)} />;

      case AppView.SIGNUP:
        return <Signup onSignup={handleSignup} onBackToLogin={() => navigateTo(AppView.LOGIN)} />;

      case AppView.ADMIN_DASHBOARD:
        return user?.role === UserRole.ADMIN ? (
          <AdminDashboard 
            user={user} 
            events={events} 
            bookings={bookings} 
            onCreateEvent={handleCreateEvent} 
          />
        ) : <Login onLogin={handleLogin} onGoToSignup={() => navigateTo(AppView.SIGNUP)} />;

      case AppView.STAFF_DASHBOARD:
        return user?.role === UserRole.STAFF ? (
          <StaffDashboard 
            user={user} 
            bookings={bookings} 
            onUpdateBookingStatus={handleUpdateBookingStatus} 
          />
        ) : <Login onLogin={handleLogin} onGoToSignup={() => navigateTo(AppView.SIGNUP)} />;

      case AppView.FINANCE_DASHBOARD:
        return user?.role === UserRole.FINANCE ? (
          <FinanceDashboard 
            user={user} 
            bookings={bookings} 
          />
        ) : <Login onLogin={handleLogin} onGoToSignup={() => navigateTo(AppView.SIGNUP)} />;

      case AppView.PROFILE:
        return user ? <Profile user={user} onUpdate={handleUpdateProfile} onLogout={handleLogout} /> : <Login onLogin={handleLogin} onGoToSignup={() => navigateTo(AppView.SIGNUP)} />;
        
      default:
        return <Events onSelect={handleEventSelect} />;
    }
  };

  const getHeaderTitle = () => {
    switch(currentView) {
      case AppView.EVENTS: return "FEJAY TECH";
      case AppView.MODELS: return "Select Model";
      case AppView.SUMMARY: return "Summary";
      case AppView.CUSTOMER_FORM: return "Customer Info";
      case AppView.PAYMENT: return "Payment";
      case AppView.SUCCESS: return "Completed";
      case AppView.CHECK_QUEUE: return "Check Queue";
      case AppView.LOGIN: return "Sign In";
      case AppView.SIGNUP: return "Join Team";
      case AppView.ADMIN_DASHBOARD: return "Admin Panel";
      case AppView.STAFF_DASHBOARD: return "Staff Panel";
      case AppView.FINANCE_DASHBOARD: return "Finance Panel";
      case AppView.PROFILE: return "Profile";
      default: return "FEJAY";
    }
  };

  const isWideLayout = user?.role === UserRole.ADMIN && currentView === AppView.ADMIN_DASHBOARD;

  if (currentView === AppView.ADMIN_DASHBOARD && user?.role === UserRole.ADMIN) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] font-kanit">
        <Toast toasts={toasts} onRemove={removeToast} />
        <AdminDashboard 
          user={user} 
          events={events} 
          bookings={bookings} 
          onCreateEvent={handleCreateEvent} 
          onLogout={handleLogout}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-24 mx-auto relative bg-tech-bg shadow-2xl overflow-hidden border-x border-slate-100 font-kanit transition-all duration-500 ${isWideLayout ? 'max-w-none w-full' : 'max-w-md'}`}>
      <Toast toasts={toasts} onRemove={removeToast} />
      <Header 
        onBack={currentView !== AppView.EVENTS && currentView !== AppView.CHECK_QUEUE && currentView !== AppView.SUCCESS && currentView !== AppView.ADMIN_DASHBOARD && currentView !== AppView.STAFF_DASHBOARD && currentView !== AppView.FINANCE_DASHBOARD && currentView !== AppView.LOGIN ? goBack : undefined} 
        title={getHeaderTitle()} 
        onProfileClick={() => navigateTo(AppView.PROFILE)}
        user={user}
      />
      <main className={`px-5 pt-6 ${isWideLayout ? 'max-w-7xl mx-auto' : ''}`}>
        {renderView()}
      </main>
      {currentView !== AppView.SUCCESS && currentView !== AppView.PAYMENT && currentView !== AppView.LOGIN && currentView !== AppView.SIGNUP && (
        <Navigation 
          currentView={currentView} 
          onNavigate={navigateTo} 
          user={user} 
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default App;
