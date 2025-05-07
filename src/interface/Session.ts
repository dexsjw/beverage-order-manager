import { Order } from "./Order"
import { SessionUser } from "./SessionUser"
import { Transaction } from "./Transaction"

export interface Session {
  id: string,
  name: string,
  password: string,
  owner: SessionUser,
  timestamp: string,
  isActive: boolean,
  data: SessionData | string
}

export interface SessionData {
  orders: Order[],
  transactions: Transaction[]
}