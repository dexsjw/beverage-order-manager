export type SessionUser = {
  id: string,
  name: string,
  userRole: SessionRole
}

export type SessionRole = "SESSION_ADMIN" | "SESSION_USER";