import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { SessionContextType } from "../type-interface/SessionContextType";
import { Session } from "../type-interface/Session";

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSessionContext = () => {
  const sessionContext = useContext(SessionContext);
  if (!sessionContext) {
    throw new Error("useSessionContext() must be used within a SessionProvider")
  }
  return sessionContext;
}

export function SessionProvider({ children }: Readonly<{children: ReactNode}>) {
  // const [sessions, setSessions] = useState<Session[]>([]);
  const [sessions, setSessions] = useState<Session[]>(testSessions);

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

const testSessions: Session[] = [
  {
    id: "001",
    name: "testSession",
    password: "testest",
    owner: {
      id: "admin",
      name: "admin"
    },
    timestamp: new Date(Date.now()).toLocaleDateString("en-GB"),
    isActive: true,
    data: {
      orders: [
        {
          id: "123",
          brand: "One Plus Kopi",
          sessionUser: {
            id: "ownerId",
            name: "admin"
          },
          beverage: {
            id: 101,
            category: "Hot Traditional Coffee",
            name: "Kopi",
            price: 1.8
          },
          customisations: {
            isTakeAway: true,
            thicknessLevel: "Di Lo (Thickest)",
            sweetnessLevel: "Siu Dai (Less Sweet)"
          },
          quantity: 1
        }
      ],
      transactions: [
        {
          id: "123",
          timestamp: new Date(Date.now()).toLocaleDateString("en-GB"),
          payer: {
            id: "testUser",
            name: "testUser"
          },
          payee: {
            id: "admin",
            name: "admin"
          },
          amount: 1.8,
          isPaid: false,
          paidTimestamp: new Date(Date.now() + 5).toLocaleDateString("en-GB")
        }
      ]
    }
  },
  {
    id: "002",
    name: "testSession2",
    password: "testest",
    owner: {
      id: "admin",
      name: "admin"
    },
    timestamp: new Date(Date.now()).toLocaleDateString("en-GB"),
    isActive: true,
    data: {
      orders: [
        {
          id: "234",
          brand: "One Plus Kopi",
          sessionUser: {
            id: "ownerId",
            name: "admin"
          },
          beverage: {
            id: 101,
            category: "Hot Traditional Coffee",
            name: "Kopi",
            price: 1.8
          },
          customisations: {
            isTakeAway: true,
            thicknessLevel: "Di Lo (Thickest)",
            sweetnessLevel: "Siu Dai (Less Sweet)"
          },
          quantity: 1
        }
      ],
      transactions: [
        {
          id: "234",
          timestamp: new Date(Date.now()).toLocaleDateString("en-GB"),
          payer: {
            id: "testUser",
            name: "testUser"
          },
          payee: {
            id: "admin",
            name: "admin"
          },
          amount: 1.8,
          isPaid: false,
          paidTimestamp: new Date(Date.now() + 5).toLocaleDateString("en-GB")
        }
      ]
    }
  }
]