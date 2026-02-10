import React from 'react';
import { LayoutDashboard, FileText, Calendar, LogOut } from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
  user?: User | null;
}

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate, user }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create', label: 'Create IPCR', icon: FileText },
    { id: 'calendar', label: 'SPMS Calendar', icon: Calendar },
  ];

  const userInitials = user ? user.name.split(' ').map(n => n[0]).join('').substring(0,2) : 'JD';

  return (
    <div className="min-h-screen flex text-gray-800">
      {/* Sidebar - Glass Dark */}
      <div className="w-72 glass-dark text-white flex-shrink-0 hidden md:flex flex-col z-20">
        <div className="p-8 relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 flex items-center space-x-3">
             <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 shadow-lg flex items-center justify-center text-blue-900 font-bold text-xl border-2 border-white/30">
                P
             </div>
             <div>
                <h1 className="text-xl font-bold tracking-tight text-white drop-shadow-md">ParSU IPCR</h1>
                <p className="text-xs text-blue-100 mt-0.5 opacity-80">FY 2026 System</p>
             </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-yellow-500/90 to-yellow-600/90 text-white shadow-lg shadow-yellow-500/20 border border-yellow-400/50' 
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={20} className={isActive ? "text-white" : "text-blue-200 group-hover:text-white"} />
                <span className="font-medium tracking-wide">{item.label}</span>
                {isActive && <div className="absolute right-3 w-2 h-2 bg-white rounded-full shadow-inner"></div>}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10 bg-black/10 backdrop-blur-sm">
           <div className="flex items-center space-x-3 text-sm">
               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border border-white/30 shadow-md flex items-center justify-center font-bold text-white">
                  {userInitials}
               </div>
               <div className="flex-1 min-w-0">
                   <p className="font-semibold text-white truncate">{user?.name || 'Guest User'}</p>
                   <p className="text-xs text-blue-200 truncate">{user?.position || 'Not Set'}</p>
               </div>
               <button className="text-blue-200 hover:text-white transition-colors" title="Sign Out" onClick={() => window.location.reload()}>
                  <LogOut size={18} />
               </button>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative">
         {/* Background Orbs/Decorations fixed to content area to give depth */}
         <div className="fixed top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none mix-blend-overlay"></div>
         <div className="fixed bottom-20 left-64 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none mix-blend-overlay"></div>
         
         <div className="relative z-10">
            {children}
         </div>
      </div>
    </div>
  );
};