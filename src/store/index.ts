import { create } from 'zustand';
import { Message, AnalysisResult, LegalAidProvider, AgentPersonality, VoiceType, DiscoveryQuestion } from '../types';
import { mockLegalAidProviders } from '../data/mockData';
import { mockDiscoveryQuestions } from '../data/discoveryQuestions';
import toast from 'react-hot-toast';

interface AppState {
  messages: Message[];
  isRecording: boolean;
  isProcessing: boolean;
  analysisResult: AnalysisResult | null;
  recommendedProviders: LegalAidProvider[];
  isFirstVisit: boolean;
  adminMode: boolean;
  agentPersonality: AgentPersonality;
  voiceType: VoiceType;
  discoveryQuestionsEnabled: boolean;
  discoveryMode: boolean;
  discoveryQuestionIndex: number;
  currentDiscoveryQuestions: string[];
  pendingDiscoveryCount: number;
  agentInstructions: string;
  
  // Actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setIsRecording: (isRecording: boolean) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  resetChat: () => void;
  findRecommendedProviders: (domain: string, state: string) => void;
  refreshProviders: () => void;
  setIsFirstVisit: (isFirstVisit: boolean) => void;
  setAdminMode: (adminMode: boolean) => void;
  setAgentPersonality: (personality: AgentPersonality) => void;
  setVoiceType: (voiceType: VoiceType) => void;
  setDiscoveryQuestionsEnabled: (enabled: boolean) => void;
  setAgentInstructions: (instructions: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  messages: [
    {
      id: '1',
      content: "Hi, I'm Lisa 👋 I'm here to help you get legal assistance. You can talk to me or type your question.",
      role: 'assistant',
      timestamp: new Date(),
    },
  ],
  isRecording: false,
  isProcessing: false,
  analysisResult: null,
  recommendedProviders: [],
  isFirstVisit: true,
  adminMode: false,
  agentPersonality: 'empathetic',
  voiceType: 'friendly',
  discoveryQuestionsEnabled: true,
  discoveryMode: false,
  discoveryQuestionIndex: 0,
  currentDiscoveryQuestions: [],
  pendingDiscoveryCount: 0,
  agentInstructions: `Agent Name: Lisa Law
Role: Legal intake assistant specializing in helping users identify their legal needs

Primary Goals:
1. Identify the type of legal issue the user has
2. Determine the user's U.S. state or location
3. Qualify the user as a potential lead for legal services
4. Connect users with appropriate legal aid resources

Discovery Process:
- Ask clarifying questions to understand the legal situation better
- Gather information about urgency, financial situation, and case complexity
- Show empathy while maintaining professional boundaries
- Prioritize immigration law cases but handle all legal domains effectively

Response Style:
- Use clear, accessible language without complex legal jargon
- Provide realistic next steps and timeline expectations
- Be supportive but honest about limitations of remote legal intake
- Never provide specific legal advice but focus on proper referrals`,

  addMessage: (message) => {
    const { 
      discoveryQuestionsEnabled, 
      analysisResult, 
      discoveryMode, 
      discoveryQuestionIndex,
      currentDiscoveryQuestions,
      pendingDiscoveryCount,
      agentPersonality
    } = get();
    
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    
    set((state) => ({
      messages: [...state.messages, newMessage],
      isFirstVisit: false, // After first message, hide the welcome banner
    }));

    // If it's a user message, simulate AI processing
    if (message.role === 'user') {
      set({ isProcessing: true });
      
      // If we're in discovery mode, process the discovery response
      if (discoveryMode) {
        setTimeout(() => {
          // If we still have questions to ask
          if (discoveryQuestionIndex < currentDiscoveryQuestions.length - 1) {
            // Move to the next question
            const nextIndex = discoveryQuestionIndex + 1;
            const nextQuestion = currentDiscoveryQuestions[nextIndex];
            
            set({
              discoveryQuestionIndex: nextIndex,
              isProcessing: false
            });
            
            // Add the next discovery question
            get().addMessage({
              content: nextQuestion,
              role: 'assistant',
              isDiscoveryQuestion: true
            });
          } else {
            // We've completed the discovery process
            set({
              discoveryMode: false,
              discoveryQuestionIndex: 0,
              currentDiscoveryQuestions: [],
              pendingDiscoveryCount: 0,
              isProcessing: false
            });
            
            // Add a summary message
            get().addMessage({
              content: getDiscoverySummary(analysisResult, agentPersonality),
              role: 'assistant'
            });
            
            // Show providers
            if (analysisResult?.legalDomain && analysisResult?.state) {
              get().findRecommendedProviders(analysisResult.legalDomain, analysisResult.state);
            }
          }
        }, 1500);
        
        return;
      }
      
      // Normal non-discovery flow
      setTimeout(() => {
        const mockAnalysis = simulateAnalysis(message.content);
        set({ 
          analysisResult: mockAnalysis,
          isProcessing: false 
        });
        
        // Determine if we should enter discovery mode
        if (discoveryQuestionsEnabled && mockAnalysis.legalDomain) {
          const discoveryQuestions = getDiscoveryQuestions(mockAnalysis.legalDomain);
          
          if (discoveryQuestions.length > 0) {
            // Enter discovery mode
            set({
              discoveryMode: true,
              currentDiscoveryQuestions: discoveryQuestions,
              discoveryQuestionIndex: 0,
              pendingDiscoveryCount: discoveryQuestions.length
            });
            
            // Add initial response before discovery
            get().addMessage({
              content: generateInitialResponse(mockAnalysis, get().agentPersonality),
              role: 'assistant'
            });
            
            // Add first discovery question
            setTimeout(() => {
              get().addMessage({
                content: discoveryQuestions[0],
                role: 'assistant',
                isDiscoveryQuestion: true
              });
            }, 1000);
            
            return;
          }
        }
        
        // If discovery is disabled or no questions available, continue with normal flow
        if (mockAnalysis.legalDomain && mockAnalysis.state) {
          get().findRecommendedProviders(mockAnalysis.legalDomain, mockAnalysis.state);
        }
        
        // Add AI response message
        const responseContent = generateAIResponse(mockAnalysis, get().agentPersonality);
        get().addMessage({ 
          content: responseContent,
          role: 'assistant'
        });
      }, 1500);
    }
  },

  setIsRecording: (isRecording) => set({ isRecording }),
  
  setIsProcessing: (isProcessing) => set({ isProcessing }),
  
  setAnalysisResult: (result) => set({ analysisResult: result }),
  
  resetChat: () => set({
    messages: [
      {
        id: '1',
        content: "Hi, I'm Lisa 👋 I'm here to help you get legal assistance. You can talk to me or type your question.",
        role: 'assistant',
        timestamp: new Date(),
      },
    ],
    analysisResult: null,
    recommendedProviders: [],
    isFirstVisit: true,
    discoveryMode: false,
    discoveryQuestionIndex: 0,
    currentDiscoveryQuestions: [],
    pendingDiscoveryCount: 0,
  }),
  
  findRecommendedProviders: (domain, state) => {
    // First, try to find providers that match both domain and state
    let providers = mockLegalAidProviders.filter(
      provider => 
        provider.categories.includes(domain) && 
        provider.state === state
    );
    
    // If no providers found for the specific state, include general providers
    if (providers.length === 0) {
      // First try providers from the same domain
      const domainProviders = mockLegalAidProviders.filter(
        provider => provider.categories.includes(domain)
      );
      
      if (domainProviders.length > 0) {
        // Take a random sample of providers from the same domain
        const randomSample = [...domainProviders].sort(() => 0.5 - Math.random()).slice(0, 2);
        providers = randomSample;
      } else {
        // If still no providers, just take some random providers
        providers = mockLegalAidProviders.slice(0, 2);
      }
    }
    
    // Add some randomization to the results (shuffle)
    const shuffledProviders = [...providers].sort(() => 0.5 - Math.random());
    
    // Limit to 3 providers to keep it manageable
    set({ recommendedProviders: shuffledProviders.slice(0, 3) });
  },
  
  refreshProviders: () => {
    const { analysisResult } = get();
    if (analysisResult?.legalDomain && analysisResult?.state) {
      get().findRecommendedProviders(analysisResult.legalDomain, analysisResult.state);
    }
  },
  
  setIsFirstVisit: (isFirstVisit) => set({ isFirstVisit }),
  
  setAdminMode: (adminMode) => {
    if (adminMode) {
      toast.success('Admin mode activated', {
        icon: '🔓',
        position: 'bottom-center',
      });
    }
    set({ adminMode });
  },
  
  setAgentPersonality: (personality) => {
    toast.success(`Agent personality switched to: ${personality}`, {
      icon: '👤',
      position: 'bottom-center',
    });
    set({ agentPersonality: personality });
  },
  
  setVoiceType: (voiceType) => {
    toast.success(`Voice type changed to: ${voiceType}`, {
      icon: '🎙️',
      position: 'bottom-center',
    });
    set({ voiceType });
  },
  
  setDiscoveryQuestionsEnabled: (enabled) => {
    toast.success(enabled ? 'Discovery questions enabled' : 'Discovery questions disabled', {
      icon: enabled ? '✅' : '❌',
      position: 'bottom-center',
    });
    set({ discoveryQuestionsEnabled: enabled });
  },
  
  setAgentInstructions: (instructions) => {
    toast.success('Agent instructions updated', {
      icon: '📝',
      position: 'bottom-center',
    });
    set({ agentInstructions: instructions });
  }
}));

