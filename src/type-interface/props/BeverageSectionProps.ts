import { Beverage } from "../Beverage"

export type BeverageSectionProps = {
  beverageMenu: Beverage[],
  initialBeverage: Beverage,
  handleBeverageChange: (beverage: Beverage) => void
}