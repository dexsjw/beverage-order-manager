import { SessionUser } from "./SessionUser";

export interface Transaction {
  id: string,
  timestamp: string,
  payer: SessionUser,
  payee: SessionUser,
  amount: number,
  isPaid: boolean,
  paidTimestamp: string
}