import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { Key, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockDeleteOrder, mockGetSession, mockPostOrder, mockPutOrder, mockPutSession } from "../api-service/mock-service";
import { useSessionUserContext } from "../context/SessionUserContext";
import { Brands } from "../static-data/BrandsData";
import { Order, OrderTableData } from "../type-interface/Order";
import { MainSessionDataProps } from "../type-interface/props/MainSessionDataProps";
import { TableHeader } from "../type-interface/props/SortableTableProps";
import { Session } from "../type-interface/Session";
import OrderForm from "./order-form/OrderForm";
import SortableTable from "./SortableTable";

function MainSessionData({ selectedBrandIndex }: Readonly<MainSessionDataProps>) {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [sessionTimestamp, setSessionTimestamp] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderEditMode, setOrderEditMode] = useState<{isEdit: boolean, selectedOrderId: string}>({
    isEdit: false,
    selectedOrderId: ""
  })

  // Start #mock
  // Session state is for mocking purpose only
  const { sessionUser } = useSessionUserContext();
  const newSession: Session = {
    id: sessionId ?? "testId",
    name: "",
    password: "",
    owner: sessionUser,
    timestamp: new Date(Date.now()).toLocaleDateString("en-GB"),
    isActive: true,
    data: {
      orders: [],
      transactions: []
    }
  }
  const [session, setSession] = useState(newSession);
  // End #mock

  useEffect(() => {
    retrieveSessionData();
  }, [])

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

  // This should be retrieve Orders by sessionId from backend 
  // instead of retrieving the whole session for Orders
  const retrieveSessionData = async () => {
    if (sessionId) {
      const session = await mockGetSession(sessionId);
      if (session) {
        setSessionTimestamp(session.timestamp);
        setOrders(session.data.orders);
        setSession(session); // #mock
      } else {
        console.error(`Unable to find Session with id: ${sessionId}`);
        navigate("/");
      }
    } else {
      console.error(`Session ID is undefined: ${sessionId}`);
      navigate("/");
    }
  }

  const handleExitOrderEditMode = () => {
    setOrderEditMode({
      isEdit: false,
      selectedOrderId: ""
    })
  }

  // Start #mock
  // TODO: mock session updates
  const mockUpdateSessionOrders = (updatedOrders: Order[]) => {
    const updatedSession: Session = {
      ...session,
      data: {
        ...session.data,
        orders: updatedOrders
      }
    };
    setSession(updatedSession);
    mockPutSession(sessionId ?? "testId", updatedSession);
  }
  // End #mock

  const handleAddOrder = (order: Order) => {
    const updatedOrders = [...orders, order];
    setOrders(updatedOrders);
    mockPostOrder(order);
    mockUpdateSessionOrders(updatedOrders); // #mock
  }

  const handleUpdateOrder = (order: Order) => {
    const updatedOrders = orders.map(currentOrder => {
      return currentOrder.id === order.id ? order : currentOrder;
    });
    setOrders(updatedOrders);
    mockPutOrder(order.id, order);
    mockUpdateSessionOrders(updatedOrders); // #mock
    handleExitOrderEditMode();
  }

  const handleRemoveOrder = (orderId: string) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    mockDeleteOrder(orderId);
    mockUpdateSessionOrders(updatedOrders);
    handleExitOrderEditMode();
  }

  const handleOrderSelect = (orderId: Key) => {
    const order = orders.find(order => order.id === orderId);
    if (order !== undefined) {
      setOrderEditMode({
        isEdit: true,
        selectedOrderId: order.id
      });
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
            editMode={orderEditMode}
            exitEditMode={handleExitOrderEditMode}
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
            selectedRowId={orderEditMode.selectedOrderId}
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
            selectedRowId={orderEditMode.selectedOrderId}
            handleRowSelect={handleOrderSelect}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default MainSessionData;