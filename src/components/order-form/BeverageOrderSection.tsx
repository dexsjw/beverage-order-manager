import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { Beverage } from "../../type-interface/Beverage";
import { BeverageOrderSectionProps } from "../../type-interface/props/BeverageOrderSectionProps";

function BeverageOrderSection({ beverageMenu }: Readonly<BeverageOrderSectionProps>) {
  return (
    <Stack spacing={1}>
      <Typography 
        variant="body1" 
        component="div"
        align="left" 
      >
        Beverage Order
      </Typography>
      <Autocomplete 
        id="beverage-order" 
        options={beverageMenu} 
        getOptionLabel={(option: Beverage) => option.name}
        renderInput={(params) => (
          <TextField 
            {...params}
            required
            variant="filled"
            placeholder="Kopi" 
          />
        )}
      />
    </Stack>
  )
}

export default BeverageOrderSection;