import React from 'react';
import { Button } from './ui/Button';
import { useAppStore } from '../store';

const presetQuestions = [
  {
    id: 'asylum',
    text: 'I need help applying for asylum. I arrived in Texas three months ago and I\'m afraid to return to my country.',
    category: 'Immigration',
  },
  {
    id: 'eviction',
    text: 'My landlord is trying to evict me without proper notice in New York. I\'m a low-income tenant and can\'t afford a lawyer.',
    category: 'Housing',
  },
  {
    id: 'daca',
    text: 'I need to renew my DACA status in California but I\'m confused about the process. Can someone help me?',
    category: 'Immigration',
  },
  {
    id: 'custody',
    text: 'I\'m going through a divorce in Florida and need help with child custody arrangements.',
    category: 'Family',
  },
  {
    id: 'workplace',
    text: 'I think I\'m being discriminated against at work because of my immigration status in Arizona. What are my rights?',
    category: 'Employment',
  },
];

export const DemoPresets: React.FC = () => {
  const { addMessage } = useAppStore();

  const handlePresetClick = (text: string) => {
    addMessage({
      content: text,
      role: 'user',
    });
  };

  return (
    <div className="mb-4 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
      <h3 className="text-sm font-medium text-indigo-700 mb-2">Try these example questions:</h3>
      <div className="flex flex-wrap gap-2">
        {presetQuestions.map((question) => (
          <Button
            key={question.id}
            variant="outline"
            size="sm"
            onClick={() => handlePresetClick(question.text)}
            className="text-xs border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-100"
          >
            {question.text.length > 50 ? `${question.text.substring(0, 47)}...` : question.text}
          </Button>
        ))}
      </div>
    </div>
  );
};