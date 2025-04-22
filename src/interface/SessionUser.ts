export interface SessionUser {
  id: string,
  name: string,
  userRole: SessionRole
}

export const enum SessionRole {
  SessionAdmin = "SESSION_ADMIN",
  SessionUser = "SESSION_USER"
}