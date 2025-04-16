import { Box, Tab, Tabs } from "@mui/material";
import MainSessionOrder from "../components/MainSessionOrder";

function MainSession() {


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
      <MainSessionOrder />
    </Box>
  )
}

export default MainSession;