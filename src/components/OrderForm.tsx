import { Autocomplete, Stack, TextField } from "@mui/material";
import { OnePlusKopiMenu } from "../static-data/OnePlusKopi";
import { Beverage } from "../interface/Beverage";

function OrderForm() {

  return (
    <Stack spacing={3}>
      <Autocomplete 
        id="beverage-order" 
        options={OnePlusKopiMenu} 
        getOptionLabel={(option: Beverage) => option.name}
        renderInput={(params) => (
          <TextField 
            {...params}
            required
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