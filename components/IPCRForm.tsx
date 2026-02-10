import React, { useState, useEffect } from 'react';
import { IPCRForm as IPCRFormType, IndicatorRow, MOVFile, IPCRStatus, User } from '../types';
import { MOVDrawer } from './MOVDrawer';
import { Button } from './Button';
import { calculateRowAverage, calculateSectionStats, calculateFinalRating } from '../utils/calculations';
import { Paperclip, Plus, Save, Send } from 'lucide-react';

interface IPCRFormProps {
  initialData: IPCRFormType;
  onSave: (data: IPCRFormType) => void;
  readOnly?: boolean;
  user: User | null;
}

export const IPCRForm: React.FC<IPCRFormProps> = ({ initialData, onSave, readOnly = false, user }) => {
  const [formData, setFormData] = useState<IPCRFormType>(initialData);
  const [activeMOVRow, setActiveMOVRow] = useState<IndicatorRow | null>(null);
  const [showNotification, setShowNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  useEffect(() => {
    if (showNotification) {
        const timer = setTimeout(() => setShowNotification(null), 5000);
        return () => clearTimeout(timer);
    }
  }, [showNotification]);

  // Auto-calculate whenever form data changes
  useEffect(() => {
    const updatedSections = formData.sections.map(section => {
      const updatedRows = section.rows.map(row => ({
        ...row,
        average: calculateRowAverage(row)
      }));
      return {
        ...section,
        rows: updatedRows,
        ...calculateSectionStats({ ...section, rows: updatedRows })
      };
    });

    const { finalRating, adjectivalRating } = calculateFinalRating(updatedSections);

    if (finalRating !== formData.finalRating) {
        setFormData(prev => ({
            ...prev,
            sections: updatedSections,
            finalRating,
            adjectivalRating
        }));
    }
  }, [formData.sections]);

  const handleRowChange = (sectionId: string, rowId: string, field: keyof IndicatorRow, value: any) => {
    if (readOnly) return;
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(sec => 
        sec.id === sectionId ? {
            ...sec,
            rows: sec.rows.map(row => row.id === rowId ? { ...row, [field]: value } : row)
        } : sec
      )
    }));
  };

  const handleUploadMOV = (files: File[]) => {
    if (!activeMOVRow) return;
    const sanitize = (str: string) => str.replace(/[^a-zA-Z0-9-_]/g, '_');
    const year = new Date().getFullYear();
    const office = sanitize(formData.office);
    const employee = sanitize(formData.userId); 
    const ipcrId = formData.id;
    const indicatorCode = activeMOVRow.indicatorCode ? sanitize(activeMOVRow.indicatorCode) : 'NO_CODE';

    const newMOVs: MOVFile[] = files.map(f => {
      const s3Path = `/${year}/${office}/${employee}/${ipcrId}/${indicatorCode}/${f.name}`;
      return {
        id: Math.random().toString(36).substr(2, 9),
        name: f.name,
        size: f.size,
        type: f.type || 'application/octet-stream',
        url: URL.createObjectURL(f), 
        s3Path: s3Path,
        uploadedAt: new Date().toISOString(),
        uploadedBy: formData.userName
      };
    });

    handleRowChange(
      formData.sections.find(s => s.rows.find(r => r.id === activeMOVRow.id))!.id,
      activeMOVRow.id,
      'movs',
      [...activeMOVRow.movs, ...newMOVs]
    );
    setActiveMOVRow(prev => prev ? ({ ...prev, movs: [...prev.movs, ...newMOVs] }) : null);
  };

  const handleDeleteMOV = (fileId: string) => {
    if (!activeMOVRow) return;
    handleRowChange(
      formData.sections.find(s => s.rows.find(r => r.id === activeMOVRow.id))!.id,
      activeMOVRow.id,
      'movs',
      activeMOVRow.movs.filter(m => m.id !== fileId)
    );
    setActiveMOVRow(prev => prev ? ({ ...prev, movs: prev.movs.filter(m => m.id !== fileId) }) : null);
  };

  const simulateEmailNotifications = () => {
      // Logic to trigger backend email service would go here
      const employeeEmail = user?.email || "employee@parsu.edu.ph";
      const supervisorEmail = "supervisor@parsu.edu.ph"; // In real app, derived from office/hierarchy
      
      setShowNotification({
          type: 'success',
          message: `IPCR Submitted! Email notifications sent to ${employeeEmail} and ${supervisorEmail}.`
      });
  };

  const handleSubmit = () => {
      const updatedForm = { ...formData, status: IPCRStatus.Submitted };
      simulateEmailNotifications();
      // Delay save slightly to let user see notification
      setTimeout(() => {
          onSave(updatedForm);
      }, 2000);
  };

  return (
    <div className="max-w-[95%] mx-auto p-4 md:p-8 pb-32">
      
      {/* Toast Notification */}
      {showNotification && (
          <div className="fixed top-4 right-4 z-50 animate-bounce">
              <div className="glass bg-green-500/90 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-green-400">
                  <div className="p-2 bg-white/20 rounded-full">
                      <Send size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Notification Sent</h4>
                    <p className="text-xs text-green-50">{showNotification.message}</p>
                  </div>
              </div>
          </div>
      )}

      {/* Glass Container */}
      <div className="glass rounded-2xl shadow-2xl overflow-hidden border border-white/60">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
             
             <div className="text-center relative z-10">
                <h1 className="text-2xl font-bold uppercase tracking-wide drop-shadow-md">Individual Performance Commitment and Review (IPCR)</h1>
                <p className="text-blue-200 mt-2 font-light text-lg">Partido State University</p>
                <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs uppercase font-bold tracking-wider border border-white/20">
                    {formData.templateType.replace('_', ' ')} Template
                </span>
             </div>
        </div>

        {/* Commitment Statement */}
        <div className="bg-white/50 backdrop-blur-sm p-6 border-b border-gray-200/50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-gray-800">
                <div className="max-w-4xl leading-relaxed">
                    <span className="text-2xl font-serif text-blue-900 mr-2">“</span>
                    I, <span className="font-bold text-blue-900 border-b border-blue-900/30 px-1">{formData.userName}</span> of the <span className="font-bold text-blue-900 border-b border-blue-900/30 px-1">{formData.office}</span> commit to deliver and agree to be rated on the following targets in accordance with the indicated measures for the period <span className="font-bold text-blue-900 border-b border-blue-900/30 px-1">{formData.periodStart} to {formData.periodEnd}</span>.
                </div>
                <div className="flex-shrink-0 bg-white/60 p-4 rounded-xl border border-white/60 shadow-sm text-center">
                    <p className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Date</p>
                    <p className="font-semibold text-blue-900">{new Date().toLocaleDateString()}</p>
                </div>
            </div>
        </div>

        {/* Main Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-900/90 text-white backdrop-blur-md">
              <tr>
                <th className="p-4 font-semibold border-r border-blue-800/50 w-1/5">MFOs / KRA</th>
                <th className="p-4 font-semibold border-r border-blue-800/50 w-1/5">Success Indicators</th>
                <th className="p-4 font-semibold border-r border-blue-800/50 w-1/4">Actual Accomplishments</th>
                <th className="p-2 font-semibold border-r border-blue-800/50 text-center w-12">Q</th>
                <th className="p-2 font-semibold border-r border-blue-800/50 text-center w-12">E</th>
                <th className="p-2 font-semibold border-r border-blue-800/50 text-center w-12">T</th>
                <th className="p-2 font-semibold border-r border-blue-800/50 text-center w-12">Ave</th>
                <th className="p-4 font-semibold border-r border-blue-800/50">Remarks</th>
                <th className="p-4 font-semibold text-center w-20">MOV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              {formData.sections.map((section) => (
                <React.Fragment key={section.id}>
                  {/* Section Header */}
                  <tr className="bg-blue-50/80 backdrop-blur-sm">
                    <td colSpan={9} className="p-3 px-4 font-bold text-blue-900 uppercase text-xs tracking-wider border-b border-blue-100">
                      {section.title} <span className="ml-2 px-2 py-0.5 bg-blue-200/50 rounded-full text-blue-800 text-[10px]">Weight: {(section.weight * 100).toFixed(0)}%</span>
                    </td>
                  </tr>
                  
                  {/* Rows */}
                  {section.rows.map((row) => (
                    <tr key={row.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="p-4 align-top text-gray-500 text-xs font-mono border-r border-gray-100">
                          {row.indicatorCode}
                      </td>
                      <td className="p-4 align-top border-r border-gray-100">
                        <div className="font-medium text-gray-900">{row.indicator}</div>
                        <div className="text-xs text-blue-600 mt-2 bg-blue-50/50 inline-block px-2 py-1 rounded border border-blue-100">
                            Target: {row.target}
                        </div>
                      </td>
                      <td className="p-4 align-top border-r border-gray-100">
                        {readOnly ? (
                            <div className="whitespace-pre-wrap text-gray-800">{row.actualAccomplishment || '-'}</div>
                        ) : (
                          <textarea 
                              className="input-glass w-full min-h-[80px] p-2 text-sm rounded-md focus:ring-2 focus:ring-blue-500/50 resize-y"
                              placeholder="Describe actual output..."
                              value={row.actualAccomplishment}
                              onChange={(e) => handleRowChange(section.id, row.id, 'actualAccomplishment', e.target.value)}
                          />
                        )}
                      </td>
                      {['ratingQ', 'ratingE', 'ratingT'].map((field) => (
                          <td key={field} className="p-2 align-top text-center border-r border-gray-100">
                            <input 
                                type="number" min="1" max="5" 
                                className="input-glass w-10 text-center p-1 rounded font-medium text-gray-900 disabled:opacity-50"
                                value={(row as any)[field] ?? ''} 
                                onChange={(e) => handleRowChange(section.id, row.id, field as any, parseFloat(e.target.value))}
                                disabled={readOnly}
                            />
                          </td>
                      ))}
                      <td className="p-2 align-top text-center font-bold text-blue-700 bg-blue-50/30 border-r border-gray-100 pt-3">
                        {row.average || '-'}
                      </td>
                      <td className="p-4 align-top border-r border-gray-100">
                          <input 
                              className="input-glass w-full text-xs p-1 rounded" 
                              placeholder="Add remarks..." 
                              value={row.remarks}
                              onChange={(e) => handleRowChange(section.id, row.id, 'remarks', e.target.value)}
                              disabled={readOnly}
                          />
                      </td>
                      <td className="p-4 align-top text-center">
                        <button 
                          onClick={() => setActiveMOVRow(row)}
                          className={`p-2 rounded-full transition-all duration-200 shadow-sm ${
                              row.movs.length > 0 
                              ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-green-200 hover:shadow-green-300 transform hover:scale-110' 
                              : 'bg-white border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-400'
                          } relative`}
                          title="Upload/View MOV"
                        >
                           <Paperclip size={18} />
                           {row.movs.length > 0 && (
                              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                  {row.movs.length}
                              </span>
                           )}
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {/* Section Summary */}
                  <tr className="bg-gray-50/50 text-xs">
                      <td colSpan={6} className="p-2 px-4 text-right font-semibold text-gray-500 uppercase tracking-wide">Avg {section.title}</td>
                      <td className="p-2 text-center font-bold text-gray-800">{section.averageRating}</td>
                      <td colSpan={2}></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
            
            {/* Footer Totals */}
            <tfoot className="bg-gray-900 text-white">
              <tr>
                <td colSpan={6} className="p-4 text-right font-bold uppercase tracking-wider text-gray-300">Final Average Rating</td>
                <td className="p-4 text-center font-bold text-xl bg-gray-800">{formData.finalRating}</td>
                <td colSpan={2} className="p-4 font-bold text-lg text-yellow-400 tracking-wide">{formData.adjectivalRating}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Signature Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
         {['Discussed With: Ratee', 'Assessed By: Supervisor', 'Recommending: VP', 'Final Rating: President'].map((role, idx) => (
             <div key={idx} className="glass p-6 rounded-xl text-center flex flex-col items-center justify-end min-h-[140px]">
                <p className="text-[10px] font-bold uppercase text-gray-400 mb-auto tracking-widest">{role.split(':')[0]}</p>
                <div className="w-full border-b border-gray-400 mb-2 mt-8"></div>
                <p className="text-xs font-bold text-gray-700">{role.split(':')[1]}</p>
             </div>
         ))}
      </div>
    
      {/* Floating Action Bar */}
      {!readOnly && (
         <div className="fixed bottom-6 right-6 flex gap-4 z-40">
            <Button variant="secondary" onClick={() => onSave({...formData, status: IPCRStatus.Draft})} className="shadow-lg backdrop-blur-md bg-white/80">
                <Save size={18} className="mr-2" /> Save Draft
            </Button>
            <Button onClick={handleSubmit} className="shadow-xl shadow-blue-900/40">
                Submit <Send size={18} className="ml-2" />
            </Button>
         </div>
      )}

      {/* MOV Drawer */}
      {activeMOVRow && (
        <MOVDrawer 
            isOpen={!!activeMOVRow} 
            row={activeMOVRow} 
            onClose={() => setActiveMOVRow(null)}
            onUpload={handleUploadMOV}
            onDelete={handleDeleteMOV}
        />
      )}
    </div>
  );
};