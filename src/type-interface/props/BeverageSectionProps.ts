import { Beverage } from "../Beverage"

export type BeverageSectionProps = {
  beverageMenu: Beverage[],
  beverage: Beverage,
  handleBeverageChange: (beverage: Beverage) => void
}