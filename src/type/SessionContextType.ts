import { Session } from "./Session";

export type SessionContextType = {
  sessions: Session[],
  handleCreateSession: (session: Session) => void,
  handleDeleteSession: (sessionId: string) => void
}