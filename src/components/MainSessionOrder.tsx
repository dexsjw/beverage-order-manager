import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import OrderForm from "./order-form/OrderForm";
import SortableTable from "./SortableTable";

function MainSessionOrder() {


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
          <SortableTable />
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
          Transactions
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default MainSessionOrder;