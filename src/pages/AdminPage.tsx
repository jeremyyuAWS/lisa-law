import React, { useState } from 'react';
import { X, Save, Settings, Mic, User, Info, HelpCircle, MessageSquare, AlertTriangle, BarChart, PieChart } from 'lucide-react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { useAppStore } from '../store';
import { AgentPersonality, VoiceType } from '../types';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend);

interface AdminPageProps {
  onBack: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBack }) => {
  // State and function logic from store
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
  
  // Event handlers
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
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col max-w-4xl mx-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            <Settings className="h-5 w-5 text-indigo-600 mr-2" />
            Admin Settings
          </h2>
          <button 
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Tab Navigation */}
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
        
        {/* Page Content for each Tab */}
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
                  <div className="flex items-center">
                    <input
                      id="professional"
                      name="personality"
                      type="radio"
                      value="professional"
                      checked={agentPersonality === 'professional'}
                      onChange={handlePersonalityChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label htmlFor="professional" className="ml-3 block text-sm font-medium text-gray-700">
                      Professional
                      <p className="text-xs text-gray-500 mt-0.5">Formal, precise, and business-like communication style</p>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="friendly"
                      name="personality"
                      type="radio"
                      value="friendly"
                      checked={agentPersonality === 'friendly'}
                      onChange={handlePersonalityChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label htmlFor="friendly" className="ml-3 block text-sm font-medium text-gray-700">
                      Friendly
                      <p className="text-xs text-gray-500 mt-0.5">Warm, approachable, and conversational tone</p>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="empathetic"
                      name="personality"
                      type="radio"
                      value="empathetic"
                      checked={agentPersonality === 'empathetic'}
                      onChange={handlePersonalityChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label htmlFor="empathetic" className="ml-3 block text-sm font-medium text-gray-700">
                      Empathetic
                      <p className="text-xs text-gray-500 mt-0.5">Understanding, compassionate, and supportive approach</p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-indigo-700">A/B Testing Insights</h4>
                    <p className="text-xs text-indigo-600 mt-1">
                      Our tests show that the <strong>Empathetic</strong> personality performs best for immigration cases.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'voice' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">Voice Settings</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Configure the voice characteristics for audio responses.
                </p>
              </div>
              <div className="border-t border-b border-gray-200 py-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="natural"
                      name="voiceType"
                      type="radio"
                      value="natural"
                      checked={voiceType === 'natural'}
                      onChange={handleVoiceTypeChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label htmlFor="natural" className="ml-3 block text-sm font-medium text-gray-700">
                      Natural Voice
                      <p className="text-xs text-gray-500 mt-0.5">Human-like voice with natural intonation and rhythm</p>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="synthetic"
                      name="voiceType"
                      type="radio"
                      value="synthetic"
                      checked={voiceType === 'synthetic'}
                      onChange={handleVoiceTypeChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label htmlFor="synthetic" className="ml-3 block text-sm font-medium text-gray-700">
                      Synthetic Voice
                      <p className="text-xs text-gray-500 mt-0.5">Computer-generated voice that's clear and consistent</p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-700">Voice Feature Note</h4>
                    <p className="text-xs text-yellow-600 mt-1">
                      Natural voice requires more processing time but provides a better user experience.
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
                  Enable or disable specific features of the agent.
                </p>
              </div>
              <div className="border-t border-b border-gray-200 py-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Discovery Questions</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Allow Lisa to ask follow-up questions to gather more information
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleDiscoveryToggle}
                      className={`${
                        discoveryQuestionsEnabled ? 'bg-indigo-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    >
                      <span className="sr-only">Toggle discovery questions</span>
                      <span
                        aria-hidden="true"
                        className={`${
                          discoveryQuestionsEnabled ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-indigo-700">Feature Recommendation</h4>
                    <p className="text-xs text-indigo-600 mt-1">
                      We recommend keeping Discovery Questions enabled for better user assistance.
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
                  Customize the base instructions that guide Lisa's behavior and responses.
                </p>
              </div>
              <div className="border-t border-b border-gray-200 py-4">
                <textarea
                  value={localAgentInstructions}
                  onChange={(e) => setLocalAgentInstructions(e.target.value)}
                  rows={10}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter detailed instructions for the agent..."
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleInstructionsSave} className="flex items-center">
                  <Save className="h-4 w-4 mr-1" />
                  Save Instructions
                </Button>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-indigo-700">Instruction Tips</h4>
                    <p className="text-xs text-indigo-600 mt-1">
                      Be specific about how Lisa should handle different immigration scenarios. Include key phrases and responses for common questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">Usage Analytics</h3>
                <p className="text-sm text-gray-500 mt-1">
                  View metrics about how users are interacting with Lisa.
                </p>
              </div>
              <div className="border-t border-b border-gray-200 py-4">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Conversation Volume (Last 30 Days)</h4>
                    <div className="h-64">
                      <Bar 
                        data={{
                          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                          datasets: [
                            {
                              label: 'Conversations',
                              data: [65, 78, 92, 84],
                              backgroundColor: 'rgba(99, 102, 241, 0.5)',
                              borderColor: 'rgb(99, 102, 241)',
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">User Satisfaction Ratings</h4>
                    <div className="h-64">
                      <Line
                        data={{
                          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                          datasets: [
                            {
                              label: 'Average Rating',
                              data: [4.2, 4.3, 4.5, 4.4, 4.6, 4.7],
                              fill: false,
                              borderColor: 'rgb(99, 102, 241)',
                              tension: 0.1,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            y: {
                              min: 1,
                              max: 5,
                            },
                          },
                        }}
                      />
                    </div>
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
                  Compare performance metrics across different AI providers.
                </p>
              </div>
              <div className="border-t border-b border-gray-200 py-4">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Response Quality by Provider</h4>
                    <div className="h-64">
                      <Pie
                        data={{
                          labels: ['OpenAI', 'Anthropic', 'Google', 'Other'],
                          datasets: [
                            {
                              data: [45, 30, 20, 5],
                              backgroundColor: [
                                'rgba(99, 102, 241, 0.7)',
                                'rgba(79, 70, 229, 0.7)',
                                'rgba(67, 56, 202, 0.7)',
                                'rgba(55, 48, 163, 0.7)',
                              ],
                              borderColor: [
                                'rgb(99, 102, 241)',
                                'rgb(79, 70, 229)',
                                'rgb(67, 56, 202)',
                                'rgb(55, 48, 163)',
                              ],
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Response Time Comparison (ms)</h4>
                    <div className="h-64">
                      <Bar
                        data={{
                          labels: ['OpenAI', 'Anthropic', 'Google', 'Other'],
                          datasets: [
                            {
                              label: 'Average Response Time',
                              data: [320, 480, 290, 550],
                              backgroundColor: 'rgba(99, 102, 241, 0.5)',
                              borderColor: 'rgb(99, 102, 241)',
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          indexAxis: 'y',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 p-4 flex justify-end">
          <Button variant="outline" onClick={onBack} className="mr-2">
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;