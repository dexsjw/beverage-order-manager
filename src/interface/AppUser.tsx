export interface AppUser {
  id: string,
  name: string,
  userRole: UserRole
}

export const enum UserRole {
  AppAdmin = "APP_ADMIN",
  AppUser = "APP_USER"
}