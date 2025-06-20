import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { AvailableBrands, AvailableBrandsData } from "../../static-data/AvailableBrandsData";
import { Beverage } from "../../type-interface/Beverage";
import { Customisations, CustomisationsOption } from "../../type-interface/Customisations";
import { Order } from "../../type-interface/Order";
import { OrderFormProps } from "../../type-interface/props/OrderFormProps";
import { FlexBoxColumnGap } from "../styled/FlexBox";
import BeverageOrderSection from "./BeverageSection";
import CustomisationsSection from "./CustomisationsSection";
import QuantitySection from "./QuantitySection";

function OrderForm({ 
  selectedBrandIndex,
  isEditMode,
  handleExitEditMode,
  handleAddOrder, 
  handleRemoveOrder 
}: Readonly<OrderFormProps>) {

  const brand = AvailableBrands[selectedBrandIndex];
  const brandBeverageMenu: Beverage[] = AvailableBrandsData[AvailableBrands[selectedBrandIndex]].menu;
  const brandCustomisationsOptions: CustomisationsOption[] = AvailableBrandsData[AvailableBrands[selectedBrandIndex]].customisationsOptions;

  const newOrder: Order = {
    id: crypto.randomUUID(),
    brand,
    sessionUser: { id: crypto.randomUUID(), name: "" },
    beverage: brandBeverageMenu[0],
    customisations: { isTakeAway: false, thicknessLevel: "", sweetnessLevel: "", others: ""},
    quantity: 1
  }

  const [order, setOrder] = useState<Order>(newOrder);

  const handleBeverageChange = (beverage: Beverage) => {
    setOrder(prevOrder => {
      const newOrder = structuredClone(prevOrder);
      newOrder.beverage = beverage;
      return newOrder;
    })
  }

  const handleCustomisationsChange = (customisations: Customisations) => {
    setOrder(prevOrder => {
      const newOrder = structuredClone(prevOrder);
      newOrder.customisations = customisations;
      console.log("Order: ", newOrder)
      return newOrder;
    })
  }

  const handleQuantityChange = (quantity: number) => {
    setOrder(prevOrder => {
      const newOrder = structuredClone(prevOrder);
      newOrder.quantity = quantity;
      return newOrder;
    })
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
        orderBeverage={order.beverage}
        handleBeverageChange={handleBeverageChange}
      />
      <CustomisationsSection 
        customisationsOptions={brandCustomisationsOptions}
        handleCustomisationsChange={handleCustomisationsChange}
      />
      <QuantitySection />
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