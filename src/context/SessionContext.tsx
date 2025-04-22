import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { SessionContextType } from "../interface/SessionContextType";
import { Session } from "../interface/Session";

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

  const handleAddSession = (session: Session) => {
    setSessions(prevState => [session, ...prevState]);
  }

  const handleDeleteSession = (sessionId: string) => {
    setSessions(prevState => prevState.filter(session => session.id !== sessionId));
  }

  const contextValue: SessionContextType = useMemo(() => {
    return {
      sessions,
      handleAddSession,
      handleDeleteSession
    }
  }, [])

  return (
    <SessionContext.Provider value={contextValue}>
      { children }
    </SessionContext.Provider>
  )
}