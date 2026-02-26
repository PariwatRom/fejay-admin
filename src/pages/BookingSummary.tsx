import React, { useState } from 'react';
import { Event, DeviceModel, DeviceUnit } from '../types';

interface BookingSummaryProps {
  event: Event;
  model: DeviceModel;
  unit: DeviceUnit;
  onConfirm: (paymentType: 'DEPOSIT' | 'FULL') => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ event, model, unit, onConfirm }) => {
  const deposit = 300;
  const total = model.price + deposit;
  const [selectedMethod, setSelectedMethod] = useState<'DEPOSIT' | 'FULL'>('DEPOSIT');
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="space-y-6 animate-slideIn pb-10">
      <div className="text-center">
        <h2 className="text-xl font-black text-midnight tracking-tight uppercase">BOOKING SUMMARY</h2>
      </div>

      {/* Section 1: Details - Receipt Style */}
      <div className="bg-white rounded-[44px] shadow-2xl shadow-indigo-900/10 border border-slate-100 overflow-hidden relative animate-slideUp">
         <div className="p-8 space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">SELECTED MODEL</p>
                    <h3 className="text-lg font-black text-primary uppercase tracking-tight">{model.name}</h3>
                    <p className="text-[10px] text-primary font-black mt-1">Unit No: {unit.unitNo}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">EVENT</p>
                    <p className="text-[10px] font-black text-midnight uppercase truncate max-w-[120px]">{event.name}</p>
                </div>
            </div>
            
            <div className="border-t border-dashed border-slate-200 pt-6 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">RENTAL FEE</span>
                    <span className="text-sm font-black text-midnight">฿{model.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">SECURITY DEPOSIT</span>
                    <span className="text-sm font-black text-midnight">฿{deposit}</span>
                </div>
            </div>
            
            <div className="pt-6 flex justify-between items-center">
                <span className="text-xs font-black text-midnight uppercase tracking-[0.2em]">TOTAL AMOUNT</span>
                <span className="text-3xl font-black text-primary block">฿{total.toLocaleString()}</span>
            </div>
         </div>
      </div>

      {/* Section 2: Payment Method */}
      <div className="space-y-5">
        <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center text-sm border border-slate-50">💳</div>
            <p className="text-[10px] font-black text-midnight uppercase tracking-[0.2em]">SELECT PAYMENT PLAN</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <div 
                onClick={() => setSelectedMethod('DEPOSIT')}
                className={`p-6 rounded-[32px] border-2 cursor-pointer transition-all flex flex-col justify-between h-44 ${selectedMethod === 'DEPOSIT' ? 'border-primary bg-indigo-50/50 shadow-xl shadow-primary/10' : 'border-white bg-white shadow-sm hover:border-slate-100'}`}
            >
                <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black text-midnight uppercase tracking-widest">DEPOSIT</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedMethod === 'DEPOSIT' ? 'bg-primary border-primary scale-110' : 'border-slate-200'}`}>
                        {selectedMethod === 'DEPOSIT' && <span className="text-white text-[10px]">✓</span>}
                    </div>
                </div>
                <div>
                    <span className="text-2xl font-black text-primary">฿300</span>
                    <p className="text-[9px] text-primary mt-2 font-black leading-tight uppercase tracking-tighter">PAY REMAINING AT EVENT</p>
                </div>
            </div>

            <div 
                onClick={() => setSelectedMethod('FULL')}
                className={`p-6 rounded-[32px] border-2 cursor-pointer transition-all flex flex-col justify-between h-44 ${selectedMethod === 'FULL' ? 'border-primary bg-indigo-50/50 shadow-xl shadow-primary/10' : 'border-white bg-white shadow-sm hover:border-slate-100'}`}
            >
                <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black text-midnight uppercase tracking-widest">FULL PAY</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedMethod === 'FULL' ? 'bg-primary border-primary scale-110' : 'border-slate-200'}`}>
                        {selectedMethod === 'FULL' && <span className="text-white text-[10px]">✓</span>}
                    </div>
                </div>
                <div>
                    <span className="text-2xl font-black text-primary">฿{total.toLocaleString()}</span>
                    <p className="text-[9px] text-primary font-black leading-tight uppercase tracking-tighter mt-2">FAST TRACK ACCESS</p>
                </div>
            </div>
        </div>
      </div>

      {/* Section 3: Terms and Conditions */}
      <div className="bg-white p-8 rounded-[44px] shadow-xl shadow-indigo-900/5 border border-slate-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-1.5 h-4 bg-primary rounded-full"></div>
            <h3 className="font-black text-[10px] text-midnight uppercase tracking-[0.2em]">RENTAL AGREEMENT</h3>
          </div>
          
          <div className="space-y-6 text-[11px] text-slate-500 leading-relaxed font-medium">
             <div className="space-y-4">
                <div className="space-y-2">
                    <p className="font-black text-midnight text-[10px] uppercase tracking-wider">1. GENERAL TERMS</p>
                    <p>ผู้เช่าตกลงเช่าอุปกรณ์โทรศัพท์มือถือตามรุ่นและระยะเวลาที่ระบุไว้ในคำสั่งซื้อนี้ โดยถือว่าการจองสมบูรณ์เมื่อมีการชำระเงินมัดจำเรียบร้อยแล้ว</p>
                </div>

                <div className="space-y-2">
                    <p className="font-black text-midnight text-[10px] uppercase tracking-wider">2. DAMAGE & LIABILITY</p>
                    <p>ผู้เช่าต้องดูแลรักษาอุปกรณ์ให้อยู่ในสภาพดี หากเกิดความเสียหาย แตกหัก หรือสูญหาย ผู้เช่าตกลงรับผิดชอบค่าใช้จ่ายในการซ่อมแซมหรือชดใช้ตามราคาท้องตลาดของอุปกรณ์</p>
                </div>
             </div>
          </div>

          <div 
            onClick={() => setAgreed(!agreed)}
            className={`mt-8 flex items-center space-x-4 p-5 rounded-[24px] cursor-pointer transition-all border ${agreed ? 'bg-indigo-50 border-indigo-200 shadow-inner' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}
          >
            <div className={`flex-shrink-0 w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all ${agreed ? 'bg-primary border-primary shadow-lg shadow-primary/30' : 'bg-white border-slate-200'}`}>
                {agreed && <span className="text-white text-sm font-black">✓</span>}
            </div>
            <p className="text-[11px] text-primary font-black leading-snug select-none uppercase tracking-widest">
              I HAVE READ AND AGREE TO ALL TERMS
            </p>
          </div>
      </div>

      <div className="pt-4">
        <button 
            disabled={!agreed}
            onClick={() => onConfirm(selectedMethod)}
            className={`w-full py-6 rounded-[28px] font-black text-sm uppercase tracking-[0.2em] shadow-2xl transition-all ${agreed ? 'bg-primary text-white active:scale-95 shadow-primary/30' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
            NEXT STEP
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
