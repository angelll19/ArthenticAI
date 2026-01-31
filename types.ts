
export interface SubstanceMetric {
  label: string;
  percentage: number;
  description: string;
}

export interface Review {
  id: string;
  collectorName: string;
  mbti: string;
  rating: number;
  vibeCheck: string;
  placedIn: string;
  date: string;
  verified: boolean;
}

export interface CardData {
  id: string;
  name: string;
  artist: string;
  shortBio: string;
  fullDescription: string;
  imageUrl: string;
  year: string;
  originCountry: string;
  
  // Advanced AI Captured Technical Fields
  medium: string;          
  substrate: string;       
  pigmentQuality: string;  
  surfaceShine: string;    
  physicalHealth: string;  
  hiddenDetails: string;   
  placementSuggestion: string; 
  
  // MBTI & Savvy Fields
  mbti: string;
  mbtiTrait: string;
  mbtiSavvyInfo: string;
  
  substanceAnalysis: SubstanceMetric[];
  textureNote: string;

  // Social & Categorization
  style: 'Chic' | 'Bold' | 'Minimalist' | 'Abstract';
  vibe: 'Calm' | 'Focus' | 'Energy' | 'Intimate';
  reviews: Review[];
  totalAcquisitions: number;
}

export interface UserProfile {
  name: string;
  age: number;
  personality: string;
  experience: 'Beginner' | 'Intermediate' | 'Professional';
}

export type AppMode = 'feed' | 'camera' | 'history' | 'library';
