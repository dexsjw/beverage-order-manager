import { Button, Stack, TextField } from "@mui/material";

function SessionForm() {


  return (
    <Stack spacing={2}>
      <TextField 
        required 
        id="session-name" 
        label="Session Name" 
      />
      <TextField 
        required 
        type="password"
        id="password" 
        label="Password" 
      />
      <TextField 
        required 
        type="password"
        id="confirm-password" 
        label="Confirm Password" 
      />
      <Button
        variant="contained"
      >
        Create Session
      </Button>
    </Stack>
  )
}

export default SessionForm;