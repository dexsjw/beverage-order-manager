import { JoinedSessions } from "./JoinedSessions"
import { SessionUser } from "./SessionUser"

export type SessionUserContextType = {
  sessionUser: SessionUser,
  joinedSessions: JoinedSessions,
  handleSessionUserChange: (sessionUserKey: string, sessionUserValue: string) => void,
  handleAddSessionId: (sessionId: string) => void
}