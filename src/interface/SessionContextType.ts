import { Session } from "./Session";

export interface SessionContextType {
  sessions: Session[],
  handleAddSession: (session: Session) => void,
  handleDeleteSession: (sessionId: string) => void
}