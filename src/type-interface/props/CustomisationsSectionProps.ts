import { Customisations, CustomisationsOption } from "../Customisations";

export type CustomisationsSectionProps = {
  customisations: Customisations,
  customisationsOptions: CustomisationsOption[],
  handleCustomisationsChange: (customisations: Customisations) => void
}