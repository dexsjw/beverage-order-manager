import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { Key, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";
import { Order, OrderTableData } from "../type-interface/Order";
import { MainSessionDataProps } from "../type-interface/props/MainSessionDataProps";
import { TableHeader } from "../type-interface/props/SortableTableProps";
import OrderForm from "./order-form/OrderForm";
import SortableTable from "./SortableTable";

function MainSessionData({ selectedBrandIndex }: Readonly<MainSessionDataProps>) {
  const { sessions } = useSessionContext();
  const { sessionId } = useParams();
  const navigate = useNavigate();

  let orders: Order[] = [];
  let sessionTimestamp: string = "";
  const selectedSession = sessions.find(session => session.id === sessionId);

  if (selectedSession === undefined) {
    console.error(`Unable to find Session with id: ${sessionId}`);
    navigate("/");
  } else {
    orders = selectedSession.data.orders;
    sessionTimestamp = selectedSession.timestamp;
  }

  const [selectedOrderId, setSelectedOrderId] = useState("");

  const orderTableData: OrderTableData[] = orders.map(order => ({
    id: order.id,
    sessionUser: order.sessionUser.name,
    takeAway: order.customisations.isTakeAway ? "Yes" : "No",
    beverage: order.beverage.name,
    customisations: `${order.customisations.thicknessLevel}, ${order.customisations.sweetnessLevel}, ${order.customisations.others}`,
    quantity: order.quantity,
    price: order.beverage.price * order.quantity
  }))

  const orderTableHeaders: TableHeader<OrderTableData>[] = [
    { id: "sessionUser", name: "Name" },
    { id: "takeAway", name: "Take Away?" },
    { id: "beverage", name: "Beverage" },
    { id: "customisations", name: "Customisations" },
    { id: "quantity", name: "Quantity" },
    { id: "price", name: "Price" }
  ];

  const handleOrderSelect = (orderId: Key) => {

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
            Order Form
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OrderForm 
            selectedBrandIndex={selectedBrandIndex}
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
            tableTitle={"Date: " + sessionTimestamp} 
            tableHeaders={orderTableHeaders}
            tableData={orderTableData}
            selectedRowId={selectedOrderId}
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
            tableTitle={"Date: " + sessionTimestamp} 
            tableHeaders={orderTableHeaders}
            tableData={orderTableData}
            selectedRowId={selectedOrderId}
            handleRowSelect={handleOrderSelect}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default MainSessionData;