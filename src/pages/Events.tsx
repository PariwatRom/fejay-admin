import React, { useState, useMemo, useEffect } from 'react';
import { EVENTS } from '../constants';
import { Event } from '../types';

interface EventsProps {
  onSelect: (event: Event) => void;
}

const Events: React.FC<EventsProps> = ({ onSelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { id: 1, img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800&h=400', title: 'Premium Tech Rental', subtitle: 'Experience the latest tech at your favorite events' },
    { id: 2, img: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800&h=400', title: 'Samsung S24 Ultra', subtitle: 'Capture every moment with 100x zoom' },
    { id: 3, img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800&h=400', title: 'Fast Track Access', subtitle: 'Book now and skip the queue at the event' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const eventsByMonth = useMemo(() => {
    const groups: Record<string, Event[]> = {};
    EVENTS.forEach(event => {
      const month = event.monthGroup || 'Upcoming';
      if (!groups[month]) {
        groups[month] = [];
      }
      groups[month].push(event);
    });
    return groups;
  }, []);

  const monthKeys = useMemo(() => {
    return Array.from(new Set(EVENTS.map(e => e.monthGroup || 'Upcoming')));
  }, []);

  const quickActions = [
      { icon: '✈️', label: 'International', color: '#F5F3FF', text: '#6D28D9' },
      { icon: '📸', label: 'Tutorials', color: '#F8FAFC', text: '#475569' },
      { icon: '📦', label: 'What\'s Inside', color: '#ECFDF5', text: '#059669' },
      { icon: '💬', label: 'Support', color: '#FFFBEB', text: '#D97706' }
  ];

  return (
    <div className="animate-fadeIn pb-24 space-y-8">
      
      {/* 1. News Slideshow */}
      <div className="relative h-52 mx-4 mt-2 rounded-[32px] overflow-hidden shadow-2xl shadow-indigo-900/10 bg-slate-100 border border-white">
          {slides.map((slide, index) => (
              <div 
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                  <img src={slide.img} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/30 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-white font-black text-2xl leading-tight tracking-tight uppercase">{slide.title}</h3>
                      <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em] mt-2">{slide.subtitle}</p>
                  </div>
              </div>
          ))}
          <div className="absolute bottom-6 right-8 flex space-x-2 z-10">
              {slides.map((_, idx) => (
                  <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'bg-primary w-8' : 'bg-white/30 w-1.5'}`}></div>
              ))}
          </div>
      </div>

      {/* 2. Quick Buttons */}
      <div className="grid grid-cols-4 gap-4 px-4">
          {quickActions.map((action, idx) => (
              <button key={idx} className="flex flex-col items-center space-y-2.5 group active:scale-95 transition-transform">
                  <div 
                    className="w-16 h-16 rounded-[24px] flex items-center justify-center text-2xl shadow-sm border border-slate-100 group-hover:border-primary/20 transition-all bg-white"
                    style={{ color: action.text }}
                  >
                      {action.icon}
                  </div>
                  <span className="text-[9px] font-black text-slate-500 text-center leading-tight uppercase tracking-widest">{action.label}</span>
              </button>
          ))}
      </div>

      {/* 3. Events Sections */}
      <div className="space-y-10 pb-4">
         {monthKeys.map(month => (
             <div key={month} className="px-4 space-y-5">
                 <div className="flex items-center space-x-4 px-1">
                    <h2 className="text-sm font-black text-midnight uppercase tracking-[0.3em]">{month}</h2>
                    <div className="flex-1 h-px bg-slate-200/60"></div>
                 </div>
                 
                 <div className="grid grid-cols-3 gap-4">
                    {eventsByMonth[month].map((ev, idx) => (
                        <div 
                            key={ev.id}
                            onClick={() => !ev.soldOut && onSelect(ev)}
                            className={`group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm transition-all ${ev.soldOut ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:shadow-md active:scale-[0.98]'}`}
                        >
                            {/* Image Section */}
                            <div className="aspect-square w-full relative overflow-hidden">
                                <img 
                                    src={ev.image} 
                                    alt={ev.name} 
                                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${ev.soldOut ? 'grayscale contrast-75' : ''}`} 
                                />
                                {ev.soldOut && (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
                                        <div className="bg-white text-red-600 font-black text-[8px] px-2 py-1 rounded uppercase tracking-widest">
                                            SOLD OUT
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Details Section */}
                            <div className="p-3 flex flex-col flex-grow space-y-2">
                                <h3 className="font-bold text-[10px] leading-tight text-slate-800 line-clamp-2 h-[24px]">
                                    {ev.name}
                                </h3>
                                
                                <p className="text-[9px] text-slate-500 font-medium">
                                    {ev.date}
                                </p>

                                <div className="flex items-center space-x-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                                    <span className="text-[7px] font-bold text-primary uppercase tracking-tighter">LIVE STREAMING BY FEJAY</span>
                                </div>

                                <div className="pt-2 mt-auto">
                                    {ev.soldOut ? (
                                        <button className="w-full py-2 border border-primary text-primary rounded-full text-[9px] font-bold uppercase tracking-widest">
                                            หมด
                                        </button>
                                    ) : (
                                        <button className="w-full py-2 bg-primary text-white rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm">
                                            เช่ามือถือ
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
             </div>
         ))}
      </div>
    </div>
  );
};

export default Events;
