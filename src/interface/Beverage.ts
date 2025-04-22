export interface Beverage {
  id: number,
  category: string,
  name: string,
  price: number
}

export interface Customisations extends CommonCustomisations {
  [key: string]: string | string[] | boolean | boolean[] | number | number[] | null
}

export interface CommonCustomisations {
  // sweetness, thickness, takeaway, custom
  isTakeAway: boolean[],
  thicknessLevel: string[],
  sweetnessLevel: string[],
  others: string | null
}