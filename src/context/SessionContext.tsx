import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { SessionContextType } from "../type/SessionContextType";
import { Session } from "../type/Session";

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSessionContext = () => {
  const sessionContext = useContext(SessionContext);
  if (!sessionContext) {
    throw new Error("useSessionContext() must be used within a SessionProvider")
  }
  return sessionContext;
}

export function SessionProvider({ children }: Readonly<{children: ReactNode}>) {
  const [sessions, setSessions] = useState<Session[]>([]);

  const handleCreateSession = (session: Session) => {
    setSessions(prevState => [session, ...prevState]);
  }

  const handleDeleteSession = (sessionId: string) => {
    setSessions(prevState => prevState.filter(session => session.id !== sessionId));
  }

  const contextValue: SessionContextType = useMemo(() => {
    return {
      sessions,
      handleCreateSession,
      handleDeleteSession
    }
  }, [])

  return (
    <SessionContext.Provider value={contextValue}>
      { children }
    </SessionContext.Provider>
  )
}