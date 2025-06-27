import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { Key, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";
import { Order, OrderTableData } from "../type-interface/Order";
import { MainSessionDataProps } from "../type-interface/props/MainSessionDataProps";
import { TableHeader } from "../type-interface/props/SortableTableProps";
import OrderForm from "./order-form/OrderForm";
import SortableTable from "./SortableTable";
import { Session } from "../type-interface/Session";
import JoinSessionDialog from "./JoinSessionDialog";
import { Brands } from "../static-data/BrandsData";

function MainSessionData({ selectedBrandIndex }: Readonly<MainSessionDataProps>) {
  const { sessions } = useSessionContext();
  const { sessionId } = useParams();
  const navigate = useNavigate();

  let orders: Order[] = [];
  let sessionTimestamp: string = "";
  // let credentials: Pick<Session, "id" | "name" | "password"> = {
  //   id: "",
  //   name: "",
  //   password: ""
  // }

  // This will be a post call to backend to retrieve the selected session
  const selectedSession = sessions.find(session => session.id === sessionId);
  if (selectedSession === undefined) {
    console.error(`Unable to find Session with id: ${sessionId}`);
    navigate("/");
  } else {
    orders = selectedSession.data.orders;
    sessionTimestamp = selectedSession.timestamp;
    // credentials = {
    //   id: selectedSession.id,
    //   name: selectedSession.name,
    //   password: selectedSession.password
    // };
  }

  // const [sessionCredentials, setSessionCredentials] = useState(credentials);
  // const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [sessionOrders, setSessionOrders] = useState(orders);
  const [isOrderEditMode, setIsOrderEditMode] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const orderTableData: OrderTableData[] = sessionOrders.map(order => ({
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

  // const handleDialogClose = () => {
  //   setSessionCredentials(credentials);
  //   setIsDialogOpen(false);
  // }

  const handleExitOrderEditMode = () => {
    setSelectedOrderId("");
    setIsOrderEditMode(false);
  }

  const handleAddOrder = (order: Order) => {
    setSessionOrders(prevOrders => [...prevOrders, order]);
  }

  const handleUpdateOrder = (order: Order) => {
    setSessionOrders(prevOrders => prevOrders.map(currentOrder => {
      return currentOrder.id === order.id ? order : currentOrder;
    }));
    handleExitOrderEditMode();
  }

  const handleRemoveOrder = (orderId: string) => {
    setSessionOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    handleExitOrderEditMode();
  }

  const handleOrderSelect = (orderId: Key) => {
    const order = sessionOrders.find(order => order.id === orderId);
    if (order !== undefined) {
      setSelectedOrderId(order.id);
      setIsOrderEditMode(true);
    }
  }

  return (
    <Box>
      {/* <JoinSessionDialog 
        sessionCredentials={}
        isDialogOpen={}
        handleDialogClose={}
      /> */}
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
            key={Brands[selectedBrandIndex]}
            selectedBrandIndex={selectedBrandIndex}
            isEditMode={isOrderEditMode}
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