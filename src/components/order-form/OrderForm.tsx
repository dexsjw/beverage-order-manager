import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { Brands, BrandsData } from "../../static-data/BrandsData";
import { Beverage } from "../../type-interface/Beverage";
import { Customisations, CustomisationsKeysOfType, CustomisationsOption } from "../../type-interface/Customisations";
import { Order } from "../../type-interface/Order";
import { OrderFormProps } from "../../type-interface/props/OrderFormProps";
import { FlexBoxColumnGap } from "../styled/FlexBox";
import BeverageOrderSection from "./BeverageSection";
import CustomisationsSection from "./CustomisationsSection";
import QuantitySection from "./QuantitySection";

const isCustomisationsKeyOfType = <T,>(
  customisations: Customisations,
  customisationsKey: keyof Customisations, 
  type: string
): customisationsKey is CustomisationsKeysOfType<T> => {
  return customisationsKey in customisations && typeof customisations[customisationsKey] === type;
}

function OrderForm({ 
  selectedBrandIndex,
  isEditMode,
  handleAddOrder,
  handleUpdateOrder,
  handleRemoveOrder
}: Readonly<OrderFormProps>) {

  const brand = Brands[selectedBrandIndex];
  const brandBeverageMenu: Beverage[] = BrandsData[brand].menu;
  const brandCustomisationsOptions: CustomisationsOption[] = BrandsData[brand].customisationsOptions;

  const initialBeverage = brandBeverageMenu[0];
  const initialCustomisations: Customisations = {
    isTakeAway: false,
    thicknessLevel: "",
    sweetnessLevel: "",
    others: ""
  };
  const initialQuantity = 1;

  brandCustomisationsOptions.forEach(customisationsOption => {
    let errMsg = "";
    switch (customisationsOption.type) {
      case "boolean": {
        if (isCustomisationsKeyOfType<boolean>(initialCustomisations, customisationsOption.key, customisationsOption.type)) {
          initialCustomisations[customisationsOption.key] = customisationsOption.options[0];
        } else {
          errMsg = `${customisationsOption.key} field has error. Check if customisations options provided correctly.`;
        }
        break;
      }
      
      case "string": {
        if (isCustomisationsKeyOfType<string>(initialCustomisations, customisationsOption.key, customisationsOption.type)) {
          initialCustomisations[customisationsOption.key] = customisationsOption.options[0];
        } else {
          errMsg = `${customisationsOption.key} field has error. Check if customisations options provided correctly.`;
        }
        break;
      }
        
      default: {
        errMsg = "There are errors in customisations options provided. Check if 'id', 'type' or 'options' fields are provided correctly.";
        break;
      }
    }
    if (errMsg) {
      console.error(errMsg);
    }
  });

  const initialOrder: Order = {
    id: crypto.randomUUID(),
    brand,
    sessionUser: { id: crypto.randomUUID(), name: "" },
    beverage: initialBeverage,
    customisations: initialCustomisations,
    quantity: initialQuantity
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

  const handleResetOrderForm = () => {
    // TODO: to reset order form after order has been submitted
  }

  const handleEditOrderForm = () => {
    // TODO: to update the fields with the existing Order when selected
  }

  const handleAddOrderClick = () => {
    handleAddOrder(order);
  }

  const handleUpdateOrderClick = () => {
    handleUpdateOrder(order);
  }

  const handleRemoveOrderClick = () => {
    handleRemoveOrder(order.id);
  }

  return (
    <Stack spacing={3}>
      <BeverageOrderSection 
        beverage={order.beverage}
        beverageMenu={brandBeverageMenu}
        handleBeverageChange={handleBeverageChange}
      />
      <CustomisationsSection 
        customisations={order.customisations}
        customisationsOptions={brandCustomisationsOptions}
        handleCustomisationsChange={handleCustomisationsChange}
      />
      <QuantitySection 
        initialQuantity={initialQuantity}
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
            onClick={handleUpdateOrderClick}
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