import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { Beverage } from "../../type/Beverage";
import { OnePlusKopiMenu } from "../../static-data/OnePlusKopi";

function BeverageOrderSection() {
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
        options={OnePlusKopiMenu} 
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