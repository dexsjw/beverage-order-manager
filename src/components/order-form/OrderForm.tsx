import { Stack } from "@mui/material";
import { AvailableBrands, AvailableBrandsCustomisations, AvailableBrandsMenu } from "../../static-data/AvailableBrandsData";
import { Beverage } from "../../type-interface/Beverage";
import { CustomisationsOption } from "../../type-interface/Customisations";
import { OrderFormProps } from "../../type-interface/props/OrderFormProps";
import BeverageOrderSection from "./BeverageOrderSection";
import CustomisationsSection from "./CustomisationsSection";
import QuantitySection from "./QuantitySection";

function OrderForm({ selectedBrandIndex }: Readonly<OrderFormProps>) {
  const brandBeverageMenu: Beverage[] = AvailableBrandsMenu[AvailableBrands[selectedBrandIndex]];
  const brandCustomisationsOptions: CustomisationsOption[] = AvailableBrandsCustomisations[AvailableBrands[selectedBrandIndex]];

  return (
    <Stack spacing={2}>
      <BeverageOrderSection 
        beverageMenu={brandBeverageMenu}
      />
      <CustomisationsSection 
        customisationsOptions={brandCustomisationsOptions}
      />
      <QuantitySection />
    </Stack>
  )
}

export default OrderForm;