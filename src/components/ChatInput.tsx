import React, { useState, useEffect } from 'react';
import { Mic, Send, MicOff, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { useAppStore } from '../store';
import toast from 'react-hot-toast';

export const ChatInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcriptionProgress, setTranscriptionProgress] = useState(0);
  const { 
    addMessage, 
    isRecording, 
    setIsRecording, 
    isProcessing, 
    voiceType,
    adminMode,
    discoveryMode
  } = useAppStore();
  
  // Record timing counter
  useEffect(() => {
    let interval: number | null = null;
    if (isRecording) {
      interval = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    addMessage({
      content: inputValue,
      role: 'user',
    });
    
    setInputValue('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const toggleRecording = () => {
    // In a real implementation, this would use ElevenLabs STT
    // For the demo, we'll simulate recording
    if (!isRecording) {
      setIsRecording(true);
      
      // If in admin mode, show voice type toast
      if (adminMode) {
        toast.success(`Using ${voiceType} voice profile from ElevenLabs`, { 
          icon: '🎙️',
          duration: 3000,
          position: 'bottom-center',
          style: {
            borderRadius: '10px',
            background: '#f0f9ff',
            color: '#0c4a6e',
          },
        });
      }
      
      // Reset progress for new recording
      setTranscriptionProgress(0);
      
      // Simulate progressive transcription updates
      const progressInterval = setInterval(() => {
        setTranscriptionProgress(prev => {
          const newProgress = prev + 15;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
          }
          return Math.min(newProgress, 100);
        });
      }, 500);
      
      // Simulate recording for 3 seconds then "transcribe"
      setTimeout(() => {
        setIsRecording(false);
        
        // More realistic and diverse mock transcriptions
        const mockTranscriptions = [
          "I need help applying for asylum. I'm currently in Arizona and I arrived here three months ago.",
          "I'm trying to apply for a green card but I don't know where to start. I live in California with my family who are citizens.",
          "My landlord is trying to evict me without proper notice in New York. I'm a low-income tenant and need legal assistance.",
          "I think I might be facing discrimination at work because of my immigration status in Texas. My manager makes comments about my accent.",
          "I need help with my DACA renewal. I can't afford a private attorney and I'm worried about missing the deadline.",
          "My spouse and I are separating and we have children. We live in Florida and need help with custody arrangements.",
          "I was in a car accident in Georgia and the other driver's insurance won't cover my medical bills. What should I do?",
          "I'm being harassed by debt collectors in Michigan for a debt I don't think I owe. They call me multiple times a day.",
          "I need help understanding my rights as an immigrant worker in California. My employer is threatening to report me to ICE."
        ];
        
        // Weight towards immigration cases for demo purposes
        const immigrationWeight = 0.6;
        const randomValue = Math.random();
        let randomIndex;
        
        if (randomValue < immigrationWeight) {
          // Select from immigration-related examples (indices 0, 1, 4, 8)
          const immigrationIndices = [0, 1, 4, 8];
          randomIndex = immigrationIndices[Math.floor(Math.random() * immigrationIndices.length)];
        } else {
          // Select from other examples
          const otherIndices = [2, 3, 5, 6, 7];
          randomIndex = otherIndices[Math.floor(Math.random() * otherIndices.length)];
        }
        
        const randomTranscription = mockTranscriptions[randomIndex];
        setInputValue(randomTranscription);
      }, 3000);
    } else {
      setIsRecording(false);
      setTranscriptionProgress(0);
    }
  };

  // Determine placeholder text based on discovery mode
  const getPlaceholderText = () => {
    if (isRecording) {
      return `Listening... (${voiceType} voice via ElevenLabs)`;
    }
    
    if (discoveryMode) {
      return "Please provide more details about your situation...";
    }
    
    return "Tell me how I can help with your legal question...";
  };
  
  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`mr-2 ${isRecording ? 'text-red-500 animate-pulse' : ''}`}
          onClick={toggleRecording}
          disabled={isProcessing}
          aria-label={isRecording ? 'Stop recording' : 'Start recording'}
        >
          {isRecording ? (
            <MicOff className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>
        
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isRecording || isProcessing}
          placeholder={getPlaceholderText()}
          className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
        />
        
        <Button
          type="button"
          className="rounded-l-none"
          onClick={handleSendMessage}
          disabled={inputValue.trim() === '' || isRecording || isProcessing}
          aria-label="Send message"
        >
          {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </Button>
      </div>
      
      {isRecording && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-red-500 animate-pulse">
              Recording via ElevenLabs... {recordingTime}s
            </p>
            <p className="text-xs text-gray-500">Click mic icon to stop</p>
          </div>
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500 transition-all duration-300 ease-out" 
              style={{ width: `${recordingTime * 33}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {!isRecording && transcriptionProgress > 0 && transcriptionProgress < 100 && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-indigo-600">
              Transcribing audio...
            </p>
            <p className="text-xs text-gray-500">{transcriptionProgress}%</p>
          </div>
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300 ease-out" 
              style={{ width: `${transcriptionProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {isProcessing && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-indigo-600">
              Lisa is analyzing your legal question with Lyzr AI...
            </p>
          </div>
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};