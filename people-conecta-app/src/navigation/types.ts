import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
  VerifyEmail: { email: string };
  Onboarding: undefined;
  PendingApproval: undefined;
};

export type MainTabParams = {
  Explore: undefined;
  Create: undefined;
  MyPlans: undefined;
  Profile: undefined;
};

export type RootStackParams = {
  Auth: NavigatorScreenParams<AuthStackParams>;
  Main: NavigatorScreenParams<MainTabParams>;
  PlanDetail: { planId: string; from?: 'explore' | 'myPlans' };
  CreatePlan: undefined;
  Chat: { planId: string; planName: string };
  OnboardingPreview: undefined;
};