// Enhanced Lyzr AI analysis simulation for the demo
function simulateAnalysis(content: string): AnalysisResult {
  const text = content.toLowerCase();
  
  // Enhanced keyword matching for legal domains
  let legalDomain = 'Unknown';
  let confidence = 0.7; // Default confidence
  
  // Immigration keywords with high confidence
  if (text.includes('immigration') || text.includes('visa') || text.includes('asylum') || 
      text.includes('citizenship') || text.includes('green card') || text.includes('daca') || 
      text.includes('deportation') || text.includes('immigrant') || text.includes('status')) {
    legalDomain = 'Immigration Law';
    confidence = 0.95;
  } 
  // Family law keywords
  else if (text.includes('divorce') || text.includes('custody') || text.includes('child support') ||
          text.includes('alimony') || text.includes('family') || text.includes('spouse') ||
          text.includes('marriage') || text.includes('separation')) {
    legalDomain = 'Family Law';
    confidence = 0.9;
  } 
  // Housing keywords
  else if (text.includes('eviction') || text.includes('landlord') || text.includes('tenant') || 
          text.includes('rent') || text.includes('lease') || text.includes('housing') ||
          text.includes('apartment') || text.includes('evict')) {
    legalDomain = 'Housing/Tenant Rights';
    confidence = 0.9;
  } 
  // Employment keywords
  else if (text.includes('job') || text.includes('fired') || text.includes('workplace') || 
          text.includes('discrimination') || text.includes('salary') || text.includes('employer') ||
          text.includes('employee') || text.includes('work') || text.includes('harassment')) {
    legalDomain = 'Employment Law';
    confidence = 0.85;
  } 
  // Criminal keywords
  else if (text.includes('arrest') || text.includes('criminal') || text.includes('police') ||
          text.includes('defense') || text.includes('jail') || text.includes('crime') ||
          text.includes('charged') || text.includes('conviction')) {
    legalDomain = 'Criminal Defense';
    confidence = 0.9;
  }
  
  // Advanced U.S. state extraction with abbreviations and contextual cues
  const states = {
    'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR', 'california': 'CA',
    'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE', 'florida': 'FL', 'georgia': 'GA',
    'hawaii': 'HI', 'idaho': 'ID', 'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA',
    'kansas': 'KS', 'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME', 'maryland': 'MD',
    'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS', 'missouri': 'MO',
    'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV', 'new hampshire': 'NH', 'new jersey': 'NJ',
    'new mexico': 'NM', 'new york': 'NY', 'north carolina': 'NC', 'north dakota': 'ND', 'ohio': 'OH',
    'oklahoma': 'OK', 'oregon': 'OR', 'pennsylvania': 'PA', 'rhode island': 'RI', 'south carolina': 'SC',
    'south dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT', 'vermont': 'VT',
    'virginia': 'VA', 'washington': 'WA', 'west virginia': 'WV', 'wisconsin': 'WI', 'wyoming': 'WY',
    'district of columbia': 'DC', 'dc': 'DC'
  };
  
  // Also check for abbreviations directly
  const stateAbbrs = Object.values(states);
  
  let state = 'Unknown';
  // Check for full state names
  for (const [stateName, stateCode] of Object.entries(states)) {
    if (text.includes(stateName)) {
      state = stateCode;
      break;
    }
  }
  
  // If no full name found, check for abbreviations
  if (state === 'Unknown') {
    // Create a regex to match state abbreviations as standalone words
    for (const abbr of stateAbbrs) {
      const regex = new RegExp(`\\b${abbr.toLowerCase()}\\b`);
      if (regex.test(text.toLowerCase())) {
        state = abbr;
        break;
      }
    }
  }
  
  // Check for cities and infer states (limited list for demo)
  if (state === 'Unknown') {
    const cityToState: Record<string, string> = {
      'new york city': 'NY', 'nyc': 'NY', 'brooklyn': 'NY', 'queens': 'NY', 'manhattan': 'NY',
      'los angeles': 'CA', 'san francisco': 'CA', 'san diego': 'CA', 'oakland': 'CA', 'sacramento': 'CA',
      'chicago': 'IL', 'houston': 'TX', 'dallas': 'TX', 'san antonio': 'TX', 'austin': 'TX',
      'miami': 'FL', 'orlando': 'FL', 'tampa': 'FL', 'seattle': 'WA', 'portland': 'OR',
      'phoenix': 'AZ', 'tucson': 'AZ', 'denver': 'CO', 'atlanta': 'GA', 'boston': 'MA',
      'philadelphia': 'PA', 'pittsburgh': 'PA'
    };
    
    for (const [city, stateCode] of Object.entries(cityToState)) {
      if (text.includes(city)) {
        state = stateCode;
        break;
      }
    }
  }
  
  // Use California as default for demo if no state found
  if (state === 'Unknown') {
    // Choose a random state for more variety in the demo
    const randomStates = ['CA', 'NY', 'TX', 'FL', 'IL', 'WA', 'MA'];
    state = randomStates[Math.floor(Math.random() * randomStates.length)];
  }
  
  // Enhanced low income detection with more contextual keywords
  const isLowIncome = text.includes('low income') || 
                      text.includes('can\'t afford') || 
                      text.includes('free') || 
                      text.includes('poor') ||
                      text.includes('low-income') ||
                      text.includes('low cost') ||
                      text.includes('nonprofit') ||
                      text.includes('non-profit') ||
                      text.includes('pro bono') ||
                      text.includes('legal aid') ||
                      text.includes('can\'t pay') ||
                      text.includes('financial assistance') ||
                      text.includes('assistance') ||
                      text.includes('help paying') ||
                      text.includes('no money') ||
                      text.includes('limited income') ||
                      Math.random() > 0.4; // Random bias toward low income for demo purposes

  return {
    legalDomain,
    state,
    confidence,
    isLowIncome
  };
}

