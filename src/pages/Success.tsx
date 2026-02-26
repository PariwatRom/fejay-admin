import React, { useEffect, useState, useRef } from 'react';

interface SuccessProps {
  bookingId: string;
  onFinish: () => void;
}

const Success: React.FC<SuccessProps> = ({ bookingId, onFinish }) => {
  const LINE_OA_URL = "https://line.me/R/ti/p/@FEJAY";
  const [countdown, setCountdown] = useState(10);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const generateAndSaveTicket = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsSaving(true);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 600;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Header
    ctx.fillStyle = '#0F172A'; // Midnight
    ctx.fillRect(0, 0, width, 180);

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${bookingId}`;
    const qrImg = new Image();
    qrImg.crossOrigin = "anonymous";
    qrImg.src = qrUrl;

    qrImg.onload = () => {
        // Header Text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '900 32px Arial';
        ctx.fillText('FEJAY TECH', 50, 70);
        
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#A78BFA'; // Violet 400
        ctx.fillText('OFFICIAL RENTAL TICKET', 50, 100);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(420, 45, 130, 45);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`#${bookingId.substring(0, 8)}`, 485, 75);
        ctx.textAlign = 'left';

        // Body
        ctx.fillStyle = '#64748B';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('BOOKING ID', 50, 240);
        ctx.fillStyle = '#0F172A';
        ctx.font = '900 24px Arial';
        ctx.fillText(bookingId, 50, 275);

        ctx.fillStyle = '#64748B';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('STATUS', 400, 240);
        ctx.fillStyle = '#22C55E';
        ctx.font = '900 24px Arial';
        ctx.fillText('CONFIRMED', 400, 275);

        // Perforation
        ctx.setLineDash([10, 10]);
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(40, 330);
        ctx.lineTo(560, 330);
        ctx.stroke();
        ctx.setLineDash([]);

        // QR Code
        const qrSize = 300;
        const qrX = (width - qrSize) / 2;
        const qrY = 380;
        ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#64748B';
        ctx.textAlign = 'center';
        ctx.fillText('Scan at pickup point', width / 2, 720);

        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `FEJAY-TECH-TICKET-${bookingId}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsSaving(false);
    };

    qrImg.onerror = () => {
        setIsSaving(false);
    };
  };

  useEffect(() => {
    const timerSave = setTimeout(() => {
        generateAndSaveTicket();
    }, 2000);

    const timerRedirect = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRedirect);
          window.location.href = LINE_OA_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
        clearTimeout(timerSave);
        clearInterval(timerRedirect);
    };
  }, [bookingId]);

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      <canvas ref={canvasRef} className="hidden"></canvas>

      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-tech-success text-white rounded-full flex items-center justify-center text-4xl mx-auto shadow-2xl shadow-emerald-500/30 animate-popIn border-4 border-white">✓</div>
        <h2 className="text-3xl font-black text-midnight tracking-tight uppercase">Booking Success!</h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Your ticket is being saved...</p>
      </div>

      {/* Digital Ticket */}
      <div className="relative bg-white rounded-[44px] shadow-2xl shadow-indigo-900/10 overflow-hidden border border-slate-100 animate-slideUp">
        {/* Ticket Header */}
        <div className="bg-midnight p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="flex justify-between items-start relative z-10">
                <div>
                    <h3 className="font-black text-xl tracking-tight uppercase">FEJAY TECH</h3>
                    <p className="text-[9px] font-black text-violet-300 uppercase tracking-[0.3em] mt-1">Official Rental Ticket</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest">#{bookingId.substring(0, 8)}</p>
                </div>
            </div>
        </div>

        {/* Ticket Body */}
        <div className="p-8 space-y-8 relative">
            {/* Perforation Effect */}
            <div className="absolute top-0 left-0 right-0 flex justify-between px-6 -translate-y-1/2">
                <div className="w-6 h-6 bg-slate-50 rounded-full shadow-inner"></div>
                <div className="w-6 h-6 bg-slate-50 rounded-full shadow-inner"></div>
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Booking ID</p>
                    <p className="text-sm font-black text-midnight uppercase truncate">{bookingId}</p>
                </div>
                <div className="space-y-1.5 text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                    <p className="text-sm font-black text-tech-success uppercase">CONFIRMED</p>
                </div>
            </div>

            <div className="border-t-2 border-dashed border-slate-100 pt-8 flex flex-col items-center">
                <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 shadow-inner mb-6">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${bookingId}`} alt="Ticket QR" className="w-40 h-40 mix-blend-multiply" />
                </div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Scan at pickup point</p>
            </div>
        </div>

        {/* Ticket Footer */}
        <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-center">
            <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">Valid only for the selected event date</p>
        </div>
      </div>

      <div className="space-y-4">
        <button 
            disabled={isSaving}
            onClick={generateAndSaveTicket}
            className="w-full py-5 bg-white text-midnight rounded-[24px] font-black text-sm uppercase tracking-[0.2em] shadow-lg border border-slate-100 active:scale-95 transition-all flex items-center justify-center space-x-3"
        >
            {isSaving ? (
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-slate-200 border-t-slate-400 rounded-full animate-spin"></div>
                    <span>Saving...</span>
                </div>
            ) : (
                <>
                    <span>💾</span>
                    <span>Save Ticket Again</span>
                </>
            )}
        </button>

        <div className="bg-indigo-900 p-6 rounded-[32px] text-white space-y-4 shadow-2xl shadow-indigo-900/20">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-xl">💬</div>
                    <div>
                        <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Contact Support</p>
                        <p className="text-xs font-bold uppercase">LINE OA: @fejaytech</p>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center text-[10px] font-black tabular-nums">
                    {countdown}s
                </div>
            </div>
            <a 
                href={LINE_OA_URL}
                className="block w-full py-4 bg-primary hover:bg-indigo-500 text-white rounded-[20px] font-black text-[10px] uppercase tracking-widest text-center transition-colors shadow-lg shadow-primary/20"
            >
                Add LINE Now
            </a>
        </div>

        <button 
            onClick={onFinish}
            className="w-full py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-primary transition-colors"
        >
            Back to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
