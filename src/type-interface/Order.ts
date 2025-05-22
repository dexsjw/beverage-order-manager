import { Beverage } from "./Beverage";
import { Customisations } from "./Customisations";
import { SessionUser } from "./SessionUser";

export type Order = {
  id: string,
  brand: string,
  sessionUser: SessionUser,
  beverage: Beverage,
  customisations: Customisations,
  quantity: number
}

export type OrderTableData = 
Pick<Order, "id" | "quantity">
& {
  sessionUser: SessionUser["name"],
  takeAway: "Take Away" | "Dine In",
  beverage: Beverage["name"],
  customisations: string,
  price: Beverage["price"]
}