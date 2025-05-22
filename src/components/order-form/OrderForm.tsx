import { Stack } from "@mui/material";
import { AvailableBrands, AvailableBrandsData } from "../../static-data/AvailableBrandsData";
import { Beverage } from "../../type-interface/Beverage";
import { CustomisationsOption } from "../../type-interface/Customisations";
import { OrderFormProps } from "../../type-interface/props/OrderFormProps";
import BeverageOrderSection from "./BeverageOrderSection";
import CustomisationsSection from "./CustomisationsSection";
import QuantitySection from "./QuantitySection";

function OrderForm({ selectedBrandIndex }: Readonly<OrderFormProps>) {
  const brandBeverageMenu: Beverage[] = AvailableBrandsData[AvailableBrands[selectedBrandIndex]].menu;
  const brandCustomisationsOptions: CustomisationsOption[] = AvailableBrandsData[AvailableBrands[selectedBrandIndex]].customisationsOptions;

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