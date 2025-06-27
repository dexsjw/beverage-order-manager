import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { Beverage } from "../../type-interface/Beverage";
import { BeverageSectionProps } from "../../type-interface/props/BeverageSectionProps";

const emptyBeverage: Beverage = {
  id: 0,
  category: "",
  name: "",
  price: 0
}

function BeverageSection({
   beverageMenu, 
   beverage,
   handleBeverageChange 
}: Readonly<BeverageSectionProps>) {

  const handleBeverageValueChange = (beverage: Beverage | null) => {
    // setBeverageValue(beverage);
    if (beverage === null) {
      handleBeverageChange(emptyBeverage);
    } else {
      handleBeverageChange(beverage);
    }
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
        id="beverage-order" 
        options={beverageMenu} 
        getOptionLabel={(option: Beverage) => option.name}
        value={beverage.id === 0 ? null : beverage}
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
      {beverage.id === 0 && 
        <Typography 
          variant="body1" 
          component="div"
          align="left"
          color="error"
        >
          A beverage has to be selected!
        </Typography>
      }
    </Stack>
  )
}

export default BeverageSection;