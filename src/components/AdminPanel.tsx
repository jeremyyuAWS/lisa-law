import React, { useState } from 'react';
import { X, Save, Settings, Mic, User, Info, HelpCircle, MessageSquare, AlertTriangle, BarChart, PieChart } from 'lucide-react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend);
import { useAppStore } from '../store';
import { AgentPersonality, VoiceType } from '../types';
import { Button } from './ui/Button';
import toast from 'react-hot-toast';

interface AdminPanelProps {
  onClose: () => void;
}

// Helper component for radio option group
interface RadioOptionProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  description: string;
}

const RadioOption: React.FC<RadioOptionProps> = ({ id, name, value, checked, onChange, label, description }) => (
  <div className="relative flex items-start">
    <div className="flex items-center h-5">
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
      />
    </div>
    <div className="ml-3 text-sm">
      <label htmlFor={id} className={`font-medium ${checked ? 'text-indigo-700' : 'text-gray-700'}`}>
        {label}
      </label>
      <p className="text-gray-500">{description}</p>
    </div>
  </div>
);

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { 
    agentPersonality, 
    setAgentPersonality, 
    voiceType, 
    setVoiceType,
    discoveryQuestionsEnabled,
    setDiscoveryQuestionsEnabled,
    agentInstructions,
    setAgentInstructions
  } = useAppStore();
  
  const [currentTab, setCurrentTab] = useState<'personality' | 'voice' | 'features' | 'instructions' | 'analytics' | 'comparison'>('personality');
  const [localAgentInstructions, setLocalAgentInstructions] = useState(agentInstructions);
  
  const handlePersonalityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgentPersonality(e.target.value as AgentPersonality);
  };
  
  const handleVoiceTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoiceType(e.target.value as VoiceType);
  };
  
  const handleDiscoveryToggle = () => {
    setDiscoveryQuestionsEnabled(!discoveryQuestionsEnabled);
  };
  
  const handleInstructionsSave = () => {
    setAgentInstructions(localAgentInstructions);
    toast.success('Agent instructions updated successfully', {
      icon: '📝',
      position: 'bottom-center',
    });
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            <Settings className="h-5 w-5 text-indigo-600 mr-2" />
            Admin Settings
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
            className={`px-4 py-2 font-medium text-sm ${currentTab === 'personality' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setCurrentTab('personality')}
          >
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              Personality
            </div>
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${currentTab === 'voice' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setCurrentTab('voice')}
          >
            <div className="flex items-center">
              <Mic className="h-4 w-4 mr-1" />
              Voice
            </div>
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${currentTab === 'features' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setCurrentTab('features')}
          >
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              Features
            </div>
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${currentTab === 'instructions' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setCurrentTab('instructions')}
          >
            <div className="flex items-center">
              <Info className="h-4 w-4 mr-1" />
              Instructions
            </div>
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${currentTab === 'analytics' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setCurrentTab('analytics')}
          >
            <div className="flex items-center">
              <BarChart className="h-4 w-4 mr-1" />
              Analytics
            </div>
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${currentTab === 'comparison' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setCurrentTab('comparison')}
          >
            <div className="flex items-center">
              <PieChart className="h-4 w-4 mr-1" />
              Provider Comparison
            </div>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {currentTab === 'personality' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">Agent Personality</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Choose how Lisa interacts with users. This affects the tone and style of responses.
                </p>
              </div>
              
              <div className="border-t border-b border-gray-200 py-4">
                <div className="space-y-4">
                  <RadioOption
                    id="personality-empathetic"
                    name="personality"
                    value="empathetic"
                    checked={agentPersonality === 'empathetic'}
                    onChange={handlePersonalityChange}
                    label="Empathetic"
                    description="Warm, understanding tone that acknowledges emotions and focuses on user comfort."
                  />
                  <RadioOption
                    id="personality-professional"
                    name="personality"
                    value="professional"
                    checked={agentPersonality === 'professional'}
                    onChange={handlePersonalityChange}
                    label="Professional"
                    description="Formal, polished tone that emphasizes expertise and precision."
                  />
                  <RadioOption
                    id="personality-direct"
                    name="personality"
                    value="direct"
                    checked={agentPersonality === 'direct'}
                    onChange={handlePersonalityChange}
                    label="Direct"
                    description="Brief, straightforward responses that prioritize efficiency."
                  />
                </div>
              </div>
              
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-indigo-700">A/B Testing Insights</h4>
                    <p className="text-xs text-indigo-600 mt-1">
                      Our tests show that the <strong>Empathetic</strong> personality performs best for immigration cases, with 24% higher engagement than other styles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentTab === 'voice' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">Voice Type</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Select the voice style used by ElevenLabs for text-to-speech conversion.
                </p>
              </div>
              
              <div className="border-t border-b border-gray-200 py-4">
                <div className="space-y-4">
                  <RadioOption
                    id="voice-friendly"
                    name="voice"
                    value="friendly"
                    checked={voiceType === 'friendly'}
                    onChange={handleVoiceTypeChange}
                    label="Friendly"
                    description="Warm, approachable voice with a conversational style."
                  />
                  <RadioOption
                    id="voice-authoritative"
                    name="voice"
                    value="authoritative"
                    checked={voiceType === 'authoritative'}
                    onChange={handleVoiceTypeChange}
                    label="Authoritative"
                    description="Confident, knowledgeable voice that conveys expertise."
                  />
                  <RadioOption
                    id="voice-neutral"
                    name="voice"
                    value="neutral"
                    checked={voiceType === 'neutral'}
                    onChange={handleVoiceTypeChange}
                    label="Neutral"
                    description="Balanced, even-toned voice that maintains consistent delivery."
                  />
                </div>
              </div>
              
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-indigo-700">ElevenLabs Voice Models</h4>
                    <p className="text-xs text-indigo-600 mt-1">
                      In production, each voice type would use a different ElevenLabs voice model optimized for that style. User satisfaction is highest with the <strong>Friendly</strong> voice type.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentTab === 'features' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">Feature Settings</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Enable or disable specific features of the Lisa Law assistant.
                </p>
              </div>
              
              <div className="border-t border-b border-gray-200 py-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Discovery Questions</h4>
                      <p className="text-xs text-gray-500">
                        Follow-up questions to gather more detailed information about user's legal situation.
                      </p>
                    </div>
                    <button 
                      onClick={handleDiscoveryToggle}
                      className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${discoveryQuestionsEnabled ? 'bg-indigo-600' : 'bg-gray-200'}`}
                      aria-pressed={discoveryQuestionsEnabled}
                    >
                      <span className="sr-only">Toggle discovery questions</span>
                      <span 
                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${discoveryQuestionsEnabled ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-amber-700">Discovery Questions Impact</h4>
                    <p className="text-xs text-amber-600 mt-1">
                      Disabling discovery questions will reduce qualification accuracy by approximately 24%, but may lead to faster completions. For legal intake, we recommend keeping this feature enabled.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentTab === 'instructions' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">Agent Instructions</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Modify the core instructions that guide Lisa's behavior and priorities.
                </p>
              </div>
              
              <div>
                <textarea
                  value={localAgentInstructions}
                  onChange={(e) => setLocalAgentInstructions(e.target.value)}
                  className="w-full h-64 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Enter detailed instructions for the agent..."
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleInstructionsSave}>
                  <Save className="h-4 w-4 mr-1" />
                  Save Instructions
                </Button>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-700">Instruction Guidelines</h4>
                    <p className="text-xs text-blue-600 mt-1">
                      Instructions should include the agent's role, primary goals, response style, and priority focus areas. Avoid technical jargon and keep instructions clear and concise.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">Performance Analytics</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Key metrics and performance indicators for the Lisa Law assistant.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Completion Rate</h4>
                  <div className="flex items-end space-x-2">
                    <div className="text-2xl font-bold text-indigo-600">78%</div>
                    <div className="text-xs text-green-600 flex items-center pb-1">
                      <span className="mr-1">↑</span>
                      <span>12%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Users who complete the full intake process</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Avg. Completion Time</h4>
                  <div className="flex items-end space-x-2">
                    <div className="text-2xl font-bold text-indigo-600">4:32</div>
                    <div className="text-xs text-green-600 flex items-center pb-1">
                      <span className="mr-1">↓</span>
                      <span>0:45</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Average time to complete intake (min:sec)</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Qualification Rate</h4>
                  <div className="flex items-end space-x-2">
                    <div className="text-2xl font-bold text-indigo-600">64%</div>
                    <div className="text-xs text-green-600 flex items-center pb-1">
                      <span className="mr-1">↑</span>
                      <span>8%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Leads that qualify for legal services</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">User Engagement</h3>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
                  {(() => {
                    const engagementData = {
                      labels: ['Initial Questions', 'Discovery', 'Documentation', 'Qualification', 'Next Steps'],
                      datasets: [
                        {
                          label: 'Completion %',
                          data: [98, 87, 76, 68, 62],
                          backgroundColor: 'rgba(79, 70, 229, 0.6)',
                          borderColor: 'rgba(79, 70, 229, 1)',
                          borderWidth: 1,
                        },
                      ],
                    };
                    
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
                          ticks: {
                            callback: function(value: any) {
                              return value + '%';
                            },
                          },
                        },
                      },
                    };
                    
                    return <Bar data={engagementData} options={barOptions} height={80} />;
                  })()}
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Funnel completion rates by stage of the intake process
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Conversion by Case Type</h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    {(() => {
                      const conversionData = {
                        labels: ['Immigration', 'Family', 'Employment', 'Criminal', 'Other'],
                        datasets: [
                          {
                            label: 'Conversion Rate',
                            data: [42, 28, 36, 19, 22],
                            backgroundColor: [
                              'rgba(79, 70, 229, 0.6)',
                              'rgba(59, 130, 246, 0.6)',
                              'rgba(16, 185, 129, 0.6)',
                              'rgba(245, 158, 11, 0.6)',
                              'rgba(107, 114, 128, 0.6)',
                            ],
                            borderColor: [
                              'rgba(79, 70, 229, 1)',
                              'rgba(59, 130, 246, 1)',
                              'rgba(16, 185, 129, 1)',
                              'rgba(245, 158, 11, 1)',
                              'rgba(107, 114, 128, 1)',
                            ],
                            borderWidth: 1,
                          },
                        ],
                      };
                      
                      return <Pie data={conversionData} height={100} />;
                    })()}
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Percentage of qualified leads by legal case category
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Weekly Trend</h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    {(() => {
                      const trendData = {
                        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                        datasets: [
                          {
                            label: 'Completion Rate',
                            data: [65, 68, 72, 78],
                            borderColor: 'rgba(79, 70, 229, 1)',
                            backgroundColor: 'rgba(79, 70, 229, 0.1)',
                            tension: 0.3,
                            fill: true,
                          },
                          {
                            label: 'Qualification Rate',
                            data: [48, 52, 58, 64],
                            borderColor: 'rgba(16, 185, 129, 1)',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            tension: 0.3,
                            fill: true,
                          },
                        ],
                      };
                      
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
                            ticks: {
                              callback: function(value: any) {
                                return value + '%';
                              },
                            },
                          },
                        },
                      };
                      
                      return <Line data={trendData} options={lineOptions} height={100} />;
                    })()}
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Weekly performance trends over the last month
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentTab === 'comparison' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">Provider Comparison</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Performance metrics comparing different AI providers and configurations.
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Provider
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Accuracy
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Latency
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cost
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">OpenAI GPT-4</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">94%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">1.2s</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">$$$</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">4.8/5</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">Anthropic Claude</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">92%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">1.4s</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">$$</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">4.6/5</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">Google Gemini</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">90%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">1.5s</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">$$</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">4.5/5</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">Mistral AI</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">88%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">1.0s</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">$</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">4.3/5</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Accuracy by Legal Domain</h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    {(() => {
                      const domainData = {
                        labels: ['Immigration', 'Family', 'Employment', 'Criminal', 'Other'],
                        datasets: [
                          {
                            label: 'OpenAI',
                            data: [96, 94, 92, 93, 91],
                            backgroundColor: 'rgba(79, 70, 229, 0.6)',
                            borderColor: 'rgba(79, 70, 229, 1)',
                            borderWidth: 1,
                          },
                          {
                            label: 'Anthropic',
                            data: [94, 93, 90, 91, 89],
                            backgroundColor: 'rgba(59, 130, 246, 0.6)',
                            borderColor: 'rgba(59, 130, 246, 1)',
                            borderWidth: 1,
                          },
                          {
                            label: 'Google',
                            data: [92, 91, 89, 88, 87],
                            backgroundColor: 'rgba(16, 185, 129, 0.6)',
                            borderColor: 'rgba(16, 185, 129, 1)',
                            borderWidth: 1,
                          },
                        ],
                      };
                      
                      const barOptions = {
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
                            ticks: {
                              callback: function(value: any) {
                                return value + '%';
                              },
                            },
                          },
                        },
                      };
                      
                      return <Bar data={domainData} options={barOptions} height={100} />;
                    })()}
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Accuracy comparison across different legal domains
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">Cost-Effectiveness Ratio</h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    {(() => {
                      const costData = {
                        labels: ['OpenAI', 'Anthropic', 'Google', 'Mistral'],
                        datasets: [
                          {
                            label: 'Cost-Effectiveness',
                            data: [78, 85, 82, 92],
                            backgroundColor: [
                              'rgba(79, 70, 229, 0.6)',
                              'rgba(59, 130, 246, 0.6)',
                              'rgba(16, 185, 129, 0.6)',
                              'rgba(245, 158, 11, 0.6)',
                            ],
                            borderColor: [
                              'rgba(79, 70, 229, 1)',
                              'rgba(59, 130, 246, 1)',
                              'rgba(16, 185, 129, 1)',
                              'rgba(245, 158, 11, 1)',
                            ],
                            borderWidth: 1,
                          },
                        ],
                      };
                      
                      return <Pie data={costData} height={100} />;
                    })()}
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Ratio of performance to cost (higher is better)
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-700">Provider Selection Insights</h4>
                    <p className="text-xs text-blue-600 mt-1">
                      Our testing shows that OpenAI GPT-4 provides the highest accuracy for legal intake, particularly for complex immigration cases. However, Mistral AI offers the best cost-effectiveness ratio for high-volume, straightforward cases. Consider a hybrid approach using OpenAI for complex cases and Mistral for simpler inquiries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 p-4 flex justify-end">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
