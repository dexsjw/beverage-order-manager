import { Stack } from "@mui/material";
import { AvailableBrands, AvailableBrandsMenu } from "../../static-data/AvailableBrandsMenu";
import { Beverage } from "../../type-interface/Beverage";
import { OrderFormProps } from "../../type-interface/props/OrderFormProps";
import BeverageOrderSection from "./BeverageOrderSection";
import CustomisationsSection from "./CustomisationsSection";
import QuantitySection from "./QuantitySection";

function OrderForm({ selectedBrandIndex }: Readonly<OrderFormProps>) {
  const brandBeverageMenu: Beverage[] = AvailableBrandsMenu[AvailableBrands[selectedBrandIndex]];

  return (
    <Stack spacing={2}>
      <BeverageOrderSection 
        beverageMenu={brandBeverageMenu}
      />
      <CustomisationsSection />
      <QuantitySection />
    </Stack>
  )
}

export default OrderForm;