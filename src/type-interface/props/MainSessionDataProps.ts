import { Order } from "../Order"

export type MainSessionDataProps = {
  selectedBrandIndex: number,
  sessionTimestamp: string,
  sessionOrders: Order[],
  orderToEdit: Order | null,
  setOrderToEdit: React.Dispatch<React.SetStateAction<Order | null>>,
  mockUpdateSessionOrders: (updatedOrders: Order[]) => Promise<void>,
  handleTabChange: (tabIndex: number, orderToEdit?: Order) => void
}