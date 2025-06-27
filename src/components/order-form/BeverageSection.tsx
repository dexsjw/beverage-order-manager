import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { Beverage } from "../../type-interface/Beverage";
import { BeverageSectionProps } from "../../type-interface/props/BeverageSectionProps";

function BeverageSection({
  beverage,
  beverageMenu,
  handleBeverageChange 
}: Readonly<BeverageSectionProps>) {

  const handleBeverageValueChange = (beverage: Beverage) => {
    handleBeverageChange(beverage);
  }

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
        disableClearable
        id="beverage-order"
        options={beverageMenu}
        getOptionLabel={(option: Beverage) => option.name}
        value={beverage}
        onChange={(event, newValue) => handleBeverageValueChange(newValue)}
        renderInput={(params) => (
          <TextField 
            {...params}
            required
            variant="filled"
            label="Beverage" 
            placeholder="Kopi" 
          />
        )}
      />
    </Stack>
  )
}

export default BeverageSection;