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
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${currentTab === 'features' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setCurrentTab('features')}
          >
            Features
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${currentTab === 'analytics' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setCurrentTab('analytics')}
          >
            Analytics
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${currentTab === 'comparison' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setCurrentTab('comparison')}
          >
            Provider Comparison
          </button>
          {adminMode && (
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${currentTab === 'admin' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
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
          
          {currentTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Analytics & Performance Metrics</h3>
                <p className="text-gray-600 mb-4">
                  Lisa Law tracks various metrics to measure effectiveness and improve service quality. The following analytics are available in admin mode.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <BarChart className="h-5 w-5 text-indigo-600 mr-2" />
                    Agent Personality Performance
                  </h4>
                  <div className="h-64">
                    <Bar data={engagementData} options={barOptions} />
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Empathetic personality consistently outperforms other styles with 24% higher engagement and 18% better conversion rates across all legal domains.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <PieChart className="h-5 w-5 text-indigo-600 mr-2" />
                    User Journey Distribution
                  </h4>
                  <div className="h-64">
                    <Pie data={conversionData} />
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    69% of users who interact with Lisa complete the legal intake process and receive appropriate referrals or follow-up.
                  </p>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                  <LineChart2 className="h-5 w-5 text-indigo-600 mr-2" />
                  Performance Trends (6-Week Period)
                </h4>
                <div className="h-64">
                  <Line data={trendData} options={lineOptions} />
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Legal aid referrals have increased by 25% over the 6-week period, while information completeness has improved by 21%.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Discovery Questions Effectiveness</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">With Discovery</p>
                    <p className="text-2xl font-bold text-indigo-600">87%</p>
                    <p className="text-xs text-gray-500">accurate referrals</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Without Discovery</p>
                    <p className="text-2xl font-bold text-gray-600">63%</p>
                    <p className="text-xs text-gray-500">accurate referrals</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Discovery questions improve referral accuracy by 24 percentage points across all legal domains.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Completion Rates by Legal Domain</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">Immigration Law</span>
                        <span className="text-sm font-medium text-gray-900">92%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">Family Law</span>
                        <span className="text-sm font-medium text-gray-900">84%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600" style={{ width: '84%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">Housing/Tenant Rights</span>
                        <span className="text-sm font-medium text-gray-900">88%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">Employment Law</span>
                        <span className="text-sm font-medium text-gray-900">79%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600" style={{ width: '79%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">Criminal Defense</span>
                        <span className="text-sm font-medium text-gray-900">76%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600" style={{ width: '76%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">User Satisfaction by Voice Type</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Friendly</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-2">4.8/5</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={`h-4 w-4 ${star <= 4.8 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Authoritative</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-2">4.2/5</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={`h-4 w-4 ${star <= 4.2 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Neutral</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-2">3.9/5</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={`h-4 w-4 ${star <= 3.9 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Key Performance Metrics</h5>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-50 p-2 rounded-lg text-center">
                        <div className="flex items-center justify-center text-indigo-600 mb-1">
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <p className="text-xs font-medium text-gray-700">Completion Rate</p>
                        <p className="text-lg font-bold text-indigo-700">78%</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg text-center">
                        <div className="flex items-center justify-center text-green-600 mb-1">
                          <Zap className="h-4 w-4" />
                        </div>
                        <p className="text-xs font-medium text-gray-700">Avg. Time</p>
                        <p className="text-lg font-bold text-green-700">4.2 min</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg text-center">
                        <div className="flex items-center justify-center text-amber-600 mb-1">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                        <p className="text-xs font-medium text-gray-700">Referral Rate</p>
                        <p className="text-lg font-bold text-amber-700">62%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentTab === 'comparison' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Voice Provider Comparison</h3>
                <p className="text-gray-600 mb-4">
                  Analysis of different voice recognition and text-to-speech providers to determine optimal quality and performance.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                  <BarChart className="h-5 w-5 text-indigo-600 mr-2" />
                  Voice Provider Performance Metrics
                </h4>
                <div className="h-64">
                  <Bar data={voiceProviderData} options={barOptions} />
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  ElevenLabs consistently outperforms other providers in both user satisfaction and transcription accuracy, especially for legal terminology.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <BarChart className="h-5 w-5 text-indigo-600 mr-2" />
                    Multilingual Performance
                  </h4>
                  <div className="h-64">
                    <Bar data={languagePerformanceData} options={barOptions} />
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Transcription accuracy varies by language, with English performing best at 97% accuracy and Arabic showing the most room for improvement.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Provider Strengths & Weaknesses</h4>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strengths</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Limitations</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">ElevenLabs</td>
                        <td className="px-3 py-2 text-sm text-gray-700">Natural speech, emotion recognition, legal terminology</td>
                        <td className="px-3 py-2 text-sm text-gray-700">Higher latency on long recordings</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">OpenAI</td>
                        <td className="px-3 py-2 text-sm text-gray-700">Fast processing, accent detection, background noise filtering</td>
                        <td className="px-3 py-2 text-sm text-gray-700">Lower accuracy with specialized terminology</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Anthropic</td>
                        <td className="px-3 py-2 text-sm text-gray-700">Context awareness, conversational flow, safety measures</td>
                        <td className="px-3 py-2 text-sm text-gray-700">Limited language support, higher cost</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Grok AI</td>
                        <td className="px-3 py-2 text-sm text-gray-700">Fast inference, good price-performance ratio</td>
                        <td className="px-3 py-2 text-sm text-gray-700">Lower multilingual capability, less natural phrasing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <Clock className="h-5 w-5 text-indigo-600 mr-2" />
                    Average Response Time
                  </h4>
                  <table className="min-w-full">
                    <tbody>
                      <tr>
                        <td className="py-2 text-sm text-gray-700">ElevenLabs</td>
                        <td className="py-2 text-sm text-right font-medium text-indigo-700">1.2s</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm text-gray-700">OpenAI</td>
                        <td className="py-2 text-sm text-right font-medium text-indigo-700">1.4s</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm text-gray-700">Anthropic</td>
                        <td className="py-2 text-sm text-right font-medium text-indigo-700">1.8s</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm text-gray-700">Grok AI</td>
                        <td className="py-2 text-sm text-right font-medium text-indigo-700">1.3s</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm text-gray-700">Deepgram</td>
                        <td className="py-2 text-sm text-right font-medium text-indigo-700">1.7s</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Legal Terminology Accuracy</h4>
                  <table className="min-w-full">
                    <tbody>
                      <tr>
                        <td className="py-2 text-sm text-gray-700">ElevenLabs</td>
                        <td className="py-2 text-sm text-right font-medium text-indigo-700">93%</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm text-gray-700">OpenAI</td>
                        <td className="py-2 text-sm text-right font-medium text-indigo-700">89%</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm text-gray-700">Anthropic</td>
                        <td className="py-2 text-sm text-right font-medium text-indigo-700">87%</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm text-gray-700">Grok AI</td>
                        <td className="py-2 text-sm text-right font-medium text-indigo-700">82%</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm text-gray-700">Deepgram</td>
                        <td className="py-2 text-sm text-right font-medium text-indigo-700">80%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Cost Efficiency (per 1000 interactions)</h4>
                  <table className="min-w-full">
                    <tbody>
                      <tr>
                        <td className="py-2 text-sm text-gray-700">ElevenLabs</td>
                        <td className="py-2 text-sm text-right font-medium text-amber-700">$32.50</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm text-gray-700">OpenAI</td>
                        <td className="py-2 text-sm text-right font-medium text-amber-700">$28.75</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm text-gray-700">Anthropic</td>
                        <td className="py-2 text-sm text-right font-medium text-amber-700">$37.20</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm text-gray-700">Grok AI</td>
                        <td className="py-2 text-sm text-right font-medium text-green-700">$22.40</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm text-gray-700">Deepgram</td>
                        <td className="py-2 text-sm text-right font-medium text-green-700">$19.80</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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