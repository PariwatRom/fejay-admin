import React from 'react';
import { AppView, User, UserRole } from '../types';
import { LayoutDashboard, Calendar, Settings, QrCode, Smartphone, User as UserIcon, LogOut, History } from 'lucide-react';

interface NavigationProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  user: User | null;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, user, onLogout }) => {
  if (!user) return null;

  const isUser = user.role === UserRole.USER;
  const isAdmin = user.role === UserRole.ADMIN;
  const isStaff = user.role === UserRole.STAFF;
  const isFinance = user.role === UserRole.FINANCE;

  // Bottom Nav for Users
  if (isUser) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-8 py-4 flex justify-around items-center z-40 max-w-md mx-auto">
        <button 
          onClick={() => onNavigate(AppView.EVENTS)} 
          className={`flex flex-col items-center space-y-1 transition-all ${currentView === AppView.EVENTS || currentView === AppView.MODELS || currentView === AppView.SUMMARY || currentView === AppView.CUSTOMER_FORM ? 'text-indigo-600' : 'text-slate-300'}`}
        >
          <Smartphone className="w-6 h-6" />
          <span className="text-[8px] font-black uppercase tracking-widest">การจอง</span>
        </button>
        <button 
          onClick={() => onNavigate(AppView.CHECK_QUEUE)} 
          className={`flex flex-col items-center space-y-1 transition-all ${currentView === AppView.CHECK_QUEUE ? 'text-indigo-600' : 'text-slate-300'}`}
        >
          <QrCode className="w-6 h-6" />
          <span className="text-[8px] font-black uppercase tracking-widest">เช็คคิว</span>
        </button>
        <button 
          onClick={() => onNavigate(AppView.PROFILE)} 
          className={`flex flex-col items-center space-y-1 transition-all ${currentView === AppView.PROFILE ? 'text-indigo-600' : 'text-slate-300'}`}
        >
          <UserIcon className="w-6 h-6" />
          <span className="text-[8px] font-black uppercase tracking-widest">โปรไฟล์</span>
        </button>
      </nav>
    );
  }

  // Management Navigation (Admin / Staff / Finance)
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-midnight text-white px-8 py-6 flex justify-around items-center z-40 max-w-md mx-auto rounded-t-[40px] shadow-2xl">
      {isAdmin && (
        <button 
          onClick={() => onNavigate(AppView.ADMIN_DASHBOARD)} 
          className={`flex flex-col items-center space-y-1 transition-all ${currentView === AppView.ADMIN_DASHBOARD ? 'text-indigo-400' : 'text-slate-500'}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[8px] font-black uppercase tracking-widest">Admin</span>
        </button>
      )}
      
      {isStaff && (
        <button 
          onClick={() => onNavigate(AppView.STAFF_DASHBOARD)} 
          className={`flex flex-col items-center space-y-1 transition-all ${currentView === AppView.STAFF_DASHBOARD ? 'text-indigo-400' : 'text-slate-500'}`}
        >
          <QrCode className="w-5 h-5" />
          <span className="text-[8px] font-black uppercase tracking-widest">Staff Member</span>
        </button>
      )}

      {isFinance && (
        <button 
          onClick={() => onNavigate(AppView.FINANCE_DASHBOARD)} 
          className={`flex flex-col items-center space-y-1 transition-all ${currentView === AppView.FINANCE_DASHBOARD ? 'text-emerald-400' : 'text-slate-500'}`}
        >
          <History className="w-5 h-5" />
          <span className="text-[8px] font-black uppercase tracking-widest">Finance</span>
        </button>
      )}

      <button 
        onClick={() => onNavigate(AppView.PROFILE)} 
        className={`flex flex-col items-center space-y-1 transition-all ${currentView === AppView.PROFILE ? 'text-indigo-400' : 'text-slate-500'}`}
      >
        <UserIcon className="w-5 h-5" />
        <span className="text-[8px] font-black uppercase tracking-widest">Profile</span>
      </button>

      <button 
        onClick={onLogout} 
        className="flex flex-col items-center space-y-1 text-rose-500 hover:text-rose-400 transition-all"
      >
        <LogOut className="w-5 h-5" />
        <span className="text-[8px] font-black uppercase tracking-widest">Logout</span>
      </button>
    </nav>
  );
};

export default Navigation;
