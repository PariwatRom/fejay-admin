import React, { useState } from 'react';
import { apiCreateBooking } from '../mockApi';
import { BookingResponse } from '../types';

interface CustomerFormProps {
  eventId: string;
  modelId: string;
  unitId: string;
  paymentType: 'DEPOSIT' | 'FULL';
  onSuccess: (res: BookingResponse) => void;
  onBack: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ eventId, modelId, unitId, paymentType, onSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    nickname: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await apiCreateBooking({
            eventId,
            modelId,
            unitId,
            paymentType,
            firstName: '-',
            lastName: '-',
            ...formData
        });
        onSuccess(response);
    } catch (err) {
        alert("Booking Failed: " + err);
        setLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setFormData({ ...formData, phone: value });
  };

  return (
    <div className="animate-slideIn pb-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-midnight tracking-tight uppercase">Customer Info</h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Required for identity verification</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[40px] shadow-xl shadow-indigo-900/5 border border-slate-100 space-y-8">
          
          <div className="space-y-3">
            <label className="text-[10px] font-black text-midnight uppercase tracking-[0.2em] ml-2 flex items-center">
                <span className="mr-2">👤</span> Nickname <span className="text-primary ml-1">*</span>
            </label>
            <input 
                required 
                type="text" 
                placeholder="e.g. Jib, Non"
                value={formData.nickname} 
                onChange={e => setFormData({...formData, nickname: e.target.value})} 
                className="input-tech" 
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-midnight uppercase tracking-[0.2em] ml-2 flex items-center">
                <span className="mr-2">📞</span> Phone Number <span className="text-primary ml-1">*</span>
            </label>
            <input 
              required 
              type="tel" 
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="08xxxxxxxx"
              value={formData.phone} 
              onChange={handlePhoneChange} 
              className="input-tech tracking-widest" 
            />
            <p className="text-[9px] text-slate-400 ml-2 font-bold uppercase tracking-tighter">Numbers only • Used for SMS confirmation</p>
          </div>

          <div className="pt-4 space-y-4">
             <button 
                type="submit" 
                disabled={loading || formData.phone.length < 9}
                className={`w-full py-5 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] shadow-xl transition-all flex justify-center items-center border-b-4 ${loading || formData.phone.length < 9 ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed' : 'bg-primary text-white border-indigo-800 active:scale-95'}`}
             >
                {loading ? (
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Processing...</span>
                    </div>
                ) : 'Confirm Booking'}
             </button>
             
             <button 
                type="button" 
                onClick={onBack}
                disabled={loading}
                className="w-full py-4 bg-slate-50 text-slate-400 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-sm active:scale-95 transition-all border border-slate-100"
             >
                Back to Summary
             </button>
          </div>
      </form>
    </div>
  );
};

export default CustomerForm;
