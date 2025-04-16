import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import OrderForm from "./OrderForm";

function MainSessionOrder() {


  return (
    <Box>
      <Accordion>
        <AccordionSummary>
          <Typography variant="h6" component="div">Order Form</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OrderForm />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography variant="h6" component="div">All Orders</Typography>
        </AccordionSummary>
        <AccordionDetails>
          All orders
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography variant="h6" component="div">Transactions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Transactions
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default MainSessionOrder;