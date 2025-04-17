import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { Beverage } from "../../interface/Beverage";
import { OnePlusKopiCustomisations, OnePlusKopiMenu } from "../../static-data/OnePlusKopi";
import BeverageOrderSection from "./BeverageOrderSection";
import CustomisationsSection from "./CustomisationsSection";

function OrderForm() {

  return (
    <Stack spacing={2}>
      <BeverageOrderSection />
      <CustomisationsSection />
      <Autocomplete 
        options={OnePlusKopiMenu} 
        renderInput={(params) => (
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