import React from 'react';
import { Button } from './Button';
import { Mail } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {/* Background Orbs */}
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl mix-blend-overlay"></div>
         <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl mix-blend-overlay"></div>
      </div>

      <div className="glass max-w-md w-full p-8 rounded-2xl shadow-2xl relative z-10 text-center border-t border-white/50">
        <div className="mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 shadow-lg flex items-center justify-center text-blue-900 font-bold text-3xl border-4 border-white/30 mx-auto mb-4">
                P
            </div>
            <h1 className="text-2xl font-bold text-blue-900">ParSU IPCR System</h1>
            <p className="text-gray-500 text-sm mt-2">FY 2026 Performance Review</p>
        </div>
        
        <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-6">Please sign in with your institutional Google Account to continue.</p>
            
            <Button onClick={onLogin} className="w-full flex items-center justify-center gap-3 py-3 shadow-lg hover:shadow-xl transition-all">
                <div className="bg-white p-1 rounded-full">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06