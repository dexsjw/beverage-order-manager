import { Box, Button, Dialog, DialogTitle, Stack, TextField } from "@mui/material";

function JoinSessionDialog() {

  return (
    <Box>
      <Dialog open={false}>
        <Box sx={{ p: 1 }}>
          <Stack spacing={1}>
            <DialogTitle>Enter Password: </DialogTitle>
            <TextField
              required 
              type="password"
              id="password" 
              label="Password" 
            />
            <Button variant="contained">Join</Button>
          </Stack>
        </Box>
      </Dialog>
    </Box>
  )
}

export default JoinSessionDialog;