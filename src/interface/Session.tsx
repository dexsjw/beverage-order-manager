import { Order } from "./Order"
import { SessionUser } from "./SessionUser"
import { Transaction } from "./Transaction"

export interface Session {
  id: string,
  timestamp: string,
  isActive: boolean,
  data: string
}

export interface SessionData {
  sessionUsers: SessionUser[],
  orders: Order[],
  transactions: Transaction[]
}