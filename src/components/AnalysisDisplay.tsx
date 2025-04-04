import React from 'react';
import { useAppStore } from '../store';
import { Badge } from './ui/Badge';
import { AlertCircle, CheckCircle2, MapPin, DollarSign, Brain, BarChart2 } from 'lucide-react';

export const AnalysisDisplay: React.FC = () => {
  const { analysisResult } = useAppStore();
  
  if (!analysisResult) return null;
  
  // Convert confidence percentage to words for more natural display
  const getConfidenceText = (confidence: number) => {
    if (confidence > 0.9) return 'Very High';
    if (confidence > 0.7) return 'High';
    if (confidence > 0.5) return 'Moderate';
    if (confidence > 0.3) return 'Low';
    return 'Very Low';
  };
  
  return (
    <div className="bg-gray-50 border-t border-b border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
        <Brain className="h-4 w-4 mr-1 text-indigo-600" />
        AI Analysis Results
      </h3>
      
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {analysisResult.legalDomain && (
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1 text-indigo-400" />
              Legal Category
            </p>
            <div className="flex items-center">
              <Badge variant={analysisResult.legalDomain === 'Immigration Law' ? 'success' : 'default'}>
                {analysisResult.legalDomain === 'Immigration Law' ? (
                  <span className="flex items-center">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {analysisResult.legalDomain}
                  </span>
                ) : (
                  analysisResult.legalDomain
                )}
              </Badge>
            </div>
          </div>
        )}
        
        {analysisResult.state && (
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <MapPin className="h-3 w-3 mr-1 text-indigo-400" />
              Location
            </p>
            <div className="flex items-center">
              <Badge variant="secondary">
                {analysisResult.state}
              </Badge>
            </div>
          </div>
        )}
        
        {analysisResult.isLowIncome !== undefined && (
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <DollarSign className="h-3 w-3 mr-1 text-indigo-400" />
              Income Status
            </p>
            <div className="flex items-center">
              <Badge variant={analysisResult.isLowIncome ? 'warning' : 'default'}>
                {analysisResult.isLowIncome ? 'Low Income' : 'Standard'}
              </Badge>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <p className="text-xs text-gray-500 mb-1 flex items-center">
            <BarChart2 className="h-3 w-3 mr-1 text-indigo-400" />
            Confidence
          </p>
          <div className="flex items-center">
            <Badge variant={analysisResult.confidence > 0.7 ? 'success' : 'warning'}>
              {getConfidenceText(analysisResult.confidence)}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 mt-2">
        <p>Analysis by Lyzr AI</p>
      </div>
    </div>
  );
};