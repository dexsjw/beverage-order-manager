import { Order } from "./Order"
import { SessionUser } from "./SessionUser"
import { Transaction } from "./Transaction"

export interface Session {
  id: string,
  name: string,
  password: string,
  timestamp: string,
  isActive: boolean,
  owner: SessionUser,
  data: SessionData | string
}

export interface SessionData {
  orders: Order[],
  transactions: Transaction[]
}