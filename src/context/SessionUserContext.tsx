import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { SessionUserContextType } from "../type-interface/SessionUserContextType";
import { SessionUser } from "../type-interface/SessionUser";

const SessionUserContext = createContext<SessionUserContextType | undefined>(undefined);

export const useSessionUserContext = () => {
  const sessionUserContext = useContext(SessionUserContext);
  if (!sessionUserContext) {
    throw new Error("useSessionUserContext() must be used within a SessionUserProvider")
  }
  return sessionUserContext;
}

export function SessionUserProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [sessionUser, setSessionUser] = useState<SessionUser>({ id: "", name: ""});

  const contextValue: SessionUserContextType = useMemo(() => {
    return {
      sessionUser
    }
  }, [sessionUser]);

  return (
    <SessionUserContext.Provider value={contextValue}>
      { children }
    </SessionUserContext.Provider>
  )
}