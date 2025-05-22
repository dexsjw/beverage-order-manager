import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainSessionData from "../components/MainSessionData";
import { useSessionContext } from "../context/SessionContext";
import { AvailableBrands } from "../static-data/AvailableBrandsData";
import { Order } from "../type-interface/Order";

function MainSession() {
  const { sessions } = useSessionContext();
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(0);

  let orders: Order[] = [];
  let sessionTimestamp: string = "";
  const selectedSession = sessions.find(session => session.id === sessionId);

  if (selectedSession === undefined) {
    console.error(`Unable to find Session with id: ${sessionId}`);
    navigate("/");
  } else {
    orders = selectedSession.data.orders;
    sessionTimestamp = selectedSession.timestamp;
  }

  const handleTabChange = (tabIndex: number) => {
    setTabIndex(tabIndex);
  }

  return (
    <Box component="section" sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={tabIndex}
        onChange={(event, tabIndex) => handleTabChange(tabIndex)}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        {AvailableBrands.map(brand => (
          <Tab 
            key={brand}
            label={brand} 
          />
        ))}
      </Tabs>
      <MainSessionData 
        selectedBrandIndex={tabIndex}
        orders={orders}
        sessionTimestamp={sessionTimestamp}
      />
    </Box>
  )
}

export default MainSession;