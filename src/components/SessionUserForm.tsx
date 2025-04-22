import { Stack, TextField, Typography } from "@mui/material";

function SessionUserForm() {
  return (
    <Stack spacing={2}>
      <Typography 
        variant="body1" 
        component="div"
        align="left" 
      >
        User ID: {123}
      </Typography>
      <TextField 
        required 
        id="session-username" 
        label="User Name" 
      />
    </Stack>
  )
}

export default SessionUserForm;