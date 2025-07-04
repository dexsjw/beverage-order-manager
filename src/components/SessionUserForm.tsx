import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { SessionUserFormProps } from '../type-interface/props/SessionUserFormProps';
import { FlexBoxRowGap } from "./styled/FlexBox";
import { useSessionUserContext } from '../context/SessionUserContext';

// function SessionUserForm({ sessionUser, handleSessionUserChange }: Readonly<SessionUserFormProps>) {
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
    </Stack>
  )
}

export default SessionUserForm;