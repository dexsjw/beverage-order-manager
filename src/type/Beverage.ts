export type Beverage = {
  id: number,
  category: string,
  name: string,
  price: number
}

export type Customisations = CommonCustomisations & {
  [key: string]: string | string[] | boolean | boolean[] | number | number[] | null
}

export type CommonCustomisations = {
  // sweetness, thickness, takeaway, custom
  isTakeAway: boolean[],
  thicknessLevel: string[],
  sweetnessLevel: string[],
  others: string | null
}