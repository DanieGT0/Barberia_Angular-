export interface User {
  id: number;
  auth0Id: string;
  email: string;
  name: string;
  picture?: string;
  roles: Role[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: number;
  auth0Id: string;
  email: string;
  name: string;
  picture?: string;
  roles: Role[];
  isActive: boolean;
}