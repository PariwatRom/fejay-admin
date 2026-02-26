import React, { useEffect, useState } from 'react';
import { DeviceModel, Event } from '../types';
import { apiGetModels } from '../mockApi';

interface ModelsProps {
  event: Event;
  onSelect: (model: DeviceModel) => void;
}

const Models: React.FC<ModelsProps> = ({ event, onSelect }) => {
  const [models, setModels] = useState<DeviceModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (event?.id) {
        apiGetModels(event.id).then(data => {
            setModels(data);
            setLoading(false);
        });
    }
  }, [event]);

  if (loading) return <div className="text-center py-24 text-slate-400 text-xs font-black uppercase tracking-[0.3em] animate-pulse">Loading Models...</div>;

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      
      {/* Event Info Card - Dark Header Split Layout */}
      <div className="bg-[#15161D] rounded-[32px] shadow-2xl animate-slideUp border border-white/5 relative overflow-hidden flex h-32">
        <div className="w-1/3 relative overflow-hidden">
            <img src={event.image} alt={event.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#15161D]"></div>
        </div>
        <div className="w-2/3 p-4 flex flex-col justify-center relative z-10">
            <h3 className="font-black text-white text-[11px] leading-tight mb-2 tracking-tight uppercase line-clamp-2">{event.name}</h3>
            <div className="flex items-center space-x-2 bg-white/5 p-2 rounded-xl border border-white/5">
                <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-[10px]">🗓️</span>
                </div>
                <p className="text-[9px] text-white/70 font-bold uppercase tracking-tight">{event.date}</p>
            </div>
        </div>
      </div>

      <div className="px-1">
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.1em] mb-4">AVAILABLE DEVICES</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {models.map((model, idx) => {
          const isAvailable = model.availableCount > 0;
          
          return (
            <div 
              key={model.id}
              onClick={() => isAvailable && onSelect(model)}
              className={`bg-white rounded-[32px] p-4 shadow-sm border-2 transition-all relative overflow-hidden animate-slideUp flex flex-col items-center text-center ${isAvailable ? 'border-primary shadow-xl shadow-primary/5 cursor-pointer active:scale-[0.95]' : 'border-slate-50 opacity-60 grayscale cursor-not-allowed'}`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="w-12 h-12 mb-3 flex items-center justify-center text-3xl">
                  {model.emoji}
              </div>
              
              <div className="w-full space-y-2">
                  <h3 className="font-black text-[9px] text-midnight leading-tight uppercase tracking-tight h-6 flex items-center justify-center line-clamp-2">{model.name}</h3>
                  
                  {isAvailable ? (
                       <span className="text-[7px] font-black text-tech-success bg-[#E8F8F1] px-3 py-1 rounded-full inline-block uppercase tracking-widest">
                          ว่าง {model.availableCount} เครื่อง
                       </span>
                  ) : (
                       <span className="text-[7px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full inline-block uppercase tracking-widest">
                          คิวเต็ม
                       </span>
                  )}
              </div>

              <div className="mt-4 w-full space-y-3">
                <div className="text-center">
                    <p className="text-[7px] text-slate-300 font-black mb-0.5 uppercase tracking-widest">RENT PRICE</p>
                    {isAvailable ? (
                        <p className="text-sm font-black text-primary">฿{model.price.toLocaleString()}</p>
                    ) : (
                        <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">COMING SOON</p>
                    )}
                </div>
                
                {isAvailable && (
                    <button className="w-full py-2.5 bg-primary text-white rounded-2xl text-[8px] font-black uppercase tracking-widest shadow-lg shadow-primary/30">
                        จองรุ่นนี้
                    </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Models;
