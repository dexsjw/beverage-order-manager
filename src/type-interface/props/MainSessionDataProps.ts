import { Order } from "../Order"

export type MainSessionDataProps = {
  selectedBrandIndex: number,
  timestamp: string,
  sessionOrders: Order[],
  mockUpdateSessionOrders: (updatedOrders: Order[]) => void
}