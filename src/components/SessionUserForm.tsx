import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SessionUser } from "../type-interface/SessionUser";

const BOM_SESSION_USER_KEY = "bomSessionUserKey";
const existingSessionUser = localStorage.getItem(BOM_SESSION_USER_KEY);
const newSessionUser: SessionUser = { id: crypto.randomUUID(), name: "" };
let currentSessionUser: SessionUser = { id: "", name: "" };

try {
  currentSessionUser = existingSessionUser
    ? JSON.parse(existingSessionUser)
    : newSessionUser;
  if (!currentSessionUser.id || currentSessionUser.id.trim() === "") {
    console.warn("Removing key...");
    localStorage.removeItem(BOM_SESSION_USER_KEY);
    currentSessionUser = newSessionUser;
  }
} catch (error) {
  console.error(error);
  localStorage.removeItem(BOM_SESSION_USER_KEY);
}

function SessionUserForm() {
  const [sessionUser, setSessionUser] = useState(currentSessionUser);

  const handleSessionUserNameChange = (sessionUserName: string) => {
    setSessionUser((prevSessionUser) => {
      const newSessionUser = {
        ...prevSessionUser,
        name: sessionUserName
      };
      localStorage.setItem(BOM_SESSION_USER_KEY, JSON.stringify(newSessionUser));
      return newSessionUser;
    });
  }

  return (
    <Stack spacing={2}>
      <Typography 
        variant="body1" 
        component="div"
        align="left" 
      >
        User ID: {sessionUser.id}
      </Typography>
      <TextField 
        required 
        id="session-username"
        name="session-username"
        label="User Name"
        value={sessionUser.name}
        onChange={(event) => handleSessionUserNameChange(event.target.value)}
      />
    </Stack>
  )
}

export default SessionUserForm;