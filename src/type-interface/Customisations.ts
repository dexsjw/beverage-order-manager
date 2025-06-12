export type Customisations = {
  isTakeAway: boolean,
  thicknessLevel: string,
  sweetnessLevel: string,
  others: string | null
}

export type CustomisationsOption = {
  id: keyof Customisations,
  label: string,
  name?: string,
  placeholder?: string,
  // if dropdown for options is required, any of the "*Options" field below need to be provided
  stringOptions?: string[],
  numberOptions?: number[],
  booleanOptions?: boolean[]
}