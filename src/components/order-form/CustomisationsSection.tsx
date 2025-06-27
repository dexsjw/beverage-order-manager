import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { Customisations, isCustomisationsKeyOfType } from "../../type-interface/Customisations";
import { CustomisationsSectionProps } from "../../type-interface/props/CustomisationsSectionProps";

const CUSTOMISATIONS_OTHERS_FIELD = "others";

function CustomisationsSection({
  customisations,
  customisationsOptions,
  handleCustomisationsChange
}: Readonly<CustomisationsSectionProps>) {

  const handleCustomisationsValueChange = (
    customisationKey: keyof Customisations,
    customisationValue: boolean | string | number
  ) => {
    const newCustomisations: Customisations = {
      ...customisations,
      [customisationKey]: customisationValue
    }
    handleCustomisationsChange(newCustomisations);
  }

  return (
    <Stack spacing={1}>
      <Typography 
        variant="h6" 
        component="div"
        align="left" 
      >
        Customisations
      </Typography>
      {customisationsOptions.map(customisationsOption => (
        <Stack 
          key={customisationsOption.key}
          spacing={1}
        >
          {customisationsOption.name && 
            <Typography 
              variant="body2" 
              component="div"
              align="left" 
            >
              {customisationsOption.name}*:
            </Typography>
          }
          {isCustomisationsKeyOfType<boolean>(customisations, customisationsOption.key, customisationsOption.type) &&
            customisationsOption.type === "boolean" &&
            <Autocomplete
              disableClearable
              id={customisationsOption.key}
              options={customisationsOption.options} 
              getOptionLabel={(option: boolean) => option ? "Yes" : "No"} 
              value={customisations[customisationsOption.key]}
              onChange={(event, newValue) => handleCustomisationsValueChange(customisationsOption.key, newValue)}
              renderInput={(params) => (
                <TextField 
                  {...params}
                  required
                  variant="filled"
                  label={customisationsOption.label}
                  placeholder={customisationsOption.placeholder}
                />
              )}
            />
          }
          {isCustomisationsKeyOfType<string>(customisations, customisationsOption.key, customisationsOption.type) &&
            customisationsOption.type === "string" &&
            <Autocomplete
              disableClearable
              id={customisationsOption.key}
              options={customisationsOption.options} 
              getOptionLabel={(option: string) => option} 
              value={customisations[customisationsOption.key]}
              onChange={(event, newValue) => handleCustomisationsValueChange(customisationsOption.key, newValue)}
              renderInput={(params) => (
                <TextField 
                  {...params}
                  required
                  variant="filled"
                  label={customisationsOption.label}
                  placeholder={customisationsOption.placeholder} 
                />
              )}
            />
          }
        </Stack>
      ))}
      {/* <Typography 
        variant="body2" 
        component="div"
        align="left" 
      >
        Other customisations:
      </Typography> */}
      <TextField 
        multiline
        variant="filled"
        id="other-customisations"
        name={CUSTOMISATIONS_OTHERS_FIELD}
        label="Other customisations"
        placeholder="Less ice etc."
        value={customisations.others ?? ""}
        onChange={(event) => handleCustomisationsValueChange(event.target.name as typeof CUSTOMISATIONS_OTHERS_FIELD, event.target.value)}
      />
    </Stack>
  )
}

export default CustomisationsSection;