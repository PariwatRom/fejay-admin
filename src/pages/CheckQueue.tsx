import React, { useState, useRef, useEffect } from 'react';
import { apiGetBookingStatus } from '../mockApi';
import { BookingResponse, Event } from '../types';
import { EVENTS } from '../constants';
import QueueDetail from './QueueDetail';

const CheckQueue: React.FC = () => {
  const [viewMode, setViewMode] = useState<'LIST' | 'SEARCH' | 'EVENTS'>('LIST');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [myTickets, setMyTickets] = useState<BookingResponse[]>([]);
  const [isScanMode, setIsScanMode] = useState(false);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<BookingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');

  useEffect(() => {
    if (viewMode === 'LIST') {
        const saved = localStorage.getItem('fejay_my_tickets');
        if (saved) {
            try {
                setMyTickets(JSON.parse(saved));
            } catch (e) {
                console.error("Error loading tickets", e);
            }
        }
    }
  }, [viewMode]);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
        setCameraError('');
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                } 
            });
        } catch (err) {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
            } catch (err2) {
                setCameraError('ไม่สามารถเข้าถึงกล้องได้');
                setCameraActive(false);
                return;
            }
        }

        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
                videoRef.current?.play().catch(e => console.error("Play error", e));
                setCameraActive(true);
            };
        }
    }

    function stopCamera() {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setCameraActive(false);
        }
    }

    if (viewMode === 'SEARCH' && isScanMode && !result) {
        startCamera();
    } else {
        stopCamera();
    }

    return () => {
        stopCamera();
    };
  }, [viewMode, isScanMode, result]);

  const handleSearch = async (searchCode: string) => {
    if (!searchCode) return;
    setLoading(true);
    setError('');
    setResult(null);

    setTimeout(async () => {
        const res = await apiGetBookingStatus(searchCode.toUpperCase());
        setLoading(false);
        
        if (res) {
            setResult(res);
        } else {
            setError('ไม่พบข้อมูลการจองนี้');
        }
    }, 1500);
  };

  const handleMockScan = () => {
    handleSearch('BK-123456');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setIsScanMode(false);
        setCameraActive(false);
        setLoading(true);
        setTimeout(() => {
             handleSearch('BK-123456'); 
        }, 1000);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const resetSearch = () => {
    setResult(null);
    setCode('');
    setError('');
    setIsScanMode(false);
  };

  const TicketCard: React.FC<{ item: BookingResponse }> = ({ item }) => (
    <div className="bg-white p-6 rounded-[32px] shadow-xl shadow-indigo-900/5 border border-slate-100 relative overflow-hidden animate-slideUp">
        <div className="absolute top-0 right-0 bg-indigo-50 text-primary text-[8px] font-black px-4 py-2 rounded-bl-2xl uppercase tracking-[0.2em] border-l border-b border-indigo-100">
            {item.status.replace('_', ' ')}
        </div>
        
        <div className="flex items-start mb-5">
            <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center text-2xl shadow-sm mr-4 ${item.status === 'PAID' ? 'bg-emerald-50 text-tech-success border border-emerald-100' : 'bg-amber-50 text-tech-warning border border-amber-100'}`}>
                {item.status === 'PAID' ? '✓' : '⏳'}
            </div>
            <div>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">BOOKING ID</p>
                <p className="text-xl font-black text-midnight tracking-tight">{item.bookingId}</p>
            </div>
        </div>

        <div className="bg-slate-50 rounded-[24px] p-5 space-y-4 border border-slate-100/50">
            <div>
                <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-1.5 opacity-60">EVENT</p>
                <p className="text-[11px] font-black text-slate-800 line-clamp-1 uppercase tracking-tight">{item.event}</p>
            </div>
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-1.5 opacity-60">MODEL</p>
                    <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{item.model}</p>
                </div>
                <div className="text-right">
                    <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-1.5 opacity-60">UNIT</p>
                    <p className="text-lg font-black text-primary tracking-tighter uppercase">UNIT-{item.unit}</p>
                </div>
            </div>
        </div>
        
        <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center">
            <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Payment Status</span>
                {item.remainingAmount > 0 ? (
                    <span className="text-tech-error font-black text-xs uppercase tracking-tight">Remaining: ฿{item.remainingAmount.toLocaleString()}</span>
                ) : (
                    <span className="text-tech-success font-black text-xs uppercase tracking-tight">Fully Paid</span>
                )}
            </div>
            <button className="bg-midnight text-white text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-midnight/10">
                View Ticket
            </button>
        </div>
    </div>
  );

  if (selectedEvent) {
    return <QueueDetail event={selectedEvent} onBack={() => setSelectedEvent(null)} />;
  }

  return (
    <div className="animate-fadeIn pb-24 pt-2 space-y-8">
      
      <div className="px-4 flex justify-between items-start">
         <div className="flex-1">
             <h2 className="text-2xl font-black text-midnight tracking-tight uppercase">
                 {viewMode === 'LIST' ? 'My Tickets' : viewMode === 'SEARCH' ? 'Search Booking' : 'Check Queue'}
             </h2>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                 {viewMode === 'LIST' ? 'Your active rental records' : viewMode === 'SEARCH' ? 'Find by ID or QR Code' : 'Real-time device availability'}
             </p>
         </div>
         <button 
            onClick={() => {
                if (viewMode === 'SEARCH') {
                    setViewMode('LIST');
                } else {
                    setViewMode('SEARCH');
                }
            }}
            className={`w-14 h-14 rounded-[20px] flex items-center justify-center text-xl shadow-xl transition-all active:scale-95 ${viewMode === 'SEARCH' ? 'bg-midnight text-white shadow-midnight/20' : 'bg-white text-slate-600 border border-slate-100 shadow-indigo-900/5 hover:border-primary/20'}`}
         >
            {viewMode === 'SEARCH' ? '✕' : '🔍'}
         </button>
      </div>

      {viewMode !== 'SEARCH' && (
        <div className="px-4">
            <div className="flex bg-white rounded-[24px] p-2 shadow-sm border border-slate-100">
                <button 
                    onClick={() => setViewMode('LIST')}
                    className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-[18px] transition-all ${viewMode === 'LIST' ? 'bg-midnight text-white shadow-xl shadow-midnight/20' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                    Tickets
                </button>
                <button 
                    onClick={() => setViewMode('EVENTS')}
                    className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-[18px] transition-all ${viewMode === 'EVENTS' ? 'bg-midnight text-white shadow-xl shadow-midnight/20' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                    Events
                </button>
            </div>
        </div>
      )}

      {viewMode === 'LIST' && (
          <div className="px-4 space-y-6">
              {myTickets.length > 0 ? (
                  myTickets.map((ticket, idx) => (
                      <TicketCard key={idx} item={ticket} />
                  ))
              ) : (
                  <div className="text-center py-24 opacity-40">
                      <p className="text-6xl mb-6">🎫</p>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">No active tickets</p>
                      <p className="text-[10px] text-slate-300 mt-3 uppercase tracking-widest">Book a device from the home screen</p>
                  </div>
              )}
          </div>
      )}

      {viewMode === 'SEARCH' && (
          <div className="space-y-8">
              
              {!result && (
                <div className="flex bg-white mx-4 p-2 rounded-full border border-slate-100 shadow-sm relative">
                    <button 
                        onClick={() => { setIsScanMode(false); setCameraActive(false); }}
                        className={`flex-1 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all z-10 ${!isScanMode ? 'text-white' : 'text-slate-400'}`}
                    >
                        Enter ID
                    </button>
                    <button 
                        onClick={() => setIsScanMode(true)}
                        className={`flex-1 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all z-10 ${isScanMode ? 'text-white' : 'text-slate-400'}`}
                    >
                        Scan QR
                    </button>
                    <div 
                        className={`absolute top-2 bottom-2 w-[calc(50%-8px)] bg-primary rounded-full transition-transform duration-300 ease-in-out shadow-lg shadow-primary/30 ${isScanMode ? 'translate-x-full left-2' : 'left-2'}`}
                    ></div>
                </div>
              )}

              {!isScanMode && !result && !loading && (
                  <div className="bg-white p-10 mx-4 rounded-[44px] shadow-2xl shadow-indigo-900/5 border border-slate-100 animate-slideUp">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-indigo-50 text-primary rounded-[28px] flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner border border-indigo-100/50">⌨️</div>
                        <h3 className="text-base font-black text-midnight uppercase tracking-widest">Enter Booking ID</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-2">Found in your confirmation screen</p>
                    </div>
                    
                    <input 
                    type="text" 
                    placeholder="e.g. FJ1234" 
                    className="w-full bg-slate-50 border-none rounded-[24px] p-6 text-center text-2xl font-black placeholder:text-slate-200 focus:ring-2 ring-primary/30 outline-none transition-all uppercase tracking-[0.3em] mb-8 shadow-inner"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    />

                    <button 
                    onClick={() => handleSearch(code)}
                    disabled={loading || !code}
                    className={`w-full py-6 rounded-[28px] font-black text-sm uppercase tracking-[0.2em] shadow-xl transition-all border-b-4 ${loading || !code ? 'bg-slate-100 text-slate-300 border-slate-200' : 'bg-midnight text-white border-indigo-900 active:scale-95 shadow-midnight/20'}`}
                    >
                    {loading ? 'Searching...' : 'Check Status'}
                    </button>
                    
                    {error && <p className="text-[10px] text-tech-error font-black mt-8 text-center bg-red-50 py-4 rounded-[24px] uppercase tracking-widest border border-red-100">{error}</p>}
                  </div>
              )}

              {isScanMode && !result && (
                  <div className="flex flex-col items-center space-y-8 animate-slideIn px-4">
                     <div className="relative w-full aspect-square bg-midnight rounded-[48px] overflow-hidden shadow-2xl border-4 border-white">
                        {cameraError ? (
                            <div className="w-full h-full flex flex-col items-center justify-center text-white/50 space-y-6 p-10 text-center">
                                <span className="text-5xl">⚠️</span>
                                <span className="text-[11px] font-black uppercase tracking-widest leading-relaxed">{cameraError}</span>
                                <button 
                                    onClick={triggerFileUpload}
                                    className="px-8 py-4 bg-white/10 rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md active:scale-95 transition-all"
                                >
                                    Upload Photo
                                </button>
                            </div>
                        ) : cameraActive ? (
                            <>
                                <video 
                                    ref={videoRef} 
                                    autoPlay 
                                    playsInline 
                                    muted
                                    onClick={handleMockScan} 
                                    className="w-full h-full object-cover opacity-80"
                                />
                                
                                <div className="absolute inset-0 border-[60px] border-midnight/40 pointer-events-none"></div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-64 h-64 border-2 border-white/30 rounded-[40px] relative">
                                        <div className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_20px_rgba(79,70,229,1)] animate-scanLine top-0"></div>
                                        {/* Corner Accents */}
                                        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl"></div>
                                        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl"></div>
                                        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl"></div>
                                        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl"></div>
                                    </div>
                                </div>
                                <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none">
                                    <p className="text-white text-[10px] font-black tracking-[0.3em] bg-midnight/40 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 uppercase">Scanning QR Code</p>
                                </div>

                                <div className="absolute top-8 right-8 z-20">
                                    <button 
                                        onClick={triggerFileUpload}
                                        className="w-14 h-14 bg-white/10 text-white rounded-[20px] flex items-center justify-center backdrop-blur-md border border-white/20 active:scale-95 transition-all shadow-xl"
                                    >
                                        <span className="text-2xl">🖼️</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 space-y-5">
                                <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                <span className="text-[10px] font-black uppercase tracking-widest">Initializing Camera...</span>
                            </div>
                        )}
                     </div>
                     
                     <input 
                        type="file" 
                        ref={fileInputRef} 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileUpload} 
                     />
                     
                     {!cameraError && (
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center leading-relaxed">Center the QR code in the frame<br/>or upload a photo from gallery</p>
                     )}
                  </div>
              )}

              {loading && !result && (
                  <div className="flex flex-col items-center justify-center py-24 space-y-6">
                      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-xl shadow-primary/10"></div>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Verifying Records...</p>
                  </div>
              )}

              {result && (
                 <div className="px-4 animate-slideUp">
                    <div className="bg-white p-10 rounded-[48px] shadow-2xl shadow-indigo-900/10 border-2 border-indigo-50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-primary text-white text-[9px] font-black px-6 py-3 rounded-bl-[32px] uppercase tracking-[0.2em] shadow-lg">
                            {result.status.replace('_', ' ')}
                        </div>
                        
                        <div className="text-center mb-10 pt-8">
                            <div className="w-24 h-24 bg-tech-success text-white rounded-full flex items-center justify-center text-4xl mx-auto shadow-2xl shadow-emerald-500/20 mb-6 animate-popIn border-4 border-white">
                                ✓
                            </div>
                            <h2 className="text-xl font-black text-midnight uppercase tracking-tight">Booking Found</h2>
                            <p className="text-[11px] font-black text-slate-400 mt-2 uppercase tracking-widest">ID: {result.bookingId}</p>
                        </div>

                        <div className="space-y-5 bg-slate-50 p-8 rounded-[36px] border border-slate-100/50">
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 opacity-60">EVENT</p>
                                <p className="text-xs font-black text-midnight uppercase tracking-tight leading-relaxed">{result.event}</p>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 opacity-60">MODEL</p>
                                    <p className="text-xs font-black text-midnight uppercase tracking-tight">{result.model}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 opacity-60">UNIT</p>
                                    <p className="text-2xl font-black text-primary tracking-tighter uppercase">UNIT-{result.unit}</p>
                                </div>
                            </div>
                        </div>

                        <button 
                          onClick={resetSearch}
                          className="w-full mt-10 py-5 bg-slate-50 text-slate-400 rounded-[28px] font-black text-[11px] uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 border border-slate-100"
                        >
                          Search Another
                        </button>
                    </div>
                 </div>
              )}
          </div>
      )}

      {viewMode === 'EVENTS' && (
          <div className="px-4 pb-4">
              <div className="grid grid-cols-3 gap-4">
                    {EVENTS.map((ev, idx) => (
                        <div 
                            key={ev.id}
                            onClick={() => setSelectedEvent(ev)}
                            className="group flex flex-col bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-100 transition-all h-full cursor-pointer hover:shadow-xl hover:shadow-indigo-900/5 active:scale-95 hover:-translate-y-1.5 animate-slideUp"
                            style={{ animationDelay: `${idx * 0.05}s` }}
                        >
                            <div className="aspect-[2/3] w-full relative overflow-hidden bg-slate-50">
                                <img 
                                    src={ev.image} 
                                    alt={ev.name} 
                                    className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${ev.soldOut ? 'grayscale contrast-75' : ''}`} 
                                />

                                {ev.soldOut && (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-midnight/70 backdrop-blur-[2px]">
                                        <div className="bg-tech-error text-white font-black text-[8px] px-3 py-1.5 -rotate-12 border border-white/30 shadow-2xl tracking-widest uppercase whitespace-nowrap">
                                            SOLD OUT
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 flex flex-col flex-grow bg-white relative">
                                <h3 className="font-black text-[10px] leading-[1.5] text-midnight line-clamp-2 mb-4 h-[30px] uppercase tracking-tight">
                                    {ev.name}
                                </h3>
                                <div className="flex items-center mt-auto pt-3 border-t border-slate-50">
                                    <span className="text-[10px] mr-2 opacity-30">📅</span>
                                    <p className="text-[8px] text-slate-400 font-black line-clamp-1 uppercase tracking-tighter">
                                        {ev.date.split(' 25')[0] || ev.date.substring(0, 10)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
              </div>
              <p className="text-center text-[10px] font-black text-slate-300 mt-12 uppercase tracking-[0.3em] opacity-60">
                 Tap to view real-time availability
              </p>
          </div>
      )}

      <style>{`
        @keyframes scanLine {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
        .animate-scanLine {
            animation: scanLine 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CheckQueue;
