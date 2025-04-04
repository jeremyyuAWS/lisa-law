import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../store';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { AnalysisDisplay } from './AnalysisDisplay';
import { ProviderList } from './ProviderList';
import { DemoPresets } from './DemoPresets';
import { Button } from './ui/Button';
import { RefreshCw, Info, Scale, HelpCircle } from 'lucide-react';
import { WelcomeModal } from './WelcomeModal';

export const ChatContainer: React.FC = () => {
  const { messages, resetChat, isFirstVisit, setIsFirstVisit } = useAppStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(true);
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="flex flex-col h-full max-h-screen">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-medium text-gray-900 flex items-center">
          <Scale className="h-5 w-5 text-indigo-600 mr-2" />
          Lisa Law Assistant
        </h2>
        <div className="flex items-center">
          <div className="hidden sm:block mr-3">
            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
              Demo Mode
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetChat}
            className="text-gray-600"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setWelcomeModalOpen(true)}
            className="text-gray-600 ml-2"
            title="Help & Information"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        {isFirstVisit && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm text-blue-700 flex items-start">
            <Info className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Demo Information</p>
              <p className="mt-1">This is a demo of Lisa Law, an AI legal intake assistant. Try asking about immigration law issues, family law, or housing problems in different U.S. states.</p>
              <p className="mt-2">
                <button 
                  onClick={() => setWelcomeModalOpen(true)}
                  className="text-indigo-600 hover:text-indigo-800 font-medium underline"
                >
                  Learn more about features and capabilities
                </button>
              </p>
            </div>
          </div>
        )}
        
        {messages.length === 1 && <DemoPresets />}
        
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <AnalysisDisplay />
      <ProviderList />
      <ChatInput />
      
      <WelcomeModal isOpen={welcomeModalOpen} onClose={() => setWelcomeModalOpen(false)} />
    </div>
  );
};