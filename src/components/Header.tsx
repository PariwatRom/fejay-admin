import React from 'react';

interface HeaderProps {
  onBack?: () => void;
  title: string;
  onProfileClick?: () => void;
  user?: { displayName: string } | null;
}

const Header: React.FC<HeaderProps> = ({ onBack, title, onProfileClick, user }) => {
  return (
    <header className="bg-white px-5 py-4 sticky top-0 z-50 flex items-center justify-between border-b border-slate-50">
      <div className="flex items-center space-x-4">
        {onBack && (
          <button onClick={onBack} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-midnight shadow-sm hover:bg-blue-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        )}
        <h1 className="text-lg font-black text-midnight tracking-tight uppercase">{title}</h1>
      </div>
      
      {user && (
        <button 
          onClick={onProfileClick}
          className="w-10 h-10 rounded-full bg-white border-2 border-slate-100 shadow-sm overflow-hidden active:scale-90 transition-transform"
        >
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.displayName}`} alt="profile" />
        </button>
      )}
    </header>
  );
};

export default Header;
