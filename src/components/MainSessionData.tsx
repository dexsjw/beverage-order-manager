import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { OrderTableData } from "../type-interface/Order";
import { MainSessionDataProps } from "../type-interface/props/MainSessionDataProps";
import { TableHeader } from "../type-interface/props/SortableTableProps";
import OrderForm from "./order-form/OrderForm";
import SortableTable from "./SortableTable";

function MainSessionData({ selectedBrandIndex, orders, timestamp }: Readonly<MainSessionDataProps>) {
  const orderTableData: OrderTableData[] = orders.map(order => ({
    id: order.id,
    sessionUser: order.sessionUser.name,
    takeAway: order.customisations.isTakeAway ? "Take Away" : "Dine In",
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

  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary>
          <Typography 
            variant="h6" 
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
            tableTitle={"Date: " + timestamp} 
            tableHeaders={orderTableHeaders}
            tableData={orderTableData}
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
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default MainSessionData;