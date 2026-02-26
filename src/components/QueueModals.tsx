import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchQueueModal: React.FC<ModalProps & { onSearch: (code: string) => void }> = ({ isOpen, onClose, onSearch }) => {
  const [code, setCode] = useState('');
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight/40 px-6 backdrop-blur-sm">
      <div className="w-full max-w-xs bg-white rounded-[40px] p-8 text-center animate-fadeIn shadow-2xl">
        <h3 className="text-xl font-extrabold text-midnight mb-2 tracking-tight">ค้นหาคิวของคุณ</h3>
        <p className="text-[10px] text-slate-400 mb-6 font-medium uppercase tracking-widest">กรอกรหัสการจองเพื่อดูตำแหน่ง Model</p>
        
        <input 
          type="text" 
          placeholder="รหัสการจอง (เช่น FJ123456)" 
          className="w-full bg-slate-50 border-none rounded-2xl p-4 text-center text-sm font-bold placeholder:text-slate-300 mb-6 focus:ring-2 ring-primary/30 outline-none transition-all"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
        />

        <button 
          onClick={() => onSearch(code)}
          className="w-full py-4 bg-primary text-white rounded-3xl font-extrabold text-sm shadow-lg shadow-primary/20 active:scale-95 transition-all mb-4"
        >
          ค้นหาข้อมูล
        </button>

        <button onClick={onClose} className="text-[10px] font-bold text-slate-300 hover:text-slate-500 uppercase tracking-widest">
          ปิดหน้าต่าง
        </button>
      </div>
    </div>
  );
};

export const QueueResultModal: React.FC<ModalProps & { result: any, onGoToEvent: () => void }> = ({ isOpen, onClose, result, onGoToEvent }) => {
  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight/40 px-6 backdrop-blur-sm">
      <div className="w-full max-w-xs bg-white rounded-[40px] p-8 text-center animate-fadeIn relative shadow-2xl">
        <h3 className="text-xl font-extrabold text-midnight mb-2 tracking-tight">ค้นหาคิวของคุณ</h3>
        <p className="text-[10px] text-slate-400 mb-6 font-medium uppercase tracking-widest">กรอกรหัสการจองเพื่อดูตำแหน่ง Model</p>
        
        <div className="bg-slate-50 rounded-2xl p-4 mb-6">
            <span className="text-sm font-extrabold text-midnight tracking-wider">{result.id}</span>
        </div>

        <div className="bg-blue-50/50 rounded-[32px] p-5 text-left mb-6 relative overflow-hidden border border-blue-100">
            <div className="absolute top-2 right-4 text-[8px] font-bold text-primary uppercase opacity-60 tracking-widest">พบข้อมูลการจอง!</div>
            <div className="space-y-3">
                <div className="flex items-start">
                    <span className="text-sm mr-2">📍</span>
                    <div>
                        <p className="text-[9px] font-bold text-slate-400 leading-none mb-1 uppercase tracking-tighter">Event:</p>
                        <p className="text-[11px] font-extrabold text-slate-700">{result.eventName}</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <span className="text-sm mr-2">📱</span>
                    <div>
                        <p className="text-[9px] font-bold text-slate-400 leading-none mb-1 uppercase tracking-tighter">Model:</p>
                        <p className="text-[11px] font-extrabold text-slate-700">{result.deviceName}</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <span className="text-sm mr-2">🔢</span>
                    <div>
                        <p className="text-[9px] font-bold text-slate-400 leading-none mb-1 uppercase tracking-tighter">No.:</p>
                        <p className="text-[11px] font-extrabold text-slate-700">{result.deviceNo}</p>
                    </div>
                </div>
                <div className="pt-3 border-t border-blue-100 flex justify-between items-center">
                    <span className="text-[11px] font-bold text-slate-400">ยอดที่ชำระ:</span>
                    <span className="text-xs font-extrabold text-slate-700">฿{result.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-tech-error">ยอดค้างชำระ:</span>
                    <span className="text-xs font-extrabold text-tech-error">฿{(result.totalAmount - result.paidAmount).toLocaleString()}</span>
                </div>
            </div>
            
            <button 
                onClick={onGoToEvent}
                className="w-full py-4 bg-primary text-white rounded-2xl font-extrabold text-xs shadow-md mt-6 active:scale-95 transition-all"
            >
                ไปที่หน้า Event นั้น
            </button>
        </div>

        <button onClick={onClose} className="text-[10px] font-bold text-slate-300 hover:text-slate-500 uppercase tracking-widest">
          ปิดหน้าต่าง
        </button>
      </div>
    </div>
  );
};