// Enhanced AI response generation based on analysis and personality
function generateAIResponse(analysis: AnalysisResult, personality: AgentPersonality): string {
  const stateName = getStateName(analysis.state || 'CA');
  
  // Handle different personality types
  if (personality === 'empathetic') {
    // Domain-specific empathetic responses
    if (analysis.legalDomain === 'Immigration Law') {
      if (analysis.isLowIncome) {
        return `I understand how challenging immigration issues can be. Based on what you've shared, you're facing an immigration matter in ${stateName}, and it sounds like affordability is a concern. I've found several non-profit legal aid organizations that specialize in immigration matters and provide free or low-cost services. Would you like to see these options?`;
      } else {
        return `I appreciate you sharing your immigration situation with me. It sounds like you need help with Immigration Law in ${stateName}. I've identified some legal resources that could assist you, and I can also outline what the process might look like for your situation.`;
      }
    } else if (analysis.legalDomain === 'Housing/Tenant Rights') {
      if (analysis.isLowIncome) {
        return `Housing issues can be really stressful, especially when facing potential eviction or landlord disputes. I understand you're dealing with a housing matter in ${stateName}. I've found several legal aid organizations that provide free help with tenant rights. Would you like to see their information?`;
      } else {
        return `I know housing issues can feel overwhelming. For your situation in ${stateName}, I've found legal resources that specialize in tenant rights and landlord-tenant disputes. I can also help you understand what to expect in the process ahead.`;
      }
    } else if (analysis.legalDomain === 'Family Law') {
      return `Family legal matters can be emotionally challenging. I understand you're dealing with a family law issue in ${stateName}. I've identified legal help that specializes in ${analysis.isLowIncome ? 'free or low-cost' : ''} family law services in your area. Would you like to see these options?`;
    } else if (analysis.legalDomain !== 'Unknown') {
      return `Thank you for sharing your situation with me. I understand you need help with ${analysis.legalDomain} in ${stateName}. I've found some legal aid providers in your area that might be able to assist with your ${analysis.legalDomain.toLowerCase()} situation. Would you like to see them?`;
    } else {
      return `I'd like to help you find the right legal assistance, but I need a bit more information about your situation. Could you share a bit more about the legal issue you're facing? For example, is it related to immigration, family matters, housing, or something else?`;
    }
  } else if (personality === 'professional') {
    // Domain-specific professional responses
    if (analysis.legalDomain === 'Immigration Law') {
      if (analysis.isLowIncome) {
        return `Based on your description, your case falls under Immigration Law in ${stateName}. I've identified several qualified legal aid organizations that offer pro bono or sliding-scale services for immigration matters. These organizations have expertise in cases similar to yours. Would you like to review their credentials?`;
      } else {
        return `Your case has been classified as Immigration Law within ${stateName} jurisdiction. I've compiled a list of appropriate legal resources with expertise in this field. Additionally, I can provide an overview of the standard procedural timeline for this type of case.`;
      }
    } else if (analysis.legalDomain === 'Housing/Tenant Rights') {
      return `Your situation has been categorized as a Housing/Tenant Rights matter in ${stateName}. I've identified legal resources with specialization in landlord-tenant law${analysis.isLowIncome ? ' that offer services at reduced or no cost' : ''}. Would you like to review these recommendations?`;
    } else if (analysis.legalDomain !== 'Unknown') {
      return `Your case has been classified under ${analysis.legalDomain} in ${stateName}. I've located appropriate legal resources that specialize in this area of law. Would you like to review these options?`;
    } else {
      return `To provide accurate legal referrals, I'll need more specific information about your case. Could you provide additional details regarding the nature of your legal matter?`;
    }
  } else if (personality === 'direct') {
    // Domain-specific direct responses
    if (analysis.legalDomain === 'Immigration Law') {
      return `For your immigration issue in ${stateName}: Found ${analysis.isLowIncome ? 'free/low-cost' : ''} legal help. Need details on asylum, visa status, citizenship, or deportation defense?`;
    } else if (analysis.legalDomain === 'Housing/Tenant Rights') {
      return `Housing issue in ${stateName}: Found tenant rights help${analysis.isLowIncome ? ' at no/low cost' : ''}. When is your court date or eviction deadline? Do you have documentation of the issue?`;
    } else if (analysis.legalDomain !== 'Unknown') {
      return `${analysis.legalDomain} issue in ${stateName}: Found legal providers. Here are your next steps and a timeline. Need immediate assistance or can this wait?`;
    } else {
      return `Need more info. What type of legal issue: immigration, housing, family, or other? Which state are you in?`;
    }
  }
  
  // Default response if something goes wrong with personality selection
  return `I've analyzed your situation and found some legal resources that might help with your case in ${stateName}. Would you like to see them?`;
}

