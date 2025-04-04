import React, { useState } from 'react';
import { useAppStore } from '../store';
import { ExternalLink, Phone, MapPin, Info, User, Calendar, Bookmark, Users, Star, ThumbsUp, Shield, RefreshCw } from 'lucide-react';
import { Button } from './ui/Button';

export const ProviderList: React.FC = () => {
  const { recommendedProviders, analysisResult, refreshProviders } = useAppStore();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);
  
  if (recommendedProviders.length === 0 || !analysisResult) return null;
  
  const handleContactClick = (providerId: string) => {
    setSelectedProvider(providerId);
    setContactModalOpen(true);
  };

  const handleScheduleClick = (providerId: string) => {
    setSelectedProvider(providerId);
    setScheduleModalOpen(true);
  };

  const toggleExpandProvider = (providerId: string) => {
    if (expandedProvider === providerId) {
      setExpandedProvider(null);
    } else {
      setExpandedProvider(providerId);
    }
  };
  
  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <User className="h-5 w-5 text-indigo-600 mr-2" />
          Recommended Legal Aid Providers
          {analysisResult.isLowIncome && (
            <span className="ml-2 text-xs text-green-600 font-normal">
              (Free/Low-Cost Services)
            </span>
          )}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={refreshProviders}
          className="text-xs text-gray-600"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Refresh
        </Button>
      </div>
      
      <div className="space-y-4">
        {recommendedProviders.map((provider) => (
          <div
            key={provider.id}
            className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden"
          >
            <div 
              className="p-4 cursor-pointer"
              onClick={() => toggleExpandProvider(provider.id)}
            >
              <div className="flex justify-between">
                <h4 className="text-md font-semibold text-indigo-700">{provider.name}</h4>
                <div className="flex items-center">
                  {provider.rating && (
                    <div className="flex items-center text-amber-500 mr-2">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-xs font-medium">{provider.rating}</span>
                    </div>
                  )}
                  {provider.reviewCount && (
                    <div className="flex items-center text-gray-500 text-xs">
                      <ThumbsUp className="h-3 w-3 mr-0.5" />
                      {provider.reviewCount}
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mt-1">{provider.description}</p>
              
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">{provider.address}</span>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-1">
                {provider.services.slice(0, 3).map((service, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {service}
                  </span>
                ))}
                {provider.services.length > 3 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                    +{provider.services.length - 3} more
                  </span>
                )}
              </div>
              
              {/* Highlights - only shown when expanded */}
              {expandedProvider === provider.id && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Shield className="h-4 w-4 mr-1 text-indigo-500" />
                    Why we recommend this provider
                  </h5>
                  <ul className="space-y-2">
                    <li className="flex items-start text-xs text-gray-600">
                      <div className="h-4 w-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-2 mt-0.5">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span>Specializes in {analysisResult.legalDomain} in {analysisResult.state}</span>
                    </li>
                    {analysisResult.isLowIncome && (
                      <li className="flex items-start text-xs text-gray-600">
                        <div className="h-4 w-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-2 mt-0.5">
                          <CheckCircle2 className="h-3 w-3" />
                        </div>
                        <span>Offers free or low-cost services for qualifying clients</span>
                      </li>
                    )}
                    <li className="flex items-start text-xs text-gray-600">
                      <div className="h-4 w-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-2 mt-0.5">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span>Has helped {Math.floor(Math.random() * 1000) + 500} clients with similar cases</span>
                    </li>
                    <li className="flex items-start text-xs text-gray-600">
                      <div className="h-4 w-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-2 mt-0.5">
                        <Users className="h-3 w-3" />
                      </div>
                      <span>Multilingual staff available (Spanish, {['Mandarin', 'Vietnamese', 'Arabic', 'French', 'Tagalog'][Math.floor(Math.random() * 5)]})</span>
                    </li>
                  </ul>
                  
                  {/* Staff availability */}
                  <div className="mt-3 p-2 bg-gray-50 rounded-md">
                    <h6 className="text-xs font-medium text-gray-700 mb-1">Next Available Appointments</h6>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="text-xs p-1 bg-white border border-gray-200 rounded text-center">Tomorrow</div>
                      <div className="text-xs p-1 bg-white border border-gray-200 rounded text-center">In 3 days</div>
                      <div className="text-xs p-1 bg-white border border-gray-200 rounded text-center">Next week</div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-4 flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleContactClick(provider.id);
                  }}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Contact
                </Button>
                
                <Button 
                  as="a" 
                  href={provider.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  variant="outline" 
                  size="sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Website
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleScheduleClick(provider.id);
                  }}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Bookmark className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {contactModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2 flex items-start">
                <Info className="h-4 w-4 mt-0.5 mr-1 text-indigo-600 flex-shrink-0" />
                <span>This is a demo application. In a real version, this would connect you with the legal aid provider.</span>
              </p>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="font-medium text-gray-800 mb-2">
                  {recommendedProviders.find(p => p.id === selectedProvider)?.name}
                </h4>
                <p className="text-gray-600 mb-2">
                  Phone: {recommendedProviders.find(p => p.id === selectedProvider)?.phone}
                </p>
                <p className="text-gray-600">
                  Website: <a 
                    href={recommendedProviders.find(p => p.id === selectedProvider)?.website} 
                    className="text-indigo-600 hover:underline" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {recommendedProviders.find(p => p.id === selectedProvider)?.website}
                  </a>
                </p>
                
                <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md">
                  <h5 className="text-sm font-medium text-green-800 mb-1">Pro Bono Services Available</h5>
                  <p className="text-xs text-green-700">
                    Based on your information, you may qualify for free legal services or representation.
                    Mention that Lisa Law AI referred you when you call.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setContactModalOpen(false)}>
                Close
              </Button>
              <Button onClick={() => setContactModalOpen(false)}>
                Save Contact
              </Button>
            </div>
          </div>
        </div>
      )}

      {scheduleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule Appointment</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-4 flex items-start">
                <Info className="h-4 w-4 mt-0.5 mr-1 text-indigo-600 flex-shrink-0" />
                <span>This is a demo feature. In a real application, you would be able to schedule an appointment with this legal aid provider.</span>
              </p>
              
              <div className="border border-gray-200 rounded-md p-3 mb-4">
                <h4 className="font-medium text-gray-800 mb-2">
                  {recommendedProviders.find(p => p.id === selectedProvider)?.name}
                </h4>
                <p className="text-sm text-gray-600 mb-1">Initial consultation: 30 minutes</p>
                <p className="text-sm text-gray-600 mb-1">Available: Weekdays 9am-5pm</p>
                
                <div className="mt-3 text-xs text-gray-500 bg-indigo-50 p-2 rounded flex items-start">
                  <Info className="h-3 w-3 mt-0.5 mr-1 text-indigo-500" />
                  <span>This provider specializes in {analysisResult.legalDomain.toLowerCase()} issues similar to yours.</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select a date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="text-xs py-2">Tomorrow<br/><span className="text-gray-500">Jun 12</span></Button>
                    <Button variant="outline" size="sm" className="text-xs py-2">Friday<br/><span className="text-gray-500">Jun 14</span></Button>
                    <Button variant="outline" size="sm" className="text-xs py-2">Monday<br/><span className="text-gray-500">Jun 17</span></Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select a time
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" size="sm" className="text-xs py-2">9:00 AM</Button>
                    <Button variant="outline" size="sm" className="text-xs py-2">11:00 AM</Button>
                    <Button variant="outline" size="sm" className="text-xs py-2">1:00 PM</Button>
                    <Button variant="outline" size="sm" className="text-xs py-2">3:00 PM</Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Consultation type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="text-xs py-2">In Person</Button>
                    <Button variant="outline" size="sm" className="text-xs py-2">Video Call</Button>
                    <Button variant="outline" size="sm" className="text-xs py-2">Phone Call</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setScheduleModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setScheduleModalOpen(false)}>
                Confirm Appointment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};