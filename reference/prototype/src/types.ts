export interface User {
  id: string;
  name: string;
  photoUrl: string;
  city: string;
  zone: string;
  interests: string[];
  status: 'pending' | 'approved' | 'rejected';
  isPremium: boolean;
  registrationReason?: string;
  joinedPlans: string[]; // plan IDs
  createdPlans: string[]; // plan IDs
  creatorRating: number;
  participantRating: number;
  plansAsParticipantCount: number;
  plansAsCreatorCount: number;
  noShowCount: number;
  phone: string;
  email: string;
}

export interface Plan {
  id: string;
  title: string;
  category: string;
  description: string;
  zone: string;
  date: string;
  time: string;
  creatorId: string;
  creatorName: string;
  creatorPhoto: string;
  maxCups: number;
  joinedCount: number;
  joinedUserIds: string[];
  isPaid: boolean;
  priceAmount?: string;
  priceDetails?: string;
  genderPreference: 'mixed' | 'women' | 'none';
  imageUrl: string;
  imageGeneratedByAI: boolean;
  status: 'active' | 'completed' | 'cancelled' | 'flagged' | 'pending_moderation';
  reviewsCount?: number;
  ratingAverage?: number;
}

export interface Message {
  id: string;
  planId: string;
  userId: string;
  userName: string;
  userPhoto: string;
  text: string;
  imageUrl?: string;
  timestamp: Date;
}

export interface Review {
  id: string;
  planId: string;
  planTitle: string;
  reviewerId: string;
  reviewerName: string;
  reviewerPhoto: string;
  rating: number; // 1-5
  comment: string;
  role: 'creator' | 'participant';
  timestamp: Date;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'approved' | 'plan_joined' | 'chat' | 'review_prompt' | 'cancelled' | 'system_alert';
  planId?: string;
  timestamp: Date;
  read: boolean;
}
