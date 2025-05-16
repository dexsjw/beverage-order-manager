import { Order } from "./Order"
import { TableData } from "./props/SortableTableProps"
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

export interface SessionTableData extends TableData {
  id: Session["id"],
  name: Session["name"]
  owner: SessionUser["name"],
  isActive: "Active" | "Closed"
}