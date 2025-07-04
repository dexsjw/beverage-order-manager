import { SessionUser } from "./SessionUser"

export type SessionUserContextType = {
  sessionUser: SessionUser,
  handleSessionUserChange: (sessionUserKey: string, sessionUserValue: string) => void
}