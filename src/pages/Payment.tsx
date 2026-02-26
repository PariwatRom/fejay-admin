import React, { useState, useEffect } from 'react';
import { BookingResponse } from '../types';

interface PaymentProps {
  booking: BookingResponse;
  onComplete: () => void;
}

const Payment: React.FC<PaymentProps> = ({ booking, onComplete }) => {
  const [proof, setProof] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const diff = Math.max(0, Math.floor((booking.expireAt - Date.now()) / 1000));
    setTimeLeft(diff);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
            clearInterval(timer);
            return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [booking]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProof(e.target.files[0]);
    }
  };

  const handleFinish = () => {
    if (!proof) return;
    setIsUploading(true);
    setTimeout(() => {
        setIsUploading(false);
        onComplete();
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-slideIn pb-10">
      <div className="text-center">
         <h2 className="text-2xl font-black text-midnight tracking-tight uppercase">Payment</h2>
         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Please complete transfer within</p>
         <div className="inline-flex items-center space-x-3 bg-indigo-50 text-primary text-2xl font-black px-8 py-3 rounded-full mt-5 tabular-nums shadow-inner border border-indigo-100">
            <span>⏱</span>
            <span>{formatTime(timeLeft)}</span>
         </div>
      </div>

      <div className="bg-white p-8 rounded-[44px] shadow-2xl shadow-indigo-900/5 border border-slate-100 space-y-8">
        {/* Booking Details Summary */}
        <div className="space-y-4 pb-6 border-b border-dashed border-slate-200">
            <div className="flex justify-between items-start">
                <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">SELECTED MODEL</p>
                    <h3 className="text-lg font-black text-primary uppercase tracking-tight">{booking.model}</h3>
                    <p className="text-[10px] text-primary font-black mt-1">Unit No: {booking.unit}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">EVENT</p>
                    <p className="text-[10px] font-black text-midnight uppercase truncate max-w-[120px]">{booking.event}</p>
                </div>
            </div>
            
            <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">TOTAL PRICE</span>
                    <span className="text-sm font-black text-midnight">฿{booking.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">AMOUNT TO PAY</span>
                    <span className="text-xl font-black text-primary">฿{booking.paidAmount.toLocaleString()}</span>
                </div>
                {booking.remainingAmount > 0 && (
                    <div className="flex justify-between items-center">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">REMAINING</span>
                        <span className="text-sm font-black text-tech-warning">฿{booking.remainingAmount.toLocaleString()}</span>
                    </div>
                )}
            </div>
        </div>

        <div className="text-center space-y-6">
            <div>
                <p className="text-[10px] text-slate-400 uppercase mb-2 font-black tracking-[0.2em]">Scan to Pay</p>
            </div>

            <div className="mx-auto w-64 h-64 bg-white p-5 border-2 border-slate-50 rounded-[40px] flex items-center justify-center shadow-inner relative group">
                <img src={booking.qrCodeUrl} alt="QR" className="w-full h-full mix-blend-multiply rounded-3xl" />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[40px] pointer-events-none"></div>
            </div>
            
            <div className="bg-slate-50 py-4 px-8 rounded-full inline-block border border-slate-100">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Booking ID: <span className="font-black text-midnight ml-1">{booking.bookingId}</span></p>
            </div>
        </div>
      </div>

      <div className="space-y-4">
         <label className="text-[10px] font-black text-midnight uppercase tracking-[0.2em] ml-2">Upload Payment Slip <span className="text-tech-error">*</span></label>
         <label className={`block w-full border-2 border-dashed rounded-[40px] p-8 text-center cursor-pointer transition-all ${proof ? 'border-tech-success bg-emerald-50/50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <div className="flex flex-col items-center justify-center space-y-4">
                {proof ? (
                    <>
                        <div className="w-16 h-16 bg-tech-success text-white rounded-full flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20">✓</div>
                        <span className="text-sm font-black text-emerald-700 uppercase tracking-tight truncate max-w-[240px]">{proof.name}</span>
                        <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest">Tap to change file</span>
                    </>
                ) : (
                    <>
                        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center text-3xl">📸</div>
                        <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Tap to upload slip</span>
                        <span className="text-[9px] text-slate-300 font-bold uppercase tracking-tighter">JPG, PNG, PDF supported</span>
                    </>
                )}
            </div>
         </label>
      </div>

      <button 
        disabled={isUploading || timeLeft === 0 || !proof}
        onClick={handleFinish}
        className={`w-full py-6 rounded-[28px] font-black text-sm uppercase tracking-[0.2em] text-white shadow-xl transition-all flex items-center justify-center space-x-4 border-b-4 ${!isUploading && timeLeft > 0 && proof ? 'bg-primary border-indigo-900 active:scale-95' : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'}`}
      >
        {isUploading ? (
            <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Verifying...</span>
            </>
        ) : (
            <span>Submit Payment</span>
        )}
      </button>
    </div>
  );
};

export default Payment;
