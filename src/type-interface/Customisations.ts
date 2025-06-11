export interface Customisations extends CommonCustomisations {
  [key: string]: string | string[] | boolean | boolean[] | number | number[] | undefined | null
}

export type CommonCustomisations = {
  isTakeAway?: boolean,
  thicknessLevel?: string,
  sweetnessLevel?: string,
  others?: string
}

export type CustomisationsOption = {
  id: keyof Customisations & string,
  label: string,
  name?: string,
  placeholder?: string,
  // if dropdown for options is required, any of the "*Options" field below need to be provided
  stringOptions?: string[],
  numberOptions?: number[],
  booleanOptions?: boolean[]
}