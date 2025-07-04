import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { SessionUserContextType } from "../type-interface/SessionUserContextType";
import { SessionUser } from "../type-interface/SessionUser";

const BOM_SESSION_USER_KEY = "bomSessionUserKey";

let currentSessionUser: SessionUser = { id: "", name: "" };
const newSessionUser: SessionUser = { id: crypto.randomUUID(), name: "" };
const existingSessionUser = localStorage.getItem(BOM_SESSION_USER_KEY);
try {
  currentSessionUser = existingSessionUser ? JSON.parse(existingSessionUser) : newSessionUser;
  if (!currentSessionUser.id || currentSessionUser.id.trim() === "") {
    console.warn("Removing key...");
    localStorage.removeItem(BOM_SESSION_USER_KEY);
    currentSessionUser = newSessionUser;
  }
} catch (error) {
  console.error(error);
  localStorage.removeItem(BOM_SESSION_USER_KEY);
}

const SessionUserContext = createContext<SessionUserContextType | undefined>(undefined);

export const useSessionUserContext = () => {
  const sessionUserContext = useContext(SessionUserContext);
  if (!sessionUserContext) {
    throw new Error("useSessionUserContext() must be used within a SessionUserProvider")
  }
  return sessionUserContext;
}

export function SessionUserProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [sessionUser, setSessionUser] = useState<SessionUser>(currentSessionUser);

  const handleSessionUserChange = (sessionUserKey: string, sessionUserValue: string) => {
    const updatedSessionUser: SessionUser = {
      ...sessionUser,
      [sessionUserKey]: sessionUserValue
    };
    setSessionUser(updatedSessionUser);
    localStorage.setItem(BOM_SESSION_USER_KEY, JSON.stringify(updatedSessionUser));
  }

  const contextValue: SessionUserContextType = useMemo(() => {
    return {
      sessionUser,
      handleSessionUserChange
    }
  }, [sessionUser]);

  return (
    <SessionUserContext.Provider value={contextValue}>
      { children }
    </SessionUserContext.Provider>
  )
}