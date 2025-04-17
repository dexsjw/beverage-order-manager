import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { Beverage } from "../../interface/Beverage";
import { OnePlusKopiCustomisations, OnePlusKopiMenu } from "../../static-data/OnePlusKopi";
import BeverageOrderSection from "./BeverageOrderSection";
import CustomisationsSection from "./CustomisationsSection";
import QuantitySection from "./QuantitySection";

function OrderForm() {

  return (
    <Stack spacing={2}>
      <BeverageOrderSection />
      <CustomisationsSection />
      <QuantitySection />
    </Stack>
  )
}

export default OrderForm;