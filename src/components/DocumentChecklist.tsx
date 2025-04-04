import React, { useState } from 'react';
import { FileText, Check, HelpCircle } from 'lucide-react';
import { useAppStore } from '../store';

export const DocumentChecklist: React.FC = () => {
  const { analysisResult } = useAppStore();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  if (!analysisResult || !analysisResult.legalDomain) return null;
  
  // Different document lists based on legal domain
  const getDocumentList = () => {
    if (analysisResult.legalDomain === 'Immigration Law') {
      return [
        { id: 'passport', name: 'Valid Passport', required: true },
        { id: 'birthCert', name: 'Birth Certificate (with translation if needed)', required: true },
        { id: 'photos', name: 'Passport-Style Photos (2)', required: true },
        { id: 'i94', name: 'I-94 Arrival/Departure Record', required: false },
        { id: 'visas', name: 'Previous Visas', required: false },
        { id: 'medicalExam', name: 'Medical Examination Results', required: true },
        { id: 'financialDocs', name: 'Financial Support Documentation', required: true },
        { id: 'residenceProof', name: 'Proof of Residence', required: true },
      ];
    } else if (analysisResult.legalDomain === 'Housing/Tenant Rights') {
      return [
        { id: 'lease', name: 'Lease Agreement', required: true },
        { id: 'notices', name: 'Eviction Notice or Landlord Communications', required: true },
        { id: 'rentReceipts', name: 'Rent Payment Receipts', required: true },
        { id: 'photos', name: 'Photos of Housing Conditions (if relevant)', required: false },
        { id: 'communications', name: 'Communications with Landlord', required: false },
        { id: 'maintenanceRequests', name: 'Maintenance Requests', required: false },
      ];
    } else if (analysisResult.legalDomain === 'Family Law') {
      return [
        { id: 'marriage', name: 'Marriage Certificate', required: true },
        { id: 'birthCerts', name: 'Children\'s Birth Certificates', required: analysisResult.state === 'CA' },
        { id: 'financialDocs', name: 'Financial Statements (3 months)', required: true },
        { id: 'assets', name: 'List of Assets and Debts', required: true },
        { id: 'taxReturns', name: 'Tax Returns (2 years)', required: true },
        { id: 'paystubs', name: 'Recent Pay Stubs', required: true },
      ];
    } else {
      // Default document list
      return [
        { id: 'identification', name: 'Government-Issued ID', required: true },
        { id: 'relevantDocs', name: 'Documents Related to Your Case', required: true },
        { id: 'communications', name: 'Relevant Communications', required: false },
        { id: 'financialInfo', name: 'Financial Information (if applicable)', required: false },
      ];
    }
  };
  
  const documents = getDocumentList();
  
  const toggleChecked = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
        <FileText className="h-5 w-5 text-indigo-600 mr-2" />
        Document Checklist
        <span className="ml-2 text-xs text-gray-500 font-normal">
          (Demo - Tap to check off items)
        </span>
      </h3>
      
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        {documents.map((doc, index) => (
          <div 
            key={doc.id}
            className={`
              flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50
              ${index !== documents.length - 1 ? 'border-b border-gray-200' : ''}
              ${checkedItems[doc.id] ? 'bg-green-50' : ''}
            `}
            onClick={() => toggleChecked(doc.id)}
          >
            <div className={`
              w-5 h-5 rounded border flex items-center justify-center mr-3
              ${checkedItems[doc.id] 
                ? 'bg-green-500 border-green-500' 
                : 'border-gray-300'}
            `}>
              {checkedItems[doc.id] && <Check className="h-3 w-3 text-white" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <span className={`text-sm ${checkedItems[doc.id] ? 'text-green-700 line-through' : 'text-gray-700'}`}>
                  {doc.name}
                </span>
                {doc.required && (
                  <span className="ml-2 text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded">
                    Required
                  </span>
                )}
              </div>
            </div>
            <div className="text-gray-400">
              <HelpCircle className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        <p>This checklist is specific to your {analysisResult.legalDomain} case in {analysisResult.state}. Document requirements may vary based on your specific situation.</p>
      </div>
    </div>
  );
};