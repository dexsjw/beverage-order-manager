import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { SessionUserContextType } from "../type-interface/SessionUserContextType";
import { SessionUser } from "../type-interface/SessionUser";
import { JoinedSessions } from "../type-interface/JoinedSessions";

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
  expiryTimestamp: new Date(Date.now() + 1.8e6).toLocaleString("en-GB")
};
const existingJoinedSessionsStr = localStorage.getItem(BOM_JOINED_SESSIONS_KEY);
if (existingJoinedSessionsStr) {
  try {
    const existingJoinedSessions: JoinedSessions = JSON.parse(existingJoinedSessionsStr);
    if (Date.parse(existingJoinedSessions.expiryTimestamp) > Date.now()) {
      currentJoinedSessions = existingJoinedSessions;
    } else {
      console.warn("Removing key...");
      localStorage.removeItem(BOM_JOINED_SESSIONS_KEY);
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
      if (Date.parse(joinedSessions.expiryTimestamp) < Date.now()) {
        setJoinedSessions({
          sessionIds: [],
          expiryTimestamp: new Date(Date.now() + 1.8e6).toLocaleString("en-GB")
        })
        localStorage.removeItem(BOM_JOINED_SESSIONS_KEY);
      }
    }, 1.8e6);

    return () => {
      clearInterval(checkExpiryTimestampInterval);
    };
  }, []);

  const handleSessionUserChange = (sessionUserKey: string, sessionUserValue: string) => {
    const updatedSessionUser: SessionUser = {
      ...sessionUser,
      [sessionUserKey]: sessionUserValue
    };
    setSessionUser(updatedSessionUser);
    localStorage.setItem(BOM_SESSION_USER_KEY, JSON.stringify(updatedSessionUser));
  }

  const handleAddSessionId = (sessionId: string) => {
    const updatedJoinedSessions: JoinedSessions = {
      ...joinedSessions,
      sessionIds: [...joinedSessions.sessionIds, sessionId]
    };
    setJoinedSessions(updatedJoinedSessions);
    localStorage.setItem(BOM_JOINED_SESSIONS_KEY, JSON.stringify(updatedJoinedSessions));
  }

  const contextValue: SessionUserContextType = useMemo(() => {
    return {
      sessionUser,
      joinedSessions,
      handleSessionUserChange,
      handleAddSessionId
    }
  }, [sessionUser, joinedSessions]);

  return (
    <SessionUserContext.Provider value={contextValue}>
      { children }
    </SessionUserContext.Provider>
  )
}