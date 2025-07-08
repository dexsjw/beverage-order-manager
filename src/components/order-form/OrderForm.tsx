import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Brands, BrandsData } from "../../static-data/BrandsData";
import { Beverage } from "../../type-interface/Beverage";
import { Customisations, CustomisationsOption, isCustomisationsKeyOfType } from "../../type-interface/Customisations";
import { Order } from "../../type-interface/Order";
import { OrderFormProps } from "../../type-interface/props/OrderFormProps";
import { FlexBoxColumnGap } from "../styled/FlexBox";
import BeverageOrderSection from "./BeverageSection";
import CustomisationsSection from "./CustomisationsSection";
import QuantitySection from "./QuantitySection";
import { useSessionUserContext } from "../../context/SessionUserContext";
import { mockGetOrder } from "../../api-service/mock-service";

function OrderForm({ 
  selectedBrandIndex,
  editMode,
  exitEditMode,
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
    sessionUser: sessionUser,
    beverage: initialBeverage,
    customisations: initialCustomisations,
    quantity: initialQuantity
  }

  const [order, setOrder] = useState<Order>(initialOrder);

  useEffect(() => {
    if (editMode.isEdit && editMode.selectedOrderId) {
      enterEditMode();
    }
  }, [editMode]);

  const enterEditMode = async () => {
    const orderToEdit = await mockGetOrder(editMode.selectedOrderId);
    if (orderToEdit) {
      console.log(orderToEdit);
      setOrder(orderToEdit);
    } else {
      console.error(`Unable to find Order with id: ${editMode.selectedOrderId}`);
      exitEditMode();
    }
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
        quantity={order.quantity}
        handleQuantityChange={handleQuantityChange}
      />
      {!editMode.isEdit &&
        <Button
          variant="contained"
          color="success"
          onClick={handleAddOrderClick}
        >
          Add Order
        </Button>
      }
      {editMode.isEdit &&
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