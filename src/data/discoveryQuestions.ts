import { DiscoveryQuestion } from '../types';

export const mockDiscoveryQuestions: DiscoveryQuestion[] = [
  {
    id: 'immigration',
    legalDomain: 'Immigration Law',
    questions: [
      "How long have you been in the United States? This helps determine which immigration pathways might be available to you.",
      "Do you currently have any immigration status, such as a visa, green card, or TPS (Temporary Protected Status)?",
      "Have you ever applied for any immigration benefits before? If so, what was the outcome?",
      "Are you currently employed or do you have a potential employer who could sponsor you?",
      "Do you have any immediate family members (spouse, parents, children) who are U.S. citizens or permanent residents?",
      "Have you ever been detained by immigration authorities or received a notice to appear in immigration court?"
    ],
  },
  {
    id: 'housing',
    legalDomain: 'Housing/Tenant Rights',
    questions: [
      "Do you have a written lease agreement, and if so, how much time is left on your lease?",
      "Have you received any formal notices from your landlord, such as an eviction notice or lease violation?",
      "Have you tried to resolve this issue with your landlord directly? How did they respond?",
      "Are there any habitability issues in your home, such as lack of heat, water, or other essential services?",
      "Are you current on your rent payments, or is there a dispute about rental payments?",
      "Do you believe you're experiencing discrimination or retaliation from your landlord?"
    ],
  },
  {
    id: 'family',
    legalDomain: 'Family Law',
    questions: [
      "What is your current marital status, and how long have you been married or separated?",
      "Do you have children involved in this situation? If so, what are their ages?",
      "Is there a current custody arrangement, either formal or informal?",
      "Are there any concerns about domestic violence or safety that we should know about?",
      "Have you and your spouse discussed dividing your assets and debts?",
      "Has either party already filed any court documents related to divorce or custody?"
    ],
  },
  {
    id: 'employment',
    legalDomain: 'Employment Law',
    questions: [
      "How long have you been employed with this company, and what is your current position?",
      "When did the issue you're concerned about begin, and is it still ongoing?",
      "Have you reported this issue to your employer, HR department, or a supervisor?",
      "Are there any witnesses to the situation you're describing?",
      "Have you received any written documentation related to the issue, such as warnings or performance reviews?",
      "Have you experienced any negative consequences after reporting or complaining about the issue?"
    ],
  },
  {
    id: 'criminal',
    legalDomain: 'Criminal Defense',
    questions: [
      "What are the specific charges you're facing or concerned about?",
      "Have you been arrested, and if so, when did this occur?",
      "Have you received any court paperwork or a court date?",
      "Have you spoken with any law enforcement officials about this matter?",
      "Is this your first involvement with the criminal justice system?",
      "Are there any specific concerns about immigration consequences related to these charges?"
    ],
  }
];