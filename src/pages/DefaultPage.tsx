import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function DefaultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [])

  return (
    <Box>
      <Typography 
        variant="body1"
        component="div"
      >
        You have entered an invalid path: {location.pathname}. Redirecting to home page...
      </Typography>
    </Box>
  )
}

export default DefaultPage;