import { Beverage } from "../Beverage"

export type BeverageSectionProps = {
  beverageMenu: Beverage[],
  orderBeverage: Beverage,
  handleBeverageChange: (beverage: Beverage) => void
}