// Initial response before starting discovery questions
function generateInitialResponse(analysis: AnalysisResult, personality: AgentPersonality): string {
  const stateName = getStateName(analysis.state || 'CA');
  
  if (personality === 'empathetic') {
    return `Thank you for sharing that with me. It sounds like you're dealing with a ${analysis.legalDomain?.toLowerCase()} issue in ${stateName}. I'd like to ask a few more questions to better understand your situation and find the right assistance for you.`;
  } else if (personality === 'professional') {
    return `I've identified your case as ${analysis.legalDomain} in ${stateName}. To provide the most appropriate legal referrals, I need to gather some additional information through a brief intake process.`;
  } else if (personality === 'direct') {
    return `Got it - ${analysis.legalDomain} case in ${stateName}. I need a few more details to match you with the right legal help.`;
  }
  
  return `I understand you have a ${analysis.legalDomain?.toLowerCase()} issue in ${stateName}. Let me ask you a few questions to help find the right assistance.`;
}

// Get discovery questions based on legal domain
function getDiscoveryQuestions(legalDomain: string): string[] {
  const domainQuestions = mockDiscoveryQuestions.find(q => q.legalDomain === legalDomain);
  
  if (domainQuestions) {
    return domainQuestions.questions;
  }
  
  return [];
}

