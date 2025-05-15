import { Session } from "../type/Session";

export interface SessionContextType {
  sessions: Session[],
  handleCreateSession: (session: Session) => void,
  handleDeleteSession: (sessionId: string) => void
}