import React, { useState } from 'react';
import { IndicatorRow, MOVFile } from '../types';
import { Button } from './Button';
import { Upload, FileText, Trash2, X, Download, Eye, ShieldCheck } from 'lucide-react';

interface MOVDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  row: IndicatorRow;
  onUpload: (files: File[]) => void;
  onDelete: (fileId: string) => void;
}

export const MOVDrawer: React.FC<MOVDrawerProps> = ({ isOpen, onClose, row, onUpload, onDelete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<'files' | 'audit'>('files');

  if (!isOpen) return null;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(Array.from(e.target.files));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Blurred Backdrop */}
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-xl w-full flex">
        {/* Glass Drawer Content */}
        <div className="relative w-full h-full bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col border-l border-white/50">
          
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-blue-900 to-blue-800 text-white flex justify-between items-start shadow-md z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                 <ShieldCheck size={16} className="text-yellow-400" />
                 <h2 className="text-lg font-bold tracking-wide">Means of Verification</h2>
              </div>
              <p className="text-sm text-blue-200 line-clamp-2 leading-relaxed">{row.indicator}</p>
              {row.indicatorCode && <span className="inline-block bg-blue-950/50 border border-blue-500/30 text-[10px] px-2 py-0.5 rounded mt-2">{row.indicatorCode}</span>}
            </div>
            <button onClick={onClose} className="text-blue-200 hover:text-white transition-colors bg-white/10 p-1.5 rounded-full hover:bg-white/20">
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50/50">
              <button 
                onClick={() => setActiveTab('files')}
                className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'files' ? 'border-blue-600 text-blue-700 bg-blue-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Files & Uploads
              </button>
              <button 
                onClick={() => setActiveTab('audit')}
                className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'audit' ? 'border-blue-600 text-blue-700 bg-blue-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Audit Trail
              </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-transparent to-gray-50/50">
            
            {activeTab === 'files' && (
                <>
                    {/* Required Checklist */}
                    <div className="bg-yellow-50/80 border border-yellow-200 rounded-lg p-4 shadow-sm">
                    <h3 className="text-xs font-bold text-yellow-800 uppercase mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Required Documents
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-2 pl-2">
                        {row.requiredMOVChecklist.length > 0 ? (
                        row.requiredMOVChecklist.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <span className="text-yellow-500 mt-1">•</span> {item}
                            </li>
                        ))
                        ) : (
                        <li className="italic text-gray-500">No specific requirements listed.</li>
                        )}
                    </ul>
                    </div>

                    {/* Upload Area */}
                    <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 group ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-white'}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    >
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="h-8 w-8 text-blue-500" />
                    </div>
                    <p className="text-gray-900 font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1 mb-4">PDF, PNG, JPG, DOCX up to 10MB</p>
                    <label className="inline-block">
                        <span className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm cursor-pointer shadow-sm transition-colors">
                            Browse Files
                        </span>
                        <input type="file" multiple className="hidden" onChange={handleFileSelect} accept=".pdf,.jpg,.png,.docx" />
                    </label>
                    </div>

                    {/* Files List */}
                    <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                        Uploaded Files <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">{row.movs.length}</span>
                    </h3>
                    {row.movs.length === 0 ? (
                        <div className="text-center py-8 opacity-50">
                            <FileText size={48} className="mx-auto text-gray-300 mb-2" />
                            <p className="text-sm text-gray-500">No files uploaded yet.</p>
                        </div>
                    ) : (
                        <ul className="space-y-3">
                        {row.movs.map((file) => (
                            <li key={file.id} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between group">
                            <div className="flex items-center space-x-3 overflow-hidden">
                                <div className="p-2 bg-blue-50 rounded text-blue-600">
                                    <FileText size={20} />
                                </div>
                                <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-800 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    {new Date(file.uploadedAt).toLocaleDateString()} • {(file.size / 1024).toFixed(0)} KB
                                </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                <a href={file.url} target="_blank" rel="noreferrer" className="p-1.5 hover:bg-blue-50 text-blue-600 rounded" title="Preview">
                                    <Eye size={16} />
                                </a>
                                <a href={file.url} download className="p-1.5 hover:bg-green-50 text-green-600 rounded" title="Download">
                                    <Download size={16} />
                                </a>
                                <button onClick={() => onDelete(file.id)} className="p-1.5 hover:bg-red-50 text-red-600 rounded" title="Delete">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            </li>
                        ))}
                        </ul>
                    )}
                    </div>
                </>
            )}
            
            {activeTab === 'audit' && (
                <div className="text-center text-gray-500 py-10">
                    <p>Audit Trail implementation pending...</p>
                </div>
            )}

          </div>
          
          <div className="p-4 border-t bg-gray-50 flex justify-end">
            <Button onClick={onClose} variant="secondary">Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};