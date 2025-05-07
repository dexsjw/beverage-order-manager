import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import OrderForm from "./order-form/OrderForm";
import SortableTable from "./SortableTable";

function MainSessionOrder() {
  const tableHeaders = [
    { id: 1, name: "Name" },
    { id: 2, name: "Owner" },
    { id: 3, name: "Status" }
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
          <OrderForm />
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
          <SortableTable 
            tableTitle="Date: " 
            tableHeaders={tableHeaders}
            tableData={[]}
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
          <SortableTable 
            tableTitle="Date: " 
            tableHeaders={tableHeaders}
            tableData={[]}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default MainSessionOrder;