export interface Lead {
  id: number;
  leadId: string; // Unique identifier
  name: string;
  email: string;
  phone: string;
  company: string;
  stage: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'proposal'; // Lead Status
  score: number;
  value: number;
  source: string;
  assignedTo: string;
  lastContact: string;
  notes: string;
  timeToClose?: number; // in days
  interactions: Interaction[];
}

export interface Deal {
  id: number;
  dealId: string; // Unique identifier
  title: string;
  customerId: string;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  value: number;
  probability: number;
  closeDate: string;
  createdDate: string;
  reasonLost?: string; // For lost deals
  timeToClose?: number; // Duration from lead creation to deal closure
  assignedTo: string;
}

export interface Interaction {
  id: number;
  type: 'meeting' | 'email' | 'chatbot' | 'phone' | 'note';
  date: string;
  notes: string; // Detailed summary
  channel: 'email' | 'phone' | 'chatbot' | 'in-person' | 'video-call';
  duration?: number; // in minutes
  outcome?: string;
}