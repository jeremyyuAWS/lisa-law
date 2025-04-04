import React from 'react';
import { Message } from '../types';
import { Scale, User, HelpCircle } from 'lucide-react';
import { useAppStore } from '../store';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  const { agentPersonality } = useAppStore();
  
  // Different styling for discovery questions
  const isDiscoveryQuestion = message.isDiscoveryQuestion;
  
  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`
        flex max-w-[80%] md:max-w-[70%]
        ${isAssistant 
          ? isDiscoveryQuestion 
            ? 'bg-indigo-50 border border-indigo-200' 
            : 'bg-white border border-gray-200' 
          : 'bg-indigo-600 text-white'
        }
        rounded-lg p-3 shadow-sm
      `}>
        <div className={`
          flex-shrink-0 mr-3
          ${isAssistant 
            ? isDiscoveryQuestion 
              ? 'text-indigo-500' 
              : 'text-indigo-600' 
            : 'text-white'}
        `}>
          {isAssistant ? (
            isDiscoveryQuestion ? (
              <HelpCircle className="h-5 w-5" />
            ) : (
              <Scale className="h-5 w-5" />
            )
          ) : (
            <User className="h-5 w-5" />
          )}
        </div>
        <div>
          <p className={`text-sm ${isAssistant 
            ? isDiscoveryQuestion 
              ? 'text-indigo-700' 
              : 'text-gray-800' 
            : 'text-white'}`}
          >
            {message.content}
          </p>
          <div className="flex justify-between items-center mt-1">
            <p className={`text-xs ${isAssistant 
              ? isDiscoveryQuestion 
                ? 'text-indigo-400' 
                : 'text-gray-500' 
              : 'text-indigo-200'}`}
            >
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            
            {isAssistant && (
              <p className="text-xs text-indigo-500 ml-3">
                {isDiscoveryQuestion ? 'Discovery Question' : 'Powered by Lyzr AI'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};