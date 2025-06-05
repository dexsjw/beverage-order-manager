import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { Beverage } from "../../type-interface/Beverage";
import { BeverageSectionProps } from "../../type-interface/props/BeverageSectionProps";

function BeverageSection({ beverageMenu, beverage }: Readonly<BeverageSectionProps>) {
  return (
    <Stack spacing={1}>
      <Typography 
        variant="h6" 
        component="div"
        align="left" 
      >
        Beverage Order
      </Typography>
      <Autocomplete 
        id="beverage-order" 
        options={beverageMenu} 
        getOptionLabel={(option: Beverage) => option.name}
        value={beverage}
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

export default BeverageSection;