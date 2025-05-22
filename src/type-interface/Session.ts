import { Order } from "./Order"
import { SessionUser } from "./SessionUser"
import { Transaction } from "./Transaction"

export type Session = {
  id: string,
  name: string,
  password: string,
  owner: SessionUser,
  timestamp: string,
  isActive: boolean,
  data: SessionData
}

export type SessionData = {
  orders: Order[],
  transactions: Transaction[]
}

export type SessionTableData = 
Pick<Session, "id" | "name"> 
& {
  owner: SessionUser["name"],
  isActive: "Active" | "Closed"
}