import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import MainSessionData from "../components/MainSessionData";
import { AvailableBrands } from "../static-data/AvailableBrandsData";

function MainSession() {
  const [tabIndex, setTabIndex] = useState(0);

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
      />
    </Box>
  )
}

export default MainSession;