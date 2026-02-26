import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [error, setError] = useState('');

  const handleRoleSelect = (role: UserRole) => {
    // Simple mock authentication based on role selection
    if (role === UserRole.ADMIN) {
      onLogin({ 
        id: '1', 
        username: 'admin', 
        displayName: 'System Admin', 
        phone: '0812345678', 
        email: 'admin@fejay.tech', 
        role: UserRole.ADMIN 
      });
    } else if (role === UserRole.STAFF) {
      onLogin({ 
        id: '2', 
        username: 'staff', 
        displayName: 'Ground Staff', 
        phone: '0898765432', 
        email: 'staff@fejay.tech', 
        role: UserRole.STAFF 
      });
    }
  };

  return (
    <div className="animate-fadeIn pb-10 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-primary/10 rounded-[32px] flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-primary/5">
          🚀
        </div>
        <h2 className="text-3xl font-black text-midnight tracking-tight uppercase">Gatekeeper</h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Select your access role</p>
      </div>

      <div className="w-full space-y-4 px-4">
        <button 
          onClick={() => handleRoleSelect(UserRole.ADMIN)}
          className="w-full p-8 bg-midnight text-white rounded-[40px] shadow-2xl shadow-indigo-900/20 active:scale-95 transition-all flex flex-col items-center space-y-3 border border-white/5"
        >
          <span className="text-3xl">🛡️</span>
          <span className="text-sm font-black uppercase tracking-[0.2em]">System Admin</span>
        </button>

        <button 
          onClick={() => handleRoleSelect(UserRole.STAFF)}
          className="w-full p-8 bg-white text-midnight rounded-[40px] shadow-xl shadow-slate-200/50 active:scale-95 transition-all flex flex-col items-center space-y-3 border border-slate-100"
        >
          <span className="text-3xl">📋</span>
          <span className="text-sm font-black uppercase tracking-[0.2em]">Ground Staff</span>
        </button>
      </div>

      <p className="mt-12 text-[9px] text-slate-300 font-bold uppercase tracking-widest">
        Fejay Tech Management System v1.0
      </p>
    </div>
  );
};

export default Login;
