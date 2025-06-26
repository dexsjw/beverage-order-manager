import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { Brands, BrandsData } from "../../static-data/BrandsData";
import { Beverage } from "../../type-interface/Beverage";
import { Customisations, CustomisationsOption } from "../../type-interface/Customisations";
import { Order } from "../../type-interface/Order";
import { OrderFormProps } from "../../type-interface/props/OrderFormProps";
import { FlexBoxColumnGap } from "../styled/FlexBox";
import BeverageOrderSection from "./BeverageSection";
import CustomisationsSection from "./CustomisationsSection";
import QuantitySection from "./QuantitySection";

const initialCustomisations: Customisations = {
  isTakeAway: false,
  thicknessLevel: "",
  sweetnessLevel: "",
  others: ""
};
const initialQuantity = 1;

function OrderForm({ 
  selectedBrandIndex,
  isEditMode,
  handleExitEditMode,
  handleAddOrder, 
  handleRemoveOrder 
}: Readonly<OrderFormProps>) {

  const brand = Brands[selectedBrandIndex];
  const brandBeverageMenu: Beverage[] = BrandsData[brand].menu;
  const brandCustomisationsOptions: CustomisationsOption[] = BrandsData[brand].customisationsOptions;

  const initialBeverage = brandBeverageMenu[0];

  const initialOrder: Order = {
    id: crypto.randomUUID(),
    brand,
    sessionUser: { id: crypto.randomUUID(), name: "" },
    beverage: initialBeverage,
    customisations: { isTakeAway: false, thicknessLevel: "", sweetnessLevel: "", others: ""},
    quantity: 1
  }

  const [order, setOrder] = useState<Order>(initialOrder);

  const handleBeverageChange = (beverage: Beverage) => {
    const newOrder: Order = { ...order, beverage };
    console.log("New Order: ", newOrder);
    setOrder(newOrder);
  }

  const handleCustomisationsChange = (customisations: Customisations) => {
    const newOrder: Order = { ...order, customisations };
    console.log("New Order: ", newOrder);
    setOrder(newOrder);
  }
  
  const handleQuantityChange = (quantity: number) => {
    const newOrder: Order = { ...order, quantity };
    console.log("New Order: ", newOrder);
    setOrder(newOrder);
  }

  const handleAddOrderClick = () => {
    handleAddOrder(order);
  }

  const handleRemoveOrderClick = () => {
    handleRemoveOrder(order.id);
  }

  return (
    <Stack spacing={3}>
      <BeverageOrderSection 
        beverageMenu={brandBeverageMenu}
        initialBeverage={initialBeverage}
        handleBeverageChange={handleBeverageChange}
      />
      <CustomisationsSection 
        customisationsOptions={brandCustomisationsOptions}
        handleCustomisationsChange={handleCustomisationsChange}
      />
      <QuantitySection 
        handleQuantityChange={handleQuantityChange}
      />
      {!isEditMode &&
        <Button
          variant="contained"
          color="success"
          onClick={handleAddOrderClick}
        >
          Add Order
        </Button>
      }
      {isEditMode &&
        <FlexBoxColumnGap>
          <Button
            variant="contained"
            onClick={handleExitEditMode}
          >
            Done
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleRemoveOrderClick}
          >
            Remove Order
          </Button>
        </FlexBoxColumnGap>
      }
    </Stack>
  )
}

export default OrderForm;