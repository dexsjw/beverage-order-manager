import { Beverage, Customisations } from "./Beverage";
import { SessionUser } from "./SessionUser";

export interface Order {
  id: string,
  sessionUser: SessionUser,
  beverage: Beverage,
  customisations: Customisations,
  quantity: number
}