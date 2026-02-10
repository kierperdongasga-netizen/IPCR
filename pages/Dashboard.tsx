import React from 'react';
import { IPCRStatus } from '../types';
import { Button } from '../components/Button';
import { FileText, Clock, CheckCircle, TrendingUp } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const myIPCRs = [
    { id: '1', period: 'Jan - Jun 2026', status: IPCRStatus.Draft, rating: null, lastUpdated: '2 hours ago' },
    { id: '2', period: 'Jul - Dec 2025', status: IPCRStatus.Finalized, rating: 4.65, lastUpdated: 'Jan 10, 2026' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
       <div className="flex justify-between items-center mb-10">
           <div>
              <h2 className="text-3xl font-bold text-white drop-shadow-sm">Dashboard</h2>
              <p className="text-blue-200 text-sm mt-1">Welcome back, Juan.</p>
           </div>
           <Button onClick={() => onNavigate('create')} size="lg" className="shadow-lg shadow-blue-900/20">+ New IPCR Form</Button>
       </div>

       {/* Stats Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           <div className="glass p-6 rounded-2xl relative overflow-hidden group">
               <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
               <div className="flex items-start justify-between relative z-10">
                   <div>
                       <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Current Period</p>
                       <p className="text-2xl font-bold text-gray-800 mt-1">Jan - Jun 2026</p>
                   </div>
                   <div className="p-3 bg-blue-100/50 rounded-xl text-blue-600">
                      <Clock size={24} />
                   </div>
               </div>
               <div className="mt-4 flex items-center text-sm">
                  <span className="text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded border border-red-100">Due: July 15, 2026</span>
               </div>
           </div>
           
           <div className="glass p-6 rounded-2xl relative overflow-hidden group">
               <div className="absolute right-0 top-0 w-24 h-24 bg-green-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
               <div className="flex items-start justify-between relative z-10">
                   <div>
                       <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Previous Rating</p>
                       <p className="text-2xl font-bold text-gray-800 mt-1">4.65</p>
                       <p className="text-sm text-green-600 font-medium">Outstanding</p>
                   </div>
                   <div className="p-3 bg-green-100/50 rounded-xl text-green-600">
                      <CheckCircle size={24} />
                   </div>
               </div>
               <p className="text-xs text-gray-400 mt-4">Jul - Dec 2025 Cycle</p>
           </div>

           <div className="glass p-6 rounded-2xl relative overflow-hidden group">
               <div className="absolute right-0 top-0 w-24 h-24 bg-yellow-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
               <div className="flex items-start justify-between relative z-10">
                   <div>
                       <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Performance Trend</p>
                       <p className="text-2xl font-bold text-gray-800 mt-1">+2.4%</p>
                   </div>
                   <div className="p-3 bg-yellow-100/50 rounded-xl text-yellow-600">
                      <TrendingUp size={24} />
                   </div>
               </div>
               <p className="text-xs text-gray-400 mt-4">vs. Previous Year</p>
           </div>
       </div>

       {/* List */}
       <div className="glass rounded-2xl overflow-hidden shadow-xl border border-white/60">
           <div className="px-8 py-6 border-b border-gray-200/50 bg-white/40">
               <h3 className="font-bold text-gray-800 text-lg">My IPCR Forms</h3>
           </div>
           <table className="min-w-full divide-y divide-gray-200/50">
               <thead className="bg-gray-50/50">
                   <tr>
                       <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Period</th>
                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Final Rating</th>
                       <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Updated</th>
                       <th className="px-8 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                   </tr>
               </thead>
               <tbody className="divide-y divide-gray-200/50 bg-white/30">
                   {myIPCRs.map((ipcr) => (
                       <tr key={ipcr.id} className="hover:bg-blue-50/40 transition-colors">
                           <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-3">
                               <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                                   <FileText size={18} className="text-blue-600" />
                               </div>
                               {ipcr.period}
                           </td>
                           <td className="px-6 py-5 whitespace-nowrap">
                               <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border 
                                   ${ipcr.status === IPCRStatus.Draft 
                                     ? 'bg-gray-100/80 text-gray-700 border-gray-200' 
                                     : 'bg-green-100/80 text-green-800 border-green-200'}`}>
                                   {ipcr.status}
                               </span>
                           </td>
                           <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-700">
                               {ipcr.rating ? ipcr.rating : '-'}
                           </td>
                           <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
                               {ipcr.lastUpdated}
                           </td>
                           <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                               <button 
                                onClick={() => onNavigate(ipcr.status === IPCRStatus.Draft ? 'create' : 'view')} 
                                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                               >
                                   {ipcr.status === IPCRStatus.Draft ? 'Edit Form' : 'View Details'}
                               </button>
                           </td>
                       </tr>
                   ))}
               </tbody>
           </table>
       </div>
    </div>
  );
};