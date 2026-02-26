import React, { useState } from 'react';
import { Event, Device } from '../types';
import { DEVICES } from '../constants';
import { CheckBalanceModal, BalanceResultModal } from '../components/QueueModals';

interface QueueDetailProps {
  event: Event;
  onBack: () => void;
}

const QueueDetail: React.FC<QueueDetailProps> = ({ event, onBack }) => {
  const [isCheckOpen, setIsCheckOpen] = useState(false);
  const [balanceResult, setBalanceResult] = useState<any>(null);
  const [activeUnit, setActiveUnit] = useState<any>(null);

  const handleCheckCode = (code: string) => {
    if (code.length === 6) {
      setBalanceResult({
          totalAmount: 1100,
          paidAmount: 300,
          deviceName: activeUnit?.model || 'Samsung Galaxy S24 Ultra',
          deviceNo: activeUnit?.id || '#1',
          date: event.date
      });
      setIsCheckOpen(false);
    } else {
      alert("กรุณากรอกรหัส 6 หลัก");
    }
  };

  const handleUnitClick = (unit: any, device: Device) => {
    if (unit.status === 'booked') {
      setActiveUnit({...unit, model: device.name});
      setIsCheckOpen(true);
    }
  };

  const getUnits = (deviceSku: string) => {
    const base = [
        { id: '#1', status: 'available', user: '' },
        { id: '#2', status: 'booked', user: 'จิราพร' },
        { id: '#3', status: 'occupied', user: '-' },
        { id: '#4', status: 'available', user: '' }
    ];
    
    if (deviceSku === 'S23U') return [
        { id: '#1', status: 'booked', user: 'ชอน' },
        { id: '#2', status: 'booked', user: 'เอย' },
        { id: '#3', status: 'occupied', user: '-' },
        { id: '#4', status: 'available', user: '' }
    ];
    if (deviceSku === 'S24U') return [
        { id: '#1', status: 'available', user: '' },
        { id: '#2', status: 'available', user: '' },
        { id: '#3', status: 'booked', user: 'กิ๊ฟ' },
        { id: '#4', status: 'available', user: '' }
    ];
    if (deviceSku.includes('VX200U')) return [
        { id: '#1', status: 'available', user: '' },
        { id: '#2', status: 'available', user: '' },
        { id: '#3', status: 'occupied', user: '-' },
        { id: '#4', status: 'available', user: '' }
    ];
    return base;
  };

  return (
    <div className="animate-fadeIn pb-24">
      {/* Header card */}
      <div className="bg-white rounded-[32px] p-8 mb-12 shadow-xl shadow-indigo-900/5 flex justify-between items-center border border-slate-100">
        <div className="flex-1 pr-6">
            <h2 className="text-base font-black text-midnight line-clamp-1 uppercase tracking-tight">{event.name}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">{event.date}</p>
        </div>
        <button 
            onClick={onBack}
            className="text-[10px] font-black text-primary uppercase border-b-2 border-primary/20 pb-1.5 tracking-[0.2em] active:scale-95 transition-all whitespace-nowrap"
        >
            Change Event
        </button>
      </div>

      <div className="space-y-16">
        {DEVICES.map((device) => (
          <div key={device.sku} className="space-y-6">
            <div className="flex items-center space-x-4 px-2">
                <div className="w-10 h-10 bg-white rounded-2xl shadow-sm flex items-center justify-center text-xl border border-slate-50">{device.emoji}</div>
                <h3 className="text-[11px] font-black text-midnight uppercase tracking-[0.2em]">{device.name}</h3>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {getUnits(device.sku).map((unit, idx) => {
                let bgClass = "bg-emerald-50/30 border-emerald-100";
                let textClass = "text-tech-success";
                let statusText = "Available";
                let icon = "";

                if (unit.status === 'booked') {
                  bgClass = "bg-indigo-50 border-indigo-100 cursor-pointer active:scale-95 shadow-lg shadow-indigo-900/5";
                  textClass = "text-primary";
                  statusText = "Booked";
                  icon = "👤";
                } else if (unit.status === 'occupied') {
                  bgClass = "bg-slate-50 border-slate-100 opacity-60";
                  textClass = "text-slate-300";
                  statusText = "In Use";
                }

                return (
                  <div 
                    key={idx} 
                    onClick={() => handleUnitClick(unit, device)}
                    className={`${bgClass} border-2 rounded-[32px] p-4 flex flex-col items-center justify-center text-center min-h-[140px] transition-all animate-popIn`}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <span className={`text-[8px] font-black uppercase mb-3 tracking-widest ${textClass}`}>{statusText}</span>
                    <span className="text-[10px] font-black text-midnight mb-2 leading-tight uppercase tracking-tighter">{device.sku.split('-')[0]} {unit.id}</span>
                    
                    {unit.status === 'booked' ? (
                      <div className="flex flex-col items-center justify-center mt-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 border border-indigo-50">
                            <span className="text-sm leading-none">{icon}</span>
                        </div>
                        <span className="text-[9px] font-black text-slate-700 truncate max-w-[60px] uppercase tracking-tighter">{unit.user}</span>
                      </div>
                    ) : (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-2 ${unit.status === 'occupied' ? 'bg-slate-100' : 'bg-emerald-100/50'}`}>
                        <span className={`${textClass} text-xs font-bold`}>
                            {unit.status === 'occupied' ? '—' : '●'}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <CheckBalanceModal 
        isOpen={isCheckOpen} 
        onClose={() => setIsCheckOpen(false)} 
        onCheck={handleCheckCode} 
      />

      <BalanceResultModal 
        isOpen={!!balanceResult} 
        result={balanceResult} 
        onClose={() => setBalanceResult(null)}
      />
    </div>
  );
};

export default QueueDetail;
