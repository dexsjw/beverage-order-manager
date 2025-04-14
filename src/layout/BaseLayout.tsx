import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CoffeeIcon from '@mui/icons-material/Coffee';

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
          <Typography variant="h6" component="div" sx={{flexGrow: "1"}}>
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

      <Outlet />
    </Container>
  )
}

export default BaseLayout;