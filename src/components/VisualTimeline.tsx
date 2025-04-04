import React from 'react';
import { CheckCircle2, AlertCircle, Clock, Calendar, FileText, Users } from 'lucide-react';
import { useAppStore } from '../store';

export const VisualTimeline: React.FC = () => {
  const { analysisResult } = useAppStore();
  
  if (!analysisResult || !analysisResult.legalDomain) return null;
  
  // Different timeline steps based on legal domain
  const getTimelineSteps = () => {
    if (analysisResult.legalDomain === 'Immigration Law') {
      return [
        { 
          id: 1, 
          title: 'Initial Consultation', 
          description: 'Meet with an immigration attorney to discuss your case.',
          status: 'complete',
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          date: 'Today'
        },
        { 
          id: 2, 
          title: 'Document Collection', 
          description: 'Gather required documents and evidence for your case.',
          status: 'current',
          icon: <FileText className="h-5 w-5 text-indigo-600" />,
          date: '1-2 weeks'
        },
        { 
          id: 3, 
          title: 'Application Preparation', 
          description: 'Your legal team prepares and reviews your application.',
          status: 'upcoming',
          icon: <Clock className="h-5 w-5 text-gray-400" />,
          date: '2-4 weeks'
        },
        { 
          id: 4, 
          title: 'Filing & Submission', 
          description: 'Your application is filed with the appropriate immigration authorities.',
          status: 'upcoming',
          icon: <Clock className="h-5 w-5 text-gray-400" />,
          date: '4-6 weeks'
        },
        { 
          id: 5, 
          title: 'Case Monitoring', 
          description: 'Receive updates and monitor your case status.',
          status: 'upcoming',
          icon: <Clock className="h-5 w-5 text-gray-400" />,
          date: 'Ongoing'
        }
      ];
    } else if (analysisResult.legalDomain === 'Housing/Tenant Rights') {
      return [
        { 
          id: 1, 
          title: 'Initial Legal Advice', 
          description: 'Understand your rights and potential defenses.',
          status: 'complete',
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          date: 'Today'
        },
        { 
          id: 2, 
          title: 'Document Review', 
          description: 'Review lease, notices, and communications with landlord.',
          status: 'current',
          icon: <FileText className="h-5 w-5 text-indigo-600" />,
          date: '1-3 days'
        },
        { 
          id: 3, 
          title: 'Legal Response', 
          description: 'Prepare and file response to eviction notice if applicable.',
          status: 'upcoming',
          icon: <Clock className="h-5 w-5 text-gray-400" />,
          date: 'Within 5 days'
        },
        { 
          id: 4, 
          title: 'Court Representation', 
          description: 'Legal representation at eviction hearings if needed.',
          status: 'upcoming',
          icon: <Clock className="h-5 w-5 text-gray-400" />,
          date: 'As scheduled'
        }
      ];
    } else if (analysisResult.legalDomain === 'Family Law') {
      return [
        { 
          id: 1, 
          title: 'Legal Consultation', 
          description: 'Discuss your situation and understand legal options.',
          status: 'complete',
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          date: 'Today'
        },
        { 
          id: 2, 
          title: 'Financial Disclosure', 
          description: 'Compile financial information and documents.',
          status: 'current',
          icon: <FileText className="h-5 w-5 text-indigo-600" />,
          date: '1-2 weeks'
        },
        { 
          id: 3, 
          title: 'Filing Petition', 
          description: 'Prepare and file necessary court documents.',
          status: 'upcoming',
          icon: <Clock className="h-5 w-5 text-gray-400" />,
          date: '2-3 weeks'
        },
        { 
          id: 4, 
          title: 'Mediation', 
          description: 'Attempt to reach agreement on key issues.',
          status: 'upcoming',
          icon: <Calendar className="h-5 w-5 text-gray-400" />,
          date: 'As scheduled'
        }
      ];
    } else {
      // Default timeline for other legal domains
      return [
        { 
          id: 1, 
          title: 'Initial Consultation', 
          description: 'Discuss your case with a qualified legal professional.',
          status: 'complete',
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          date: 'Today'
        },
        { 
          id: 2, 
          title: 'Case Evaluation', 
          description: 'Your case is evaluated by an attorney specializing in this area.',
          status: 'current',
          icon: <Users className="h-5 w-5 text-indigo-600" />,
          date: '1-3 days'
        },
        { 
          id: 3, 
          title: 'Legal Strategy', 
          description: 'Development of a legal strategy for your specific situation.',
          status: 'upcoming',
          icon: <Clock className="h-5 w-5 text-gray-400" />,
          date: '1-2 weeks'
        }
      ];
    }
  };
  
  const timelineSteps = getTimelineSteps();
  
  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
        <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
        Expected Timeline
      </h3>
      
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        {/* Timeline steps */}
        <div className="space-y-6 relative">
          {timelineSteps.map((step) => (
            <div key={step.id} className="flex items-start">
              <div className="flex-shrink-0 relative z-10">
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-full 
                  ${step.status === 'complete' ? 'bg-green-100' : 
                    step.status === 'current' ? 'bg-indigo-100' : 'bg-gray-100'}
                `}>
                  {step.icon}
                </div>
              </div>
              <div className="ml-4 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`
                    text-sm font-medium
                    ${step.status === 'complete' ? 'text-green-800' : 
                      step.status === 'current' ? 'text-indigo-800' : 'text-gray-500'}
                  `}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-500 ml-2">
                    {step.date}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">
                  {step.description}
                </p>
                {step.status === 'current' && (
                  <div className="mt-2 flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      In Progress
                    </span>
                    {analysisResult.isLowIncome && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Free Legal Aid
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};