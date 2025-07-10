import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockGetSession, mockPutSession } from "../api-service/mock-service";
import MainSessionData from "../components/MainSessionData";
import { useSessionUserContext } from "../context/SessionUserContext";
import { Brands } from "../static-data/BrandsData";
import { Order } from "../type-interface/Order";
import { Session } from "../type-interface/Session";
import JoinSessionDialog from "../components/JoinSessionDialog";

const emptySessionCredentials: Pick<Session, "id" | "name" | "password"> = {
  id: "",
  name: "",
  password: ""
}

function MainSession() {
  // TODO: add JoinSessionDialog to check if session has been joined before
  const { sessionUser, joinedSessions } = useSessionUserContext();
  const { sessionId } = useParams();
  const navigate = useNavigate();
  
  const newSession: Session = {
    id: sessionId ?? "",
    name: "",
    password: "",
    owner: sessionUser,
    timestamp: new Date(Date.now()).toLocaleDateString("en-GB"),
    isActive: true,
    data: {
      orders: [],
      transactions: []
    }
  }

  const [sessionCredentials, setSessionCredentials] = useState<Pick<Session, "id" | "name" | "password">>(emptySessionCredentials);
  const [session, setSession] = useState(newSession);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    retrieveSessionData();
  }, [])

  const retrieveSessionData = async () => {
    if (sessionId) {
      const foundSession = await mockGetSession(sessionId);
      if (foundSession) {
        populateDialogDetails(foundSession);
        setSession(foundSession);
      } else {
        console.error(`Unable to find Session with id: ${sessionId}`);
        navigate("/");
      }
    } else {
      console.error(`Session ID is undefined or empty: ${sessionId}`);
      navigate("/");
    }
  }

  const populateDialogDetails = (foundSession: Session) => {
    setSessionCredentials({
      id: foundSession.id,
      name: foundSession.name,
      password: foundSession.password
    });
  }

  // Start #mock
  const mockUpdateSessionOrders = async (updatedOrders: Order[]) => {
    const updatedSession: Session = {
      ...session,
      data: {
        ...session.data,
        orders: updatedOrders
      }
    };
    const sessionResponse = await mockPutSession(session.id, updatedSession);
    if (sessionResponse) {
      setSession(sessionResponse);
    } else {
      console.error("Failed to update Session with updated Orders");
    }
  }
  // End #mock

  const handleDialogClose = () => {
    navigate("/");
  }

  const handleTabChange = (tabIndex: number) => {
    setTabIndex(tabIndex);
  }

  return (
    <Box component="section" sx={{ borderBottom: 1, borderColor: 'divider' }}>
      {!joinedSessions.sessionIds.includes(session.id) &&
        <JoinSessionDialog
          sessionCredentials={sessionCredentials}
          isDialogOpen={true}
          handleDialogClose={handleDialogClose}
        />
      }
      {joinedSessions.sessionIds.includes(session.id) &&
        <Box>
          <Tabs
            value={tabIndex}
            onChange={(event, tabIndex) => handleTabChange(tabIndex)}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            {Brands.map(brand => (
              <Tab 
                key={brand}
                // .replaceAll() is recommended to be used for target library 'es2021' or later
                label={brand.replace(/_/g, " ")} 
              />
            ))}
          </Tabs>
          <MainSessionData
            key={tabIndex}
            selectedBrandIndex={tabIndex}
            timestamp={session.timestamp}
            sessionOrders={session.data.orders}
            mockUpdateSessionOrders={mockUpdateSessionOrders}
          />
        </Box>
      }
    </Box>
  )
}

export default MainSession;