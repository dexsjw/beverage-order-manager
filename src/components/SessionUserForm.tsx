import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSessionUserContext } from '../context/SessionUserContext';
import { FlexBoxRowGap } from "./styled/FlexBox";

function SessionUserForm() {
  const { sessionUser, handleSessionUserChange } = useSessionUserContext();
  const [isIdFieldDisabled, setIsIdFieldDisabled] = useState(true);

  return (
    <Stack spacing={2}>
      <FlexBoxRowGap>
        <TextField 
          required
          fullWidth
          disabled={isIdFieldDisabled}
          id="session-user-id"
          name="id"
          label="User ID"
          value={sessionUser.id}
          onChange={(event) => handleSessionUserChange(event.target.name, event.target.value)}
        />
        {isIdFieldDisabled && 
          <IconButton onClick={() => setIsIdFieldDisabled(prevState => !prevState)}>
            <EditIcon />
          </IconButton>
        }
        {!isIdFieldDisabled && 
          <IconButton onClick={() => setIsIdFieldDisabled(prevState => !prevState)}>
            <DoneIcon />
          </IconButton>
        }
      </FlexBoxRowGap>
      <TextField 
        required 
        id="session-user-name"
        name="name"
        label="User Name"
        value={sessionUser.name}
        onChange={(event) => handleSessionUserChange(event.target.name, event.target.value)}
      />
      {(!sessionUser.id || !sessionUser.name) && 
        <Typography
          variant="body1" 
          component="div"
          align="left"
          color="error"
        >
          User ID or Name cannot be blank!
        </Typography>
      }
    </Stack>
  )
}

export default SessionUserForm;