import React from 'react';
import { AppView, User, UserRole } from '../types';

interface NavigationProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  user: User | null;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, user, onLogout }) => {
  const isCheckView = currentView === AppView.CHECK_QUEUE || currentView === AppView.QUEUE_DETAIL;
  const isAdminView = currentView === AppView.ADMIN_DASHBOARD;
  const isStaffView = currentView === AppView.STAFF_DASHBOARD;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-50 flex justify-around py-4 px-2 z-50 rounded-t-[40px] shadow-[0_-20px_40px_rgba(0,0,0,0.03)]">
      <button 
        onClick={() => onNavigate(AppView.EVENTS)} 
        className={`flex flex-col items-center flex-1 transition-all ${currentView === AppView.EVENTS || currentView === AppView.DEVICES || currentView === AppView.MODELS ? 'text-primary' : 'text-slate-300'}`}
      >
        <span className="text-xl mb-1">🏠</span>
        <span className="text-[8px] font-black uppercase tracking-widest">HOME</span>
      </button>

      <button 
        onClick={() => onNavigate(AppView.CHECK_QUEUE)} 
        className={`flex flex-col items-center flex-1 transition-all ${isCheckView ? 'text-primary' : 'text-slate-300'}`}
      >
        <span className="text-xl mb-1">🔍</span>
        <span className="text-[8px] font-black uppercase tracking-widest">QUEUE</span>
      </button>

      {user ? (
        <>
          {user.role === UserRole.ADMIN && (
            <button 
              onClick={() => onNavigate(AppView.ADMIN_DASHBOARD)} 
              className={`flex flex-col items-center flex-1 transition-all ${isAdminView ? 'text-primary' : 'text-slate-300'}`}
            >
              <span className="text-xl mb-1">📊</span>
              <span className="text-[8px] font-black uppercase tracking-widest">ADMIN</span>
            </button>
          )}
          {user.role === UserRole.STAFF && (
            <button 
              onClick={() => onNavigate(AppView.STAFF_DASHBOARD)} 
              className={`flex flex-col items-center flex-1 transition-all ${isStaffView ? 'text-primary' : 'text-slate-300'}`}
            >
              <span className="text-xl mb-1">📋</span>
              <span className="text-[8px] font-black uppercase tracking-widest">STAFF</span>
            </button>
          )}
          <button 
            onClick={onLogout} 
            className="flex flex-col items-center flex-1 transition-all text-slate-300"
          >
            <span className="text-xl mb-1">🚪</span>
            <span className="text-[8px] font-black uppercase tracking-widest">EXIT</span>
          </button>
        </>
      ) : (
        <button 
          onClick={() => onNavigate(AppView.LOGIN)} 
          className={`flex flex-col items-center flex-1 transition-all ${currentView === AppView.LOGIN ? 'text-primary' : 'text-slate-300'}`}
        >
          <span className="text-xl mb-1">👤</span>
          <span className="text-[8px] font-black uppercase tracking-widest">LOGIN</span>
        </button>
      )}
    </nav>
  );
};

export default Navigation;
