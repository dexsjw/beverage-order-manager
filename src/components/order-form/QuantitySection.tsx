import { Box, Stack, TextField, Typography } from "@mui/material";

function QuantitySection() {
  return (
    <Stack spacing={1}>
    <Typography 
      variant="body1" 
      align="left" 
      component="div"
    >
      Quantity
    </Typography>
      <TextField 
        id="quantity"
        required
        type="number"
        variant="filled"
        placeholder="1" 
      />
  </Stack>
  )
}

export default QuantitySection;