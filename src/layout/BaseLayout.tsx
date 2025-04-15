import CoffeeIcon from '@mui/icons-material/Coffee';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { FlexContainer, FlexContainerColumn } from '../components/FlexContainerBox';

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

      <FlexContainerColumn>
        <Outlet />
      </FlexContainerColumn>
    </Container>
  )
}

export default BaseLayout;