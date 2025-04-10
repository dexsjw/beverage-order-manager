export interface BeverageOrder {
  beverage: Beverage,
  customisations: Customisations,
  quantity: number
}

export interface Beverage {
  category: Category,
  name: string,
  price: number
}

export const enum Category {
  TraditionalCoffee = "Traditional Coffee",
  IceBlended = "Ice Blended",
  HotFlowerTea = "Hot Flower Tea",
  SpecialtyIcedDrinks = "Specialty Iced Drinks"
}

export interface Customisations {
  [key: string]: string
}

export interface FixedCustomisations {
  // sweetness, thickness, takeaway, custom
}