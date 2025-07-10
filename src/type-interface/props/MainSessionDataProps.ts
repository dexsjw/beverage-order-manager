import { Order } from "../Order"

export type MainSessionDataProps = {
  selectedBrandIndex: number,
  sessionTimestamp: string,
  sessionOrders: Order[],
  mockUpdateSessionOrders: (updatedOrders: Order[]) => Promise<void>
}