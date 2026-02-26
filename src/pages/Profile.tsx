import React, { useState } from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    displayName: user.displayName,
    phone: user.phone,
    email: user.email
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      ...user,
      ...formData
    });
  };

  return (
    <div className="animate-fadeIn pb-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-midnight tracking-tight uppercase">User Profile</h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Manage your account details</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[40px] shadow-xl shadow-indigo-900/5 border border-slate-100 space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-midnight uppercase tracking-[0.2em] ml-2">Display Name</label>
          <input 
            type="text" 
            value={formData.displayName}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-midnight uppercase tracking-[0.2em] ml-2">Phone Number</label>
          <input 
            type="tel" 
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-midnight uppercase tracking-[0.2em] ml-2">Email Address</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20 active:scale-95 transition-all mt-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
