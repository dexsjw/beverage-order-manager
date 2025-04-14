import { Box, styled, TextField } from "@mui/material";

function SessionForm() {
  const CustomTextField = styled(TextField)({
    margin: 10,

  })

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column"
    }}>
      <CustomTextField 
        required 
        id="session-name" 
        label="Session Name" 
      />
      <CustomTextField 
        required 
        type="password"
        id="password" 
        label="Password" 
      />
      <CustomTextField 
        required 
        type="password"
        id="confirm-password" 
        label="Confirm Password" 
      />
    </Box>
  )
}

export default SessionForm;