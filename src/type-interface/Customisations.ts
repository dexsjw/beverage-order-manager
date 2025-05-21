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
  name: string,
  placeholder: string,
  defaultValue?: string | number | boolean,
  stringOptions?: string[],
  numberOptions?: number[],
  booleanOptions?: boolean[]
}