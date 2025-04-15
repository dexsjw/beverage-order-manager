import { Box, Button, styled, TextField } from "@mui/material";
import { FlexBoxColumnGap } from "./styled/FlexBox";

function SessionForm() {


  return (
    <FlexBoxColumnGap>
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
        Create
      </Button>
    </FlexBoxColumnGap>
  )
}

export default SessionForm;