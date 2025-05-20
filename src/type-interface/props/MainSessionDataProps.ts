import { Order } from "../Order"

export type MainSessionDataProps = {
  selectedBrandIndex: number
  orders: Order[],
  sessionTimestamp: string,
}