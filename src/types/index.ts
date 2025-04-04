import { CheckCircle2 } from "lucide-react";

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isDiscoveryQuestion?: boolean;
}

export interface LegalCategory {
  id: string;
  name: string;
  description: string;
}

export interface LegalState {
  code: string;
  name: string;
}

export interface LegalAidProvider {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  website: string;
  services: string[];
  state: string;
  categories: string[];
  rating?: number;
  reviewCount?: number;
  languages?: string[];
  availability?: string;
  fundingSources?: string[];
}

export interface AnalysisResult {
  legalDomain?: string;
  state?: string;
  confidence: number;
  isLowIncome?: boolean;
}

export type AgentPersonality = 'empathetic' | 'professional' | 'direct';
export type VoiceType = 'friendly' | 'authoritative' | 'neutral';

export interface DiscoveryQuestion {
  id: string;
  legalDomain: string;
  questions: string[];
}