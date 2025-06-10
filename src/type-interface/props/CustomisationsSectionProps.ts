import { Customisations, CustomisationsOption } from "../Customisations";

export type CustomisationsSectionProps = {
  customisationsOptions: CustomisationsOption[],
  handleCustomisationsChange: (customisations: Customisations) => void;
}