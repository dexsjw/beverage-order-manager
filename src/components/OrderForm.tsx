import { Autocomplete, Stack, TextField } from "@mui/material";
import { OnePlusKopiMenu } from "../static-data/OnePlusKopi";

function OrderForm() {

  return (
    <Stack spacing={3}>
      <Autocomplete 
        options={OnePlusKopiMenu} 
        renderInput={() => (
          <TextField 
            required
            id="beverage-order" 
            label="Beverage Order" 
          />
        )}
      />
      <Autocomplete 
        options={OnePlusKopiMenu} 
        renderInput={() => (
          <TextField 
            required
            id="customisations" 
            label="Customisations" 
          />
        )}
      />
      <Autocomplete 
        options={OnePlusKopiMenu} 
        renderInput={() => (
          <TextField 
            required
            id="quantity" 
            label="Quantity" 
          />
        )}
      />
    </Stack>
  )
}

export default OrderForm;