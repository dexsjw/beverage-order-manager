import { Box, Tab, Tabs } from "@mui/material";
import MainSessionOrder from "../components/MainSessionOrder";
import { useNavigate, useParams } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";
import { Order } from "../type-interface/Order";

function MainSession() {
  const { sessions } = useSessionContext();
  const { sessionId } = useParams();
  const navigate = useNavigate();

  let orders: Order[] = [];
  let timestamp: string = "";
  const selectedSession = sessions.find(session => session.id === sessionId);

  if (selectedSession === undefined) {
    console.error(`Unable to find Session with id: ${sessionId}`);
    navigate("/");
  } else {
    orders = selectedSession.data.orders;
    timestamp = selectedSession.timestamp;
  }


  return (
    <Box component="section" sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        <Tab label="One Plus Kopi" />
        <Tab label="Custom" />
      </Tabs>
      <MainSessionOrder 
        orders={orders}
        timestamp={timestamp}
      />
    </Box>
  )
}

export default MainSession;