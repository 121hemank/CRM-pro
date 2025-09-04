export interface Customer {
  id: number;
  customerId: string; // Unique identifier
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  status: 'active' | 'inactive' | 'prospect' | 'lead'; // Account Status
  value: number;
  lastContact: string;
  tags: string[];
  satisfactionScore?: number; // Customer Feedback/Satisfaction Scores
  websiteActivity?: WebsiteActivity;
  products?: ProductPurchase[];
}

export interface WebsiteActivity {
  pageViews: number;
  timeSpent: number; // in minutes
  featuresUsed: string[];
  lastVisit: string;
}

export interface ProductPurchase {
  productId: string;
  productName: string;
  productCode: string;
  purchaseDate: string;
  value: number;
  quantity: number;
}