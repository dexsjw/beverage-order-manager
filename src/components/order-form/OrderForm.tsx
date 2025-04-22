import { Stack } from "@mui/material";
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