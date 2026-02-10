import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { IPCRForm } from './components/IPCRForm';
import { Login } from './components/Login';
import { ProfileSetup } from './components/ProfileSetup';
import { SEED_TEMPLATES, SPMS_CALENDAR } from './constants';
import { IPCRForm as IPCRFormType, TemplateType, IPCRStatus, User } from './types';

const CalendarPage = () => (
    <div className="p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white drop-shadow-sm mb-6">SPMS Calendar FY 2026</h2>
        <div className="glass rounded-2xl shadow-xl overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50/80">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Period</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Activity</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Deadline</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Responsible</th>
                    </tr>
                </thead>
                <tbody className="bg-white/50 divide-y divide-gray-200/50">
                    {SPMS_CALENDAR.map((event, i) => (
                        <tr key={i} className="hover:bg-blue-50/20">
                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{event.period}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{event.activity}</td>
                            <td className="px-6 py-4 text-sm text-red-600 font-bold bg-red-50/50 rounded inline-block my-2 px-2">{event.deadline}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 italic">{event.actors}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tempEmail, setTempEmail] = useState<string>('');
  const [viewState, setViewState] = useState<'login' | 'profile' | 'app'>('login');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeForm, setActiveForm] = useState<IPCRFormType | null>(null);

  // 1. Login Handler
  const handleLogin = () => {
    // Simulate getting email from Google
    const mockEmail = "juan.delacruz@parsu.edu.ph";
    setTempEmail(mockEmail);
    // Check if user profile exists (mock check)
    // For demo, we assume no profile exists first time
    setViewState('profile');
  };

  // 2. Profile Complete Handler
  const handleProfileComplete = (profile: User) => {
    setUser(profile);
    setViewState('app');
  };

  // 3. Logic to determine correct template
  const getTemplateForUser = (user: User): TemplateType => {
    if (user.category === 'Non-Teaching') {
        return TemplateType.NonTeaching;
    }
    const pos = user.position.toLowerCase();
    if (pos.includes('contract') || pos.includes('cos')) return TemplateType.Teaching_COS;
    if (pos.includes('associate') || pos.includes('professor') && !pos.includes('assistant')) return TemplateType.Teaching_AssocProf;
    return TemplateType.Teaching_Instructor;
  };

  const handleCreateForm = () => {
    if (!user) return;
    
    const templateType = getTemplateForUser(user);
    const template = SEED_TEMPLATES[templateType];

    const newForm: IPCRFormType = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      position: user.position,
      office: user.office,
      periodStart: 'January 2026',
      periodEnd: 'June 2026',
      year: 2026,
      templateType: templateType,
      status: IPCRStatus.Draft,
      sections: template.sections || [],
      finalRating: 0,
      adjectivalRating: 'Poor',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      auditLogs: [],
      approvals: {}
    };

    setActiveForm(newForm);
    setCurrentPage('create');
  };

  const handleSaveForm = (data: IPCRFormType) => {
    console.log('Saving form data:', data);
    // Logic to save to DB would go here
    setActiveForm(null);
    setCurrentPage('dashboard');
  };

  if (viewState === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  if (viewState === 'profile') {
    return <ProfileSetup initialEmail={tempEmail} onComplete={handleProfileComplete} />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={(page) => {
            if (page === 'create') handleCreateForm();
            else setCurrentPage(page);
        }} />;
      case 'create':
        return activeForm ? <IPCRForm initialData={activeForm} onSave={handleSaveForm} user={user} /> : <div>Error loading form</div>;
      case 'calendar':
        return <CalendarPage />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout activePage={currentPage} onNavigate={setCurrentPage} user={user}>
      {renderContent()}
    </Layout>
  );
};

export default App;
