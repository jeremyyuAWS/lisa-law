import React, { useState } from 'react';
import { X, Info, Mic, Brain, LineChart, CheckSquare, Settings, Users, BarChart2, RefreshCw, Star, BarChart, PieChart, LineChart as LineChart2, TrendingUp, Zap, ArrowUpRight, Clock } from 'lucide-react';
import { useAppStore } from '../store';
import { Button } from './ui/Button';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const [currentTab, setCurrentTab] = useState<'features' | 'analytics' | 'admin' | 'comparison'>('features');
  const { adminMode } = useAppStore();
  
  if (!isOpen) return null;
  
  // Bar chart data for engagement by personality
  const engagementData = {
    labels: ['Empathetic', 'Professional', 'Direct'],
    datasets: [
      {
        label: 'User Engagement (%)',
        data: [83, 76, 68],
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgb(79, 70, 229)',
        borderWidth: 1,
      }
    ]
  };
  
  // Bar chart options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      }
    }
  };
  
  // Pie chart data for conversion distribution
  const conversionData = {
    labels: ['Completed Intake', 'Referred to Provider', 'Abandoned', 'Requested Follow-up'],
    datasets: [
      {
        data: [42, 27, 18, 13],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(249, 115, 22, 0.8)',
        ],
        borderColor: [
          'rgb(79, 70, 229)',
          'rgb(5, 150, 105)',
          'rgb(220, 38, 38)',
          'rgb(234, 88, 12)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Line chart data for performance trends
  const trendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Legal Aid Referrals',
        data: [48, 52, 57, 62, 68, 73],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Information Completeness',
        data: [65, 70, 76, 79, 83, 86],
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        tension: 0.3,
      },
    ],
  };
  
  // Line chart options
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      }
    }
  };
  
  // Voice provider comparison data
  const voiceProviderData = {
    labels: ['ElevenLabs', 'OpenAI', 'Anthropic', 'Grok AI', 'Deepgram'],
    datasets: [
      {
        label: 'User Satisfaction',
        data: [4.8, 4.5, 4.3, 3.9, 3.7],
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgb(79, 70, 229)',
        borderWidth: 1,
      },
      {
        label: 'Transcription Accuracy (%)',
        data: [94, 91, 89, 87, 85],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgb(5, 150, 105)',
        borderWidth: 1,
      }
    ]
  };
  
  // Multilingual performance data
  const languagePerformanceData = {
    labels: ['English', 'Spanish', 'Mandarin', 'Vietnamese', 'Arabic', 'Tagalog'],
    datasets: [
      {
        label: 'Transcription Accuracy (%)',
        data: [97, 93, 89, 86, 84, 88],
        backgroundColor: 'rgba(249, 115, 22, 0.6)',
        borderColor: 'rgb(234, 88, 12)',
        borderWidth: 1,
      }
    ]
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Info className="h-5 w-5 text-indigo-600 mr-2" />
            Lisa Law Assistant
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <button
            className={`px-6 py-2 font-medium text-sm whitespace-nowrap min-w-max ${currentTab === 'features' ? 'text-indigo-600 border-b-2 border-indigo-600 mb-[-1px] relative z-10' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setCurrentTab('features')}
          >
            Features
          </button>
          {adminMode && (
            <button
              className={`px-6 py-2 font-medium text-sm whitespace-nowrap min-w-max ${currentTab === 'admin' ? 'text-indigo-600 border-b-2 border-indigo-600 mb-[-1px] relative z-10' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setCurrentTab('admin')}
            >
              Admin Features
            </button>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {currentTab === 'features' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Welcome to Lisa Law AI Assistant</h3>
                <p className="text-gray-600 mb-4">
                  Lisa Law is an AI-powered legal intake assistant designed to help users identify their legal needs and connect them with appropriate legal resources.
                </p>
                
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
                  <p className="text-sm text-indigo-700">
                    This is a demo application showcasing how AI can improve access to legal services, with a focus on immigration law for low-income users.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                      <Mic className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h4 className="font-medium text-gray-900">Voice & Chat Input</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Speak directly to Lisa or type your legal questions. Voice recognition powered by ElevenLabs converts speech to text accurately.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                      <Brain className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h4 className="font-medium text-gray-900">AI Analysis</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Lyzr AI analyzes your situation to identify legal domains, detect your state, and determine if you qualify for low-income assistance.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                      <Users className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h4 className="font-medium text-gray-900">Legal Aid Provider Matching</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Get connected with the right legal aid organizations based on your legal needs, location, and financial situation.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                      <CheckSquare className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h4 className="font-medium text-gray-900">Document Checklists</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Receive customized document checklists based on your legal needs to help prepare for your legal consultation.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                      <LineChart className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h4 className="font-medium text-gray-900">Visual Timeline</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    See the expected timeline for your legal process, with estimated durations for each phase of your case.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                      <RefreshCw className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h4 className="font-medium text-gray-900">Discovery Questions</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Lisa asks follow-up questions based on your legal domain to gather all necessary information before making recommendations.
                  </p>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 mt-6">
                <h4 className="font-medium text-green-800 mb-2 flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  Immigration Law Focus
                </h4>
                <p className="text-sm text-green-700">
                  While Lisa can help with various legal matters, she specializes in immigration law cases, providing detailed guidance and resources for immigration-related legal needs.
                </p>
              </div>
            </div>
          )}
          
          {currentTab === 'admin' && adminMode && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Administrator Features</h3>
                <p className="text-gray-600 mb-4">
                  As an administrator, you have access to additional tools to customize the Lisa Law experience and analyze performance.
                </p>
                
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-700 flex items-center">
                    <Settings className="h-4 w-4 mr-1" />
                    <span>Access admin settings by clicking the gear icon in the top navigation bar.</span>
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-900 mb-2">A/B Testing Controls</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Test different agent personalities and voice types to determine which performs best for different legal domains.
                  </p>
                  <div className="text-xs text-indigo-600">
                    Settings → Agent Personality & Voice Type
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-900 mb-2">Discovery Questions</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Enable or disable the discovery questions feature, which improves qualification and lead generation.
                  </p>
                  <div className="text-xs text-indigo-600">
                    Settings → Toggle Discovery Questions
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-900 mb-2">Agent Instructions</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Modify the instructions that guide Lisa's behavior, including response style and priorities.
                  </p>
                  <div className="text-xs text-indigo-600">
                    Settings → Agent Instructions
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-900 mb-2">Performance Analytics</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    View detailed metrics about user engagement, conversion rates, and effectiveness across legal domains.
                  </p>
                  <div className="text-xs text-indigo-600">
                    Welcome Modal → Analytics Tab
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 mt-4">
                <h4 className="font-medium text-gray-900 mb-3">A/B Test Results</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voice + Personality</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Rating</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="bg-green-50">
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Friendly + Empathetic</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">92%</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">78%</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">4.8/5</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Authoritative + Professional</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">86%</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">72%</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">4.3/5</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Friendly + Professional</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">89%</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">75%</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">4.6/5</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Neutral + Direct</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">74%</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">68%</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">3.9/5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Best performing combination highlighted in green. Consider A/B testing with different legal domains for more specific insights.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Voice Provider Market Share</h4>
                  <div className="h-64 flex items-center justify-center">
                    <Pie data={{
                      labels: ['ElevenLabs', 'OpenAI', 'Anthropic', 'Grok AI', 'Others'],
                      datasets: [
                        {
                          data: [38, 27, 18, 12, 5],
                          backgroundColor: [
                            'rgba(99, 102, 241, 0.8)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(249, 115, 22, 0.8)',
                            'rgba(239, 68, 68, 0.8)',
                            'rgba(156, 163, 175, 0.8)',
                          ],
                          borderColor: [
                            'rgb(79, 70, 229)',
                            'rgb(5, 150, 105)',
                            'rgb(234, 88, 12)',
                            'rgb(220, 38, 38)',
                            'rgb(107, 114, 128)',
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }} />
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Legal Domain Distribution</h4>
                  <div className="h-64 flex items-center justify-center">
                    <Pie data={{
                      labels: ['Immigration Law', 'Housing/Tenant Rights', 'Family Law', 'Employment Law', 'Criminal Defense', 'Other'],
                      datasets: [
                        {
                          data: [42, 23, 15, 10, 8, 2],
                          backgroundColor: [
                            'rgba(99, 102, 241, 0.8)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(249, 115, 22, 0.8)',
                            'rgba(239, 68, 68, 0.8)',
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(156, 163, 175, 0.8)',
                          ],
                          borderColor: [
                            'rgb(79, 70, 229)',
                            'rgb(5, 150, 105)',
                            'rgb(234, 88, 12)',
                            'rgb(220, 38, 38)',
                            'rgb(37, 99, 235)',
                            'rgb(107, 114, 128)',
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 p-4 flex justify-end">
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};