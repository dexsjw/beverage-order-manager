import { Beverage, Customisations } from "./Beverage";

export interface Order {
    beverage: Beverage,
    customisations: Customisations,
    quantity: number
}