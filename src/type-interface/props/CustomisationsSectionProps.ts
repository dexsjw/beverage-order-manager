import { Customisations, CustomisationsOption } from "../Customisations";

export type CustomisationsSectionProps = {
  initialCustomisations: Customisations,
  customisationsOptions: CustomisationsOption[],
  handleCustomisationsChange: (customisations: Customisations) => void
}