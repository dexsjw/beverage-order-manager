import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockPostSession, mockPostSessionDetails } from "../api-service/mock-service";
import { useSessionUserContext } from "../context/SessionUserContext";
import { Session } from "../type-interface/Session";

function SessionForm() {
  const { sessionUser } = useSessionUserContext();

  const newSession: Session = {
    id: crypto.randomUUID(),
    name: "",
    password: "",
    owner: sessionUser,
    timestamp: new Date(Date.now()).toLocaleDateString("en-GB"),
    isActive: true,
    data: {
      orders: [],
      transactions: []
    }
  }

  const navigate = useNavigate();

  const [session, setSession] = useState(newSession);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordsMatch, setIsPasswordsMatch] = useState<boolean>(true);

  const handleSessionFieldsChange = (fieldName: string, fieldValue: string) => {
    if (fieldName === "password") {
      setIsPasswordsMatch(fieldValue === confirmPassword);
    }
    setSession(prevSession => {
      return {
        ...prevSession,
        [fieldName]: fieldValue
      }
    })
  }

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
    setIsPasswordsMatch(session.password === confirmPassword);
  }

  const handleCreateSessionClick = async () => {
    if (session.name.trim() !== "" && session.password !== "" && confirmPassword !== "" && isPasswordsMatch) {
      await mockPostSession(session);
      await mockPostSessionDetails(session);
      navigate(`main-session/${session.id}`);
    }
  }

  return (
    <Stack spacing={2}>
      <TextField 
        required 
        id="session-name"
        name="name"
        label="Session Name"
        value={session.name}
        onChange={(event) => handleSessionFieldsChange(event.target.name, event.target.value)}
      />
      <TextField 
        required 
        type="password"
        id="password"
        name="password"
        label="Password"
        value={session.password}
        onChange={(event) => handleSessionFieldsChange(event.target.name, event.target.value)}
      />
      <TextField 
        required 
        type="password"
        id="confirm-password"
        name="confirm-password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(event) => handleConfirmPasswordChange(event.target.value)}
      />
      {!isPasswordsMatch && 
        <Typography 
          variant="body1" 
          component="div"
          align="left"
          color="error"
        >
          Passwords do not match!
        </Typography>
      }
      <Button
        variant="contained"
        onClick={handleCreateSessionClick}
      >
        Create Session
      </Button>
    </Stack>
  )
}

export default SessionForm;