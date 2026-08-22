export type ScreenView = 
  | 'explore' 
  | 'dashboard' 
  | 'create-step-1' 
  | 'create-step-2' 
  | 'trip-detail' 
  | 'budget' 
  | 'profile';

export type ActivityType = 'transit' | 'lodging' | 'activity' | 'food';

export interface TripActivity {
  id: string;
  type: ActivityType;
  title: string;
  subtitle: string;
  time: string;
  cost?: number;
  duration?: string;
  completed?: boolean;
}

export interface TripDay {
  dayNumber: number;
  dateFormatted: string;
  city: string;
  summary: string;
  activities: TripActivity[];
}

export interface RouteStop {
  id: string;
  name: string;
  days: number;
}

export interface Trip {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  formattedDates: string;
  durationText: string;
  description?: string;
  estimatedBudget: number;
  spentBudget: number;
  coverImage: string;
  locationsCount: number;
  routeStops: RouteStop[];
  days: TripDay[];
  expenses: Expense[];
}

export type ExpenseCategory = 
  | 'Transportation' 
  | 'Accommodation' 
  | 'Food' 
  | 'Activities' 
  | 'Misc';

export interface Expense {
  id: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  note?: string;
}

export interface CategoryBudget {
  category: ExpenseCategory;
  spent: number;
  allocated: number;
  color: string;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  image: string;
  description: string;
  tag?: string;
  featured?: boolean;
  estimatedCost: number;
  bestSeason: string;
}

export interface TravelDoc {
  id: string;
  title: string;
  type: 'Passport' | 'Visa' | 'Insurance' | 'Ticket';
  docNumber: string;
  expiryDate: string;
  status: 'Valid' | 'Expiring Soon' | 'Action Required';
}
