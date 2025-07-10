import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { Key, useState } from "react";
import { mockDeleteOrder, mockPostOrder, mockPutOrder } from "../api-service/mock-service";
import { Order, OrderTableData } from "../type-interface/Order";
import { MainSessionDataProps } from "../type-interface/props/MainSessionDataProps";
import { TableHeader } from "../type-interface/props/SortableTableProps";
import OrderForm from "./order-form/OrderForm";
import SortableTable from "./SortableTable";

function MainSessionData({
  selectedBrandIndex,
  timestamp,
  sessionOrders,
  mockUpdateSessionOrders
}: Readonly<MainSessionDataProps>) {

  const [orders, setOrders] = useState<Order[]>([]);
  const [orderToEdit, setOrderToEdit] = useState<Order | null>(null);

  if (sessionOrders.length !== orders.length) {
    setOrders(sessionOrders); 
  }

  const orderTableData: OrderTableData[] = orders.map(order => ({
    id: order.id,
    sessionUser: order.sessionUser.name,
    takeAway: order.customisations.isTakeAway ? "Yes" : "No",
    beverage: order.beverage.name,
    customisations: `${order.customisations.thicknessLevel}, ${order.customisations.sweetnessLevel}, ${order.customisations.others}`,
    quantity: order.quantity,
    price: order.beverage.price * order.quantity
  }));

  const orderTableHeaders: TableHeader<OrderTableData>[] = [
    { id: "sessionUser", name: "Name" },
    { id: "takeAway", name: "Take Away?" },
    { id: "beverage", name: "Beverage" },
    { id: "customisations", name: "Customisations" },
    { id: "quantity", name: "Quantity" },
    { id: "price", name: "Price" }
  ];

  // When post/put/delete Order, Session should be updated as well
  // Hence, mockUpdateSessionOrders() should not be needed
  const handleAddOrder = async (order: Order) => {
    const updatedOrders = [...orders, order];
    const orderResponse = await mockPostOrder(order);
    if (orderResponse) {
      setOrders(updatedOrders);
      mockUpdateSessionOrders(updatedOrders); // #mock
    } else {
      console.error("Failed to add Order for ID: " + order.id);
    }
  }

  const handleUpdateOrder = async (order: Order) => {
    const updatedOrders = orders.map(currentOrder => {
      return currentOrder.id === order.id ? order : currentOrder;
    });
    const orderResponse = await mockPutOrder(order.id, order);
    if (orderResponse) {
      setOrders(updatedOrders);
      mockUpdateSessionOrders(updatedOrders); // #mock
      setOrderToEdit(null);
    } else {
      console.error("Failed to update Order for ID: " + order.id);
    }
  }

  const handleRemoveOrder = async (orderId: string) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    const orderResponse = await mockDeleteOrder(orderId);
    if (orderResponse) {
      setOrders(updatedOrders);
      mockUpdateSessionOrders(updatedOrders); // #mock
      setOrderToEdit(null);
    } else {
      console.error("Failed to remove Order for ID: " + orderId);
    }
  }

  const handleOrderSelect = (orderId: Key) => {
    const order = orders.find(order => order.id === orderId);
    if (order !== undefined) {
      setOrderToEdit(order);
    }
  }

  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary>
          <Typography 
            variant="h5" 
            component="div" 
            color="primary"
          >
            {`Order Form (${timestamp})`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OrderForm
            key={orderToEdit?.id}
            selectedBrandIndex={selectedBrandIndex}
            orderToEdit={orderToEdit}
            handleAddOrder={handleAddOrder}
            handleUpdateOrder={handleUpdateOrder}
            handleRemoveOrder={handleRemoveOrder}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary>
          <Typography
            variant="h6" 
            component="div" 
            color="primary"
          >
            All Orders
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SortableTable<OrderTableData>
            tableTitle={"Date: " + timestamp} 
            tableHeaders={orderTableHeaders}
            tableData={orderTableData}
            selectedRowId={orderToEdit ? orderToEdit.id : ""}
            handleRowSelect={handleOrderSelect}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography 
            variant="h6" 
            component="div" 
            color="primary"
          >
            Transactions
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SortableTable<OrderTableData>
            tableTitle={"Date: " + timestamp} 
            tableHeaders={orderTableHeaders}
            tableData={orderTableData}
            selectedRowId={orderToEdit ? orderToEdit.id : ""}
            handleRowSelect={handleOrderSelect}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default MainSessionData;