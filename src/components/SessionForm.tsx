import { Button, Stack, TextField, Typography } from "@mui/material";
import { SessionFormProps } from "../type-interface/props/SessionFormProps";
import { Session } from "../type-interface/Session";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";

const newSession: Session = {
  id: crypto.randomUUID(),
  name: "",
  password: "",
  owner: { id: "", name: "" },
  timestamp: new Date(Date.now()).toLocaleDateString("en-GB"),
  isActive: true,
  data: {
    orders: [],
    transactions: []
  }
}

function SessionForm({ sessionUser }: Readonly<SessionFormProps>) {
  const { handleCreateSession } = useSessionContext();
  const navigate = useNavigate();

  const [session, setSession] = useState(newSession);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordsMatch, setIsPasswordsMatch] = useState<boolean>(true);

  const handleSessionFieldsChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.name === "password") {
      setIsPasswordsMatch(event.target.value === confirmPassword);
    }
    setSession(prevSession => {
      return {
        ...prevSession,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
    setIsPasswordsMatch(session.password === confirmPassword);
  }

  const handleCreateSessionClick = () => {
    if (session.name !== "" && session.password !== "" && confirmPassword !== "" && isPasswordsMatch) {
      const updatedSession = structuredClone(session);
      updatedSession.owner = sessionUser;
      setSession(updatedSession);
      handleCreateSession(updatedSession);
      navigate(`main-session/${updatedSession.id}`);
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
        onChange={(event) => handleSessionFieldsChange(event)}
      />
      <TextField 
        required 
        type="password"
        id="password"
        name="password"
        label="Password"
        value={session.password}
        onChange={(event) => handleSessionFieldsChange(event)}
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