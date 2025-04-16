import CoffeeIcon from '@mui/icons-material/Coffee';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Container, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

function BaseLayout() {
  
  return (
    <Container>
      <AppBar>
        <Toolbar>
          <Box>
            <IconButton
              aria-label="home"
              edge="end"
            >
              <CoffeeIcon />
            </IconButton>
          </Box>
          <Typography variant="h5" component="div" sx={{flexGrow: "1"}}>
            Beverage Order Manager
          </Typography>
          <IconButton
            aria-label="menu"
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Stack sx={{ height: "100vh", pt: "5vh" }}>
        <Outlet />
      </Stack>
    </Container>
  )
}

export default BaseLayout;