// Generate summary after discovery process
function getDiscoverySummary(analysis: AnalysisResult | null, personality: AgentPersonality): string {
  if (!analysis) return "Thank you for providing that information. Let me find some resources for you.";
  
  const stateName = getStateName(analysis.state || 'CA');
  
  if (personality === 'empathetic') {
    if (analysis.legalDomain === 'Immigration Law') {
      return `Thank you for sharing those details with me. Based on everything you've told me, I understand that you're dealing with an immigration matter in ${stateName}${analysis.isLowIncome ? ' and affordability is important to you' : ''}. I've found some legal aid organizations that specialize in immigration cases like yours. These providers have experience with similar situations and can offer the guidance you need.`;
    } else {
      return `I appreciate you taking the time to share those details. Now I have a better understanding of your ${analysis.legalDomain?.toLowerCase()} situation in ${stateName}. I've identified some legal resources that would be a good match for your specific needs. These organizations have helped many people in similar circumstances.`;
    }
  } else if (personality === 'professional') {
    return `Based on your responses to the intake questions, I've completed an assessment of your ${analysis.legalDomain} case in ${stateName}. The following legal resources have been identified as appropriate matches for your specific legal needs and circumstances.`;
  } else if (personality === 'direct') {
    return `Thanks for the information. Found legal aid for your ${analysis.legalDomain} case in ${stateName}. Here are your options and next steps.`;
  }
  
  return `Thank you for answering those questions. I now have a better understanding of your situation and have found some legal resources that can help with your ${analysis.legalDomain?.toLowerCase()} case in ${stateName}.`;
}

function getStateName(stateCode: string): string {
  const stateNames: Record<string, string> = {
    'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
    'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
    'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
    'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
    'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
    'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
    'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
    'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
    'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
    'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming',
    'DC': 'District of Columbia'
  };
  
  return stateNames[stateCode] || 'Your State';
}