import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import MainSessionData from "../components/MainSessionData";
import { Brands } from "../static-data/BrandsData";

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
        {Brands.map(brand => (
          <Tab 
            key={brand}
            // .replaceAll() is recommended to be used for target library 'es2021' or later
            label={brand.replace(/_/g, " ")} 
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