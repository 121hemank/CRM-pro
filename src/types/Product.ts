export interface Product {
  id: number;
  productId: string;
  productCode: string;
  name: string;
  description: string;
  category: string;
  price: number;
  status: 'active' | 'inactive' | 'discontinued';
  features: string[];
  createdDate: string;
}

export interface SalesPerformance {
  timeToClose: number; // Average time in days
  conversionRates: {
    leadToQualified: number;
    qualifiedToProposal: number;
    proposalToWon: number;
    overallConversion: number;
  };
  revenueGenerated: number;
  forecastedRevenue: number;
  salesCycleLength: number; // Average in days
  totalDeals: number;
  wonDeals: number;
  lostDeals: number;
}

export interface CustomerFeedback {
  id: number;
  customerId: string;
  rating: number; // 1-5 scale
  comment: string;
  category: 'product' | 'service' | 'support' | 'overall';
  date: string;
  resolved: boolean;
}