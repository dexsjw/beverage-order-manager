export type Customisations = {
  isTakeAway: boolean,
  thicknessLevel: string,
  sweetnessLevel: string,
  others: string
}

export type CustomisationsOption = 
{
  key: keyof Customisations
  label: string,
  name?: string,
  placeholder?: string,
} & (
  {
    type: "boolean",
    options: boolean[]
  } |
  {
    type: "string",
    options: string[]
  } |
  {
    type: "number",
    options: number[]
  }
)

export type CustomisationsKeysOfType<T> = {
  [K in keyof Customisations]: Customisations[K] extends T ? K : never
}[keyof Customisations];

// export type CustomisationsOption = {
//   id: keyof Customisations,
//   label: string,
//   name?: string,
//   placeholder?: string,
//   // if dropdown for options is required, any of the "*Options" field below need to be provided
//   stringOptions?: string[],
//   numberOptions?: number[],
//   booleanOptions?: boolean[]
// }