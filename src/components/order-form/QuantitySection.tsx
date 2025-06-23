import { Stack, TextField, Typography } from "@mui/material";
import { QuantitySectionProps } from "../../type-interface/props/QuantitySectionProps";
import { useState } from "react";

const initialQuantity = 1;

function QuantitySection({ handleQuantityChange }: Readonly<QuantitySectionProps>) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityValueChange = (quantityValue: string) => {
    if (false) {

    }
    parseInt(quantityValue);
  }

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
        // type="number"
        variant="filled"
        id="quantity"
        name="quantity"
        label="Quantity"
        value={quantity}
        onChange={(event) => handleQuantityValueChange(event.target.value)}
      />
  </Stack>
  )
}

export default QuantitySection;