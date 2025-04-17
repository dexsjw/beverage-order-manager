import { Stack, TextField, Typography } from "@mui/material";

function QuantitySection() {
  return (
    <Stack spacing={1}>
    <Typography 
      variant="body1" 
      component="div"
      align="left" 
    >
      Quantity
    </Typography>
      <TextField 
        id="quantity"
        required
        type="number"
        variant="filled"
        defaultValue={1} 
      />
  </Stack>
  )
}

export default QuantitySection;