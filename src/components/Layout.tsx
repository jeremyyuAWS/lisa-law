import React, { useState } from 'react';
import { Scale, Globe, Settings, HelpCircle } from 'lucide-react';
import { useAppStore } from '../store';
import { AdminPanel } from './AdminPanel';
import { WelcomeModal } from './WelcomeModal';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const { adminMode, setAdminMode } = useAppStore();

  const toggleAdminPanel = () => {
    if (!adminMode) {
      setAdminMode(true);
    }
    setAdminPanelOpen(!adminPanelOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">Lisa Law</h1>
              <div className="ml-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full">
                Demo
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center text-sm text-gray-500">
                <span>Powered by</span>
                <span className="ml-1 font-medium text-indigo-600">Lyzr AI</span>
                <span className="mx-1">+</span>
                <span className="font-medium text-indigo-600">ElevenLabs</span>
              </div>
              <button 
                className="text-gray-500 hover:text-indigo-600 transition-colors p-1 rounded-full"
                onClick={() => setWelcomeModalOpen(true)}
                title="Help & Information"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
              <button 
                className={`text-gray-500 hover:text-indigo-600 transition-colors p-1 rounded-full ${adminMode ? 'bg-indigo-100' : ''}`}
                onClick={toggleAdminPanel}
                title="Admin Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
              <button className="text-gray-500 hover:text-indigo-600 transition-colors">
                <Globe className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 relative">
        {children}
        
        {adminPanelOpen && <AdminPanel onClose={() => setAdminPanelOpen(false)} />}
        <WelcomeModal isOpen={welcomeModalOpen} onClose={() => setWelcomeModalOpen(false)} />
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-gray-500">
            Lisa Law AI is a demo application. Not for actual legal advice. © 2025
          </p>
          <p className="text-center text-xs text-gray-400 mt-1">
            Built with Bolt.new | UI by BuouUI
          </p>
        </div>
      </footer>
    </div>
  );
};