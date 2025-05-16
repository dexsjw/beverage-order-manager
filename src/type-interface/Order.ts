import { Beverage, Customisations } from "./Beverage";
import { TableData } from "./props/SortableTableProps";
import { SessionUser } from "./SessionUser";

export type Order = {
  id: string,
  sessionUser: SessionUser,
  beverage: Beverage,
  customisations: Customisations,
  quantity: number
}

export interface OrderTableData extends TableData {
  id: Order["id"],
  sessionUser: SessionUser["name"],
  takeAway: Customisations["isTakeAway"],
  beverage: Beverage["name"],
  customisations: string,
  quantity: Order["quantity"],
  price: Beverage["price"]
}