export const CheckBalanceModal: React.FC<ModalProps & { onCheck: (code: string) => void }> = ({ isOpen, onClose, onCheck }) => {
  const [code, setCode] = useState('');
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight/40 px-6 backdrop-blur-sm">
      <div className="w-full max-w-xs bg-white rounded-[40px] p-8 text-center animate-fadeIn shadow-2xl">
        <h3 className="text-xl font-extrabold text-midnight mb-2 tracking-tight">ตรวจสอบสถานะเงิน</h3>
        <p className="text-[10px] text-slate-400 mb-6 font-medium uppercase tracking-widest">กรุณากรอกรหัสการจองของคุณเพื่อดูยอดค้างชำระ</p>
        
        <input 
          type="text" 
          placeholder="รหัสการจอง (6 หลัก)" 
          className="w-full bg-slate-50 border-none rounded-2xl p-4 text-center text-sm font-bold placeholder:text-slate-300 mb-6 focus:ring-2 ring-primary/30 outline-none transition-all"
          value={code}
          maxLength={6}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
        />

        <button 
          onClick={() => onCheck(code)}
          className="w-full py-4 bg-primary text-white rounded-3xl font-extrabold text-sm shadow-lg shadow-primary/20 active:scale-95 transition-all mb-4"
        >
          ตรวจสอบสถานะ
        </button>

        <button onClick={onClose} className="text-[10px] font-bold text-slate-300 hover:text-slate-500 uppercase tracking-widest">
          ปิดหน้าต่าง
        </button>
      </div>
    </div>
  );
};

export const BalanceResultModal: React.FC<ModalProps & { result: any }> = ({ isOpen, onClose, result }) => {
  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight/40 px-6 backdrop-blur-sm">
      <div className="w-full max-w-xs bg-white rounded-[40px] p-8 text-center animate-fadeIn shadow-2xl">
        <h3 className="text-xl font-extrabold text-midnight mb-2 tracking-tight">ตรวจสอบสถานะเงิน</h3>
        <p className="text-[10px] text-slate-400 mb-6 font-medium uppercase tracking-widest">ข้อมูลการจองของคุณ</p>
        
        <div className="bg-slate-50 rounded-[32px] p-6 text-left mb-6 space-y-3">
            <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400">ยอดเงินรวมทั้งหมด:</span>
                <span className="text-sm font-extrabold text-midnight">฿{result.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400">ยอดเงินที่จ่ายแล้ว:</span>
                <span className="text-sm font-extrabold text-tech-success">฿{result.paidAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                <span className="text-xs font-extrabold text-midnight">ยอดเงินคงเหลือ:</span>
                <span className="text-lg font-black text-tech-error">฿{(result.totalAmount - result.paidAmount).toLocaleString()}</span>
            </div>
        </div>

        <div className="bg-blue-50/50 rounded-[32px] p-5 text-left mb-6 border border-blue-100">
            <p className="text-[9px] font-bold text-primary mb-3 uppercase tracking-tighter">วันที่ส่งเครื่อง (วันงาน):</p>
            <p className="text-[11px] font-extrabold text-slate-800 mb-4">{result.date}</p>
            
            <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-slate-400">Model:</span>
                <span className="text-[10px] font-extrabold text-slate-700">{result.deviceName}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400">No.:</span>
                <span className="text-[10px] font-extrabold text-slate-700">{result.deviceNo}</span>
            </div>
        </div>

        <button onClick={onClose} className="text-[10px] font-bold text-slate-300 hover:text-slate-500 uppercase tracking-widest">
          ปิดหน้าต่าง
        </button>
      </div>
    </div>
  );
};
