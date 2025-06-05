import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { Beverage } from "../../type-interface/Beverage";
import { BeverageSectionProps } from "../../type-interface/props/BeverageSectionProps";
import { useState } from "react";

const emptyBeverage: Beverage = {
  id: 0,
  category: "",
  name: "",
  price: 0
}

function BeverageSection({
   beverageMenu, 
   orderBeverage,
   handleBeverageChange 
}: Readonly<BeverageSectionProps>) {

  // const [beverageInputValue, setBeverageInputValue] = useState(orderBeverage.name);
  const [isBeverageNull, setIsBeverageNull] = useState(false);

  const handleBeverageValueChange = (beverage: Beverage | null) => {
    console.log(beverage);
    if (beverage !== null) {
      handleBeverageChange(beverage);
      setIsBeverageNull(false);
    } else {
      handleBeverageChange(emptyBeverage);
      setIsBeverageNull(true);
    }
  }

  const handleBeverageInputValueChange = (beverageName: string) => {
    console.log(beverageName);
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
        value={orderBeverage}
        onChange={(event, value) => handleBeverageValueChange(value)}
        // inputValue={orderBeverage.name}
        // onInputChange={(event, value) => handleBeverageInputValueChange(value)}
        renderInput={(params) => (
          <TextField 
            {...params}
            required
            variant="filled"
            placeholder="Kopi" 
            label="Beverage" 
          />
        )}
      />
      {isBeverageNull && 
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