import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Button } from './Button';

interface ProfileSetupProps {
  initialEmail: string;
  onComplete: (user: User) => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ initialEmail, onComplete }) => {
  const [formData, setFormData] = useState({
    category: 'Teaching' as 'Teaching' | 'Non-Teaching',
    position: 'Instructor I',
    office: 'College of Information Technology',
    name: 'Juan Dela Cruz' // In real app, this comes from Google
  });

  const teachingPositions = [
    'Instructor I', 'Instructor II', 'Instructor III',
    'Assistant Professor I', 'Assistant Professor II', 'Assistant Professor III', 'Assistant Professor IV',
    'Associate Professor I', 'Associate Professor V',
    'Professor I', 'Professor VI',
    'Contract of Service (Faculty)'
  ];

  const nonTeachingPositions = [
    'Administrative Aide', 'Administrative Officer', 
    'Director', 'Unit Head', 'Driver', 'Guidance Counselor'
  ];

  const offices = [
    'College of Information Technology',
    'College of Education',
    'College of Arts and Sciences',
    'College of Business and Management',
    'HR Management Unit',
    'Office of the President',
    'General Services'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      id: 'u_' + Math.random().toString(36).substr(2, 9),
      googleId: 'g_123456789',
      email: initialEmail,
      name: formData.name,
      role: UserRole.Ratee,
      category: formData.category,
      position: formData.position,
      office: formData.office
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass max-w-2xl w-full p-8 rounded-2xl shadow-2xl relative z-10 border-t border-white/50">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Complete Your Profile</h2>
        <p className="text-gray-600 mb-8">To ensure the correct IPCR template and guidelines are applied, please verify your employment details.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="form-input input-glass p-3 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                        type="email" 
                        value={initialEmail}
                        disabled
                        className="form-input input-glass p-3 w-full opacity-60 cursor-not-allowed"
                    />
                </div>
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Personnel Category</label>
                <div className="grid grid-cols-2 gap-4">
                    <label className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center transition-all ${formData.category === 'Teaching' ? 'bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-200' : 'bg-white/50 border-gray-200 hover:bg-white'}`}>
                        <input 
                            type="radio" 
                            name="category" 
                            value="Teaching"
                            checked={formData.category === 'Teaching'}
                            onChange={() => setFormData({...formData, category: 'Teaching', position: teachingPositions[0]})}
                            className="sr-only"
                        />
                        <span className="font-bold text-blue-900">Teaching</span>
                        <span className="text-xs text-gray-500 mt-1">Faculty & Academic Staff</span>
                    </label>
                    <label className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center transition-all ${formData.category === 'Non-Teaching' ? 'bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-200' : 'bg-white/50 border-gray-200 hover:bg-white'}`}>
                        <input 
                            type="radio" 
                            name="category" 
                            value="Non-Teaching"
                            checked={formData.category === 'Non-Teaching'}
                            onChange={() => setFormData({...formData, category: 'Non-Teaching', position: nonTeachingPositions[0]})}
                            className="sr-only"
                        />
                        <span className="font-bold text-blue-900">Non-Teaching</span>
                        <span className="text-xs text-gray-500 mt-1">Admin & Support Staff</span>
                    </label>
                </div>
            </div>

            {/* Position & Office */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position / Rank</label>
                    <select 
                        value={formData.position}
                        onChange={e => setFormData({...formData, position: e.target.value})}
                        className="form-input input-glass p-3 w-full"
                    >
                        {(formData.category === 'Teaching' ? teachingPositions : nonTeachingPositions).map(pos => (
                            <option key={pos} value={pos}>{pos}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Office / College</label>
                    <select 
                        value={formData.office}
                        onChange={e => setFormData({...formData, office: e.target.value})}
                        className="form-input input-glass p-3 w-full"
                    >
                        {offices.map(off => (
                            <option key={off} value={off}>{off}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="pt-4">
                <Button type="submit" size="lg" className="w-full">
                    Confirm & Enter Dashboard
                </Button>
            </div>
        </form>
      </div>
    </div>
  );
};