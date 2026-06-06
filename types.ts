export interface ContactFormInput {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export interface QuoteCalculation {
  camerasCount: number;
  cameraType: string;
  resolution: string;
  storage: string;
  biometricNeeded: boolean;
  accessControlNeeded: boolean;
  installationType: string;
  estimatedPriceMin: number;
  estimatedPriceMax: number;
}

export interface Inquiry {
  id: string;
  type: "contact" | "quote";
  name: string;
  phone: string;
  email: string;
  date: string;
  status: "new" | "contacted" | "completed";
  notes?: string;
  contactData?: {
    service: string;
    message: string;
  };
  quoteData?: QuoteCalculation;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  features: string[];
  badge?: string;
}

export interface PartnerBrand {
  name: string;
  accentColor: string;
  category: "cctv" | "biometric" | "hardware" | "all";
}
