import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from "@mui/material";
import { JoinSessionDialogProps } from "../type-interface/props/JoinSessionDialogProps";

function JoinSessionDialog({
  sessionId, 
  sessionName, 
  isDialogOpen,
  onDialogClose
}: Readonly<JoinSessionDialogProps>) {
  
  const handleClose = () => {
    onDialogClose(isDialogOpen);
  }
  

  return (
    <Box>
      <Dialog 
        onClose={handleClose}
        open={isDialogOpen}
      >
        <Box sx={{ p: 1 }}>
          <Stack>
            <DialogTitle>{`Session Name: ${sessionName}`}</DialogTitle>
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
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button 
                variant="contained"
                onClick={() => {}}
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