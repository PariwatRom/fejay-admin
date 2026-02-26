import React, { useState } from 'react';
import { User } from '../types';
import { User as UserIcon, Bell, Shield, CreditCard, HelpCircle, ChevronRight, LogOut, ChevronLeft, Mail, Phone, UserCircle } from 'lucide-react';

interface ProfileProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
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
    setIsEditing(false);
  };

  const settingsItems = [
    { id: 'personal', icon: <UserCircle className="w-5 h-5" />, label: 'ข้อมูลส่วนตัว', color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { id: 'notifications', icon: <Bell className="w-5 h-5" />, label: 'การแจ้งเตือน', color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'security', icon: <Shield className="w-5 h-5" />, label: 'ความปลอดภัย', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'payments', icon: <CreditCard className="w-5 h-5" />, label: 'การชำระเงิน', color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'help', icon: <HelpCircle className="w-5 h-5" />, label: 'ศูนย์ช่วยเหลือ', color: 'text-rose-500', bg: 'bg-rose-50' },
  ];

  if (isEditing) {
    return (
      <div className="animate-fadeIn pb-10 space-y-8">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsEditing(false)}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-black text-midnight uppercase tracking-tight">แก้ไขข้อมูลส่วนตัว</h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[40px] shadow-xl shadow-indigo-900/5 border border-slate-100 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-midnight uppercase tracking-[0.2em] ml-2">ชื่อที่แสดง</label>
            <div className="relative">
              <UserCircle className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                type="text" 
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-midnight uppercase tracking-[0.2em] ml-2">เบอร์โทรศัพท์</label>
            <div className="relative">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-midnight uppercase tracking-[0.2em] ml-2">อีเมล</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button 
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] active:scale-95 transition-all"
            >
              ยกเลิก
            </button>
            <button 
              type="submit"
              className="flex-1 py-5 bg-indigo-600 text-white rounded-[24px] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-indigo-200 active:scale-95 transition-all"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn pb-10 space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-24 h-24 bg-indigo-600 rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-indigo-200 relative">
          <UserIcon className="w-12 h-12" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-midnight tracking-tight uppercase">{user.displayName}</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">บัญชี {user.role}</p>
        </div>
      </div>

      {/* Settings List */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">การตั้งค่าบัญชี</h3>
        <div className="bg-white rounded-[40px] shadow-xl shadow-indigo-900/5 border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {settingsItems.map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => item.id === 'personal' && setIsEditing(true)}
              className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group text-left"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center`}>
                  {item.icon}
                </div>
                <span className="text-sm font-black text-midnight uppercase tracking-widest">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
            </button>
          ))}
          
          <button 
            onClick={onLogout}
            className="w-full p-6 flex items-center justify-between hover:bg-rose-50 transition-colors group text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="text-sm font-black text-rose-500 uppercase tracking-widest">ออกจากระบบ</span>
            </div>
            <ChevronRight className="w-5 h-5 text-rose-200 group-hover:text-rose-500 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
