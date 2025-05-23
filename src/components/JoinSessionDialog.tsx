import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from "@mui/material";
import { JoinSessionDialogProps } from "../type-interface/props/JoinSessionDialogProps";

function JoinSessionDialog({ sessionName, isDialogOpen }: Readonly<JoinSessionDialogProps>) {

  return (
    <Box>
      <Dialog 
        open={isDialogOpen}
        scroll="paper"
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
            <Button variant="contained">Join</Button>
          </Stack>
        </Box>
      </Dialog>
    </Box>
  )
}

export default JoinSessionDialog;