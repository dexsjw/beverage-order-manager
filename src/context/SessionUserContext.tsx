import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { JoinedSessions } from "../type-interface/JoinedSessions";
import { SessionUser } from "../type-interface/SessionUser";
import { SessionUserContextType } from "../type-interface/SessionUserContextType";

const BOM_SESSION_USER_KEY = "bomSessionUserKey";
const BOM_JOINED_SESSIONS_KEY = "bomJoinedSessionsKey";

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

// 30 mins = 1,800,000 ms = 1.8e6 ms
let currentJoinedSessions: JoinedSessions = {
  sessionIds: [],
  expiryTimestamp: new Date(Date.now() + 1.8e6).toISOString()
};
const existingJoinedSessionsStr = localStorage.getItem(BOM_JOINED_SESSIONS_KEY);
if (existingJoinedSessionsStr) {
  try {
    const existingJoinedSessions: JoinedSessions = JSON.parse(existingJoinedSessionsStr);
    if (Date.parse(existingJoinedSessions.expiryTimestamp) <= Date.now()) {
      localStorage.removeItem(BOM_JOINED_SESSIONS_KEY);
    } else {
      currentJoinedSessions = existingJoinedSessions;
    }
  } catch (error) {
    console.error(error);
    localStorage.removeItem(BOM_JOINED_SESSIONS_KEY);
  }
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
  const [joinedSessions, setJoinedSessions] = useState<JoinedSessions>(currentJoinedSessions);

  useEffect(() => {
    const checkExpiryTimestampInterval = setInterval(() => {
      if (Date.parse(joinedSessions.expiryTimestamp) <= Date.now()) {
        setJoinedSessions({
          sessionIds: [],
          expiryTimestamp: new Date(Date.now() + 1.8e6).toISOString()
        })
        localStorage.removeItem(BOM_JOINED_SESSIONS_KEY);
      }
    }, 1.8e6);

    return () => {
      clearInterval(checkExpiryTimestampInterval);
    };
  }, []);

  const handleSessionUserChange = useCallback((sessionUserKey: string, sessionUserValue: string) => {
    const updatedSessionUser: SessionUser = {
      ...sessionUser,
      [sessionUserKey]: sessionUserValue
    };
    setSessionUser(updatedSessionUser);
    localStorage.setItem(BOM_SESSION_USER_KEY, JSON.stringify(updatedSessionUser));
  }, [sessionUser]);

  const handleAddSessionId = useCallback((sessionId: string) => {
    if (!joinedSessions.sessionIds.includes(sessionId)) {
      const updatedJoinedSessions: JoinedSessions = {
        ...joinedSessions,
        sessionIds: [...joinedSessions.sessionIds, sessionId]
      };
      setJoinedSessions(updatedJoinedSessions);
      localStorage.setItem(BOM_JOINED_SESSIONS_KEY, JSON.stringify(updatedJoinedSessions));
    }
  }, [joinedSessions]);

  const contextValue: SessionUserContextType = useMemo(() => {
    return {
      sessionUser,
      joinedSessions,
      handleSessionUserChange,
      handleAddSessionId
    }
  }, [
    sessionUser,
    joinedSessions,
    handleSessionUserChange,
    handleAddSessionId
  ]);

  return (
    <SessionUserContext.Provider value={contextValue}>
      { children }
    </SessionUserContext.Provider>
  )
}