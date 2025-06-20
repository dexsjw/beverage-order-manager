import { Stack, TextField, Typography } from "@mui/material";
import { QuantitySectionProps } from "../../type-interface/props/QuantitySectionProps";

const initialQuantity = 1;

function QuantitySection({ handleQuantityChange }: Readonly<QuantitySectionProps>) {
  return (
    <Stack spacing={1}>
    <Typography 
      variant="h6" 
      component="div"
      align="left" 
    >
      Quantity
    </Typography>
      <TextField 
        required
        type="number"
        variant="filled"
        id="quantity"
        name="quantity"
        label="Quantity"
        defaultValue={1}
      />
  </Stack>
  )
}

export default QuantitySection;