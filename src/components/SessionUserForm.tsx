import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { SessionUser } from "../type-interface/SessionUser";
import { FlexBoxRowGap } from "./styled/FlexBox";
import { SessionUserFormProps } from '../type-interface/props/SessionUserFormProps';

// const BOM_SESSION_USER_KEY = "bomSessionUserKey";
// const existingSessionUser = localStorage.getItem(BOM_SESSION_USER_KEY);
// const newSessionUser: SessionUser = { id: crypto.randomUUID(), name: "" };
// let currentSessionUser: SessionUser = { id: "", name: "" };

// try {
//   currentSessionUser = existingSessionUser
//     ? JSON.parse(existingSessionUser)
//     : newSessionUser;
//   if (!currentSessionUser.id || currentSessionUser.id.trim() === "") {
//     console.warn("Removing key...");
//     localStorage.removeItem(BOM_SESSION_USER_KEY);
//     currentSessionUser = newSessionUser;
//   }
// } catch (error) {
//   console.error(error);
//   localStorage.removeItem(BOM_SESSION_USER_KEY);
// }

function SessionUserForm({ sessionUser, handleSessionUserChange }: Readonly<SessionUserFormProps>) {
  const [isIdFieldDisabled, setIsIdFieldDisabled] = useState(true);
  // const [sessionUser, setSessionUser] = useState(currentSessionUser);

  // const handleSessionUserIdChange = (sessionUserId: string) => {
  //   setSessionUser(prevSessionUser => {
  //     const newSessionUser: SessionUser = {
  //       ...prevSessionUser,
  //       id: sessionUserId
  //     };
  //     localStorage.setItem(BOM_SESSION_USER_KEY, JSON.stringify(newSessionUser));
  //     return newSessionUser;
  //   });
  // }

  // const handleSessionUserNameChange = (sessionUserName: string) => {
  //   setSessionUser(prevSessionUser => {
  //     const newSessionUser: SessionUser = {
  //       ...prevSessionUser,
  //       name: sessionUserName
  //     };
  //     localStorage.setItem(BOM_SESSION_USER_KEY, JSON.stringify(newSessionUser));
  //     return newSessionUser;
  //   });
  // }

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
          onChange={(event) => handleSessionUserChange(event)}
        />
        <IconButton onClick={() => setIsIdFieldDisabled(prevState => !prevState)}>
          <EditIcon />
        </IconButton>
      </FlexBoxRowGap>
      <TextField 
        required 
        id="session-username"
        name="name"
        label="User Name"
        value={sessionUser.name}
        onChange={(event) => handleSessionUserChange(event)}
      />
    </Stack>
  )
}

export default SessionUserForm;