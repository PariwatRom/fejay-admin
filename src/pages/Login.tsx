import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onGoToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onGoToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Demo authentication logic
    let role: UserRole | null = null;
    let displayName = '';

    if (email === 'admin@fejay.com') {
      role = UserRole.ADMIN;
      displayName = 'Super Admin';
    } else if (email === 'finance@fejay.com') {
      role = UserRole.FINANCE;
      displayName = 'Finance Manager';
    } else if (email === 'staff@fejay.com') {
      role = UserRole.STAFF;
      displayName = 'Staff Member';
    } else if (email === 'user@fejay.com') {
      role = UserRole.USER;
      displayName = 'Customer User';
    }

    if (role) {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username: email.split('@')[0],
        displayName: displayName,
        phone: '081-XXX-XXXX',
        email: email,
        role: role
      };
      onLogin(mockUser);
    } else {
      setError('Invalid email or password. Use demo accounts below.');
    }
  };

  return (
    <div className="animate-fadeIn flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6] px-4 py-10">
      <div className="w-full max-w-[400px] bg-white rounded-[24px] shadow-[0_10px_30px_rgba(108,43,217,0.15)] p-10 flex flex-col">
        
        <div className="mb-8">
          <h1 className="text-[28px] font-black text-[#111827] tracking-tight mb-1 uppercase">LOGIN</h1>
          <p className="text-sm text-[#6B7280] font-medium">Welcome back to FEJAY TECH</p>
        </div>

        <form onSubmit={handleLogin} className="w-full space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-[10px] text-red-500 font-bold uppercase tracking-wider text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <input 
              type="email" 
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[14px] text-sm font-medium text-[#111827] focus:outline-none focus:border-[#6C2BD9] focus:ring-4 focus:ring-[#6C2BD9]/10 transition-all placeholder:text-[#9CA3AF]"
            />
          </div>

          <div className="space-y-2">
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[14px] text-sm font-medium text-[#111827] focus:outline-none focus:border-[#6C2BD9] focus:ring-4 focus:ring-[#6C2BD9]/10 transition-all placeholder:text-[#9CA3AF]"
            />
          </div>

          <div className="flex items-center justify-between text-[13px]">
            <label className="flex items-center space-x-2 cursor-pointer text-[#6B7280]">
              <input type="checkbox" className="w-4 h-4 rounded border-[#E5E7EB] text-[#6C2BD9] focus:ring-[#6C2BD9]" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-[#6C2BD9] font-semibold hover:underline">Forgot password?</a>
          </div>

          <button 
            type="submit"
            className="w-full h-[52px] bg-[#6C2BD9] hover:bg-[#5B21B6] text-white rounded-[16px] font-bold text-sm uppercase tracking-widest shadow-[0_6px_16px_rgba(108,43,217,0.35)] active:scale-[0.98] transition-all mt-4"
          >
            Sign In
          </button>
        </form>

        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E7EB]"></div>
          </div>
          <span className="relative px-4 bg-white text-[13px] text-[#9CA3AF] font-medium">OR</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button className="flex items-center justify-center space-x-2 py-3 border border-[#E5E7EB] rounded-[14px] hover:bg-slate-50 transition-all">
            <span className="text-lg">G</span>
            <span className="text-[11px] font-black uppercase tracking-widest text-[#111827]">Google</span>
          </button>
          <button className="flex items-center justify-center space-x-2 py-3 border border-[#E5E7EB] rounded-[14px] hover:bg-slate-50 transition-all">
            <span className="text-lg">A</span>
            <span className="text-[11px] font-black uppercase tracking-widest text-[#111827]">Apple</span>
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-[#6B7280]">
            Don’t have an account? <button onClick={onGoToSignup} className="text-[#6C2BD9] font-bold hover:underline">Sign up</button>
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-[#F3F4F6] w-full">
          <p className="text-[9px] text-[#9CA3AF] font-bold uppercase tracking-widest mb-3 text-center">Demo Accounts</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['admin', 'finance', 'staff', 'user'].map(acc => (
              <button 
                key={acc}
                onClick={() => setEmail(`${acc}@fejay.com`)}
                className="px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[8px] font-black text-[#6B7280] uppercase tracking-tighter hover:border-[#6C2BD9] hover:text-[#6C2BD9] transition-all"
              >
                {acc}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
