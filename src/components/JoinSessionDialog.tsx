import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from "@mui/material";
import { JoinSessionDialogProps } from "../type-interface/props/JoinSessionDialogProps";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function JoinSessionDialog({
  sessionCredentials,
  isDialogOpen,
  onDialogClose
}: Readonly<JoinSessionDialogProps>) {

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isDisplayErrorMessage, setIsDisplayErrorMessage] = useState(false);
  
  const handleClose = () => {
    onDialogClose(isDialogOpen);
  }
  
  const handleJoinSession = () => {
    if (password === sessionCredentials.password) {
      navigate(`main-session/${sessionCredentials.id}`);
    } else {
      setIsDisplayErrorMessage(true);
    }
  }

  return (
    <Box>
      <Dialog 
        onClose={handleClose}
        open={isDialogOpen}
      >
        <Box sx={{ p: 1 }}>
          <Stack>
            <DialogTitle>{`Session Name: ${sessionCredentials.name}`}</DialogTitle>
            <DialogContent>
              <DialogContentText align="left">
                Enter Password:
              </DialogContentText>
              <TextField
                required
                type="password"
                id="password"
                name="password"
                label="Password"
                margin="dense"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {isDisplayErrorMessage &&
                <DialogContentText
                  align="left"
                  color="error"
                >
                  Password is wrong!
                </DialogContentText>
              }
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button 
                variant="contained"
                onClick={handleJoinSession}
              >
                Join
              </Button>
            </DialogActions>
          </Stack>
        </Box>
      </Dialog>
    </Box>
  )
}

export default JoinSessionDialog;