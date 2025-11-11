export type UserRole = 1 | 2 | 3;

export const UserRoles = {
  User: 1 as UserRole,
  Specialist: 2 as UserRole,
  Admin: 3 as UserRole,
} as const;

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface CreateUser {
  fullName: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUser {
  fullName: string;
  email: string;
  password?: string;
  role?: UserRole;
}