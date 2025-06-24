import { Stack, TextField, Typography } from "@mui/material";
import { QuantitySectionProps } from "../../type-interface/props/QuantitySectionProps";
import { useState } from "react";

// TODO: fix regex
const numberOnlyRegex = /\d/;
const initialQuantity = 1;

function QuantitySection({ handleQuantityChange }: Readonly<QuantitySectionProps>) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleQuantityValueChange = (quantityStrValue: string) => {
    console.log(quantityStrValue);
    console.log(numberOnlyRegex.test(quantityStrValue.trim()));
    if (numberOnlyRegex.test(quantityStrValue.trim())) {
      // TODO: to set as "0" if no value is present
      const quantityValue = quantityStrValue === "" ? 0 : parseInt(quantityStrValue);
      setQuantity(quantityValue);
      handleQuantityChange(quantityValue);
    }
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
        variant="filled"
        id="quantity"
        name="quantity"
        label="Quantity"
        slotProps={{
          htmlInput: {
            inputMode: "numeric"
          }
        }}
        value={quantity}
        onChange={(event) => handleQuantityValueChange(event.target.value)}
      />
  </Stack>
  )
}

export default QuantitySection;