export type AppCategory = 'Tools' | 'Games' | 'Social' | 'Productivity' | 'FullApps';

export interface AppMetadata {
  id: string;
  name: string;
  emoji: string;
  category: AppCategory;
  description: string;
  path: string;
  color: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
}
