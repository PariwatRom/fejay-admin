import React, { useState } from 'react';
import { UserRole } from '../types';

interface SignupProps {
  onSignup: (role: UserRole) => void;
  onBackToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    phone: '',
    email: '',
    password: '',
    role: UserRole.USER // Default to user for signup
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd save this to a database
    onSignup(formData.role);
  };

  return (
    <div className="animate-fadeIn flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6] px-4 py-10">
      <div className="w-full max-w-[400px] bg-white rounded-[24px] shadow-[0_10px_30px_rgba(108,43,217,0.15)] p-10 flex flex-col">
        
        <div className="mb-8">
          <h1 className="text-[28px] font-black text-[#111827] tracking-tight mb-1 uppercase">SIGN UP</h1>
          <p className="text-sm text-[#6B7280] font-medium">Join the FEJAY TECH platform</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-1">
            <input 
              type="text" 
              placeholder="Display Name"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[14px] text-sm font-medium text-[#111827] focus:outline-none focus:border-[#6C2BD9] focus:ring-4 focus:ring-[#6C2BD9]/10 transition-all placeholder:text-[#9CA3AF]"
              required
            />
          </div>

          <div className="space-y-1">
            <input 
              type="tel" 
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[14px] text-sm font-medium text-[#111827] focus:outline-none focus:border-[#6C2BD9] focus:ring-4 focus:ring-[#6C2BD9]/10 transition-all placeholder:text-[#9CA3AF]"
              required
            />
          </div>

          <div className="space-y-1">
            <input 
              type="email" 
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[14px] text-sm font-medium text-[#111827] focus:outline-none focus:border-[#6C2BD9] focus:ring-4 focus:ring-[#6C2BD9]/10 transition-all placeholder:text-[#9CA3AF]"
              required
            />
          </div>

          <div className="space-y-1">
            <input 
              type="password" 
              placeholder="Create Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[14px] text-sm font-medium text-[#111827] focus:outline-none focus:border-[#6C2BD9] focus:ring-4 focus:ring-[#6C2BD9]/10 transition-all placeholder:text-[#9CA3AF]"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full h-[52px] bg-[#6C2BD9] hover:bg-[#5B21B6] text-white rounded-[16px] font-bold text-sm uppercase tracking-widest shadow-[0_6px_16px_rgba(108,43,217,0.35)] active:scale-[0.98] transition-all mt-4"
          >
            Create Account
          </button>

          <button 
            type="button"
            onClick={onBackToLogin}
            className="w-full py-2 text-sm font-bold text-[#6B7280] hover:text-[#6C2BD9] transition-colors"
          >
            Already have an account? Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
