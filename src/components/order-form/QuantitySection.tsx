import { Stack, TextField, Typography } from "@mui/material";
import { QuantitySectionProps } from "../../type-interface/props/QuantitySectionProps";

const numbersOnlyRegex = /^\d{0,3}$/;

function QuantitySection({ quantity, handleQuantityChange }: Readonly<QuantitySectionProps>) {

  const handleQuantityValueChange = (quantityStrValue: string) => {
    if (numbersOnlyRegex.test(quantityStrValue.trim())) {
      const quantityValue = quantityStrValue === "" ? 0 : parseInt(quantityStrValue);
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
      {quantity < 1 && 
        <Typography 
          variant="body1" 
          component="div"
          align="left"
          color="error"
        >
          Minimum quantity is 1!
        </Typography>
      }
    </Stack>
  )
}

export default QuantitySection;