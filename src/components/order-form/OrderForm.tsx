import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { useSessionUserContext } from "../../context/SessionUserContext";
import { Brands, BrandsData } from "../../static-data/BrandsData";
import { Beverage } from "../../type-interface/Beverage";
import { Customisations, CustomisationsOption, isCustomisationsKeyOfType } from "../../type-interface/Customisations";
import { Order } from "../../type-interface/Order";
import { OrderFormProps } from "../../type-interface/props/OrderFormProps";
import { FlexBoxColumnGap } from "../styled/FlexBox";
import BeverageOrderSection from "./BeverageSection";
import CustomisationsSection from "./CustomisationsSection";
import QuantitySection from "./QuantitySection";

function OrderForm({ 
  selectedBrandIndex,
  orderToEdit,
  handleAddOrder,
  handleUpdateOrder,
  handleRemoveOrder
}: Readonly<OrderFormProps>) {

  const { sessionUser } = useSessionUserContext();

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
    const invalidCustomisationsOptionsErrMsg = `${customisationsOption.key} field has error. Check if customisations options provided correctly.`;
    switch (customisationsOption.type) {
      case "boolean": {
        if (isCustomisationsKeyOfType<boolean>(initialCustomisations, customisationsOption.key, customisationsOption.type)) {
          initialCustomisations[customisationsOption.key] = customisationsOption.options[0];
        } else {
          errMsg = invalidCustomisationsOptionsErrMsg;
        }
        break;
      }
      
      case "string": {
        if (isCustomisationsKeyOfType<string>(initialCustomisations, customisationsOption.key, customisationsOption.type)) {
          initialCustomisations[customisationsOption.key] = customisationsOption.options[0];
        } else {
          errMsg = invalidCustomisationsOptionsErrMsg;
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
    sessionUser: sessionUser,
    beverage: initialBeverage,
    customisations: initialCustomisations,
    quantity: initialQuantity
  }

  const [order, setOrder] = useState<Order>(initialOrder);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  if (orderToEdit && !isEditMode) {
    setOrder(orderToEdit);
    setIsEditMode(true);
  }

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
    setOrder(initialOrder);
  }

  const handleUpdateOrderClick = () => {
    handleUpdateOrder(order);
    setOrder(initialOrder);
    setIsEditMode(false);
  }

  const handleRemoveOrderClick = () => {
    handleRemoveOrder(order.id);
    setOrder(initialOrder);
    setIsEditMode(false);
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
        quantity={order.quantity}
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