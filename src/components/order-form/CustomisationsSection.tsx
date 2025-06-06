import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { CustomisationsSectionProps } from "../../type-interface/props/CustomisationsSectionProps";
import { Customisations } from "../../type-interface/Customisations";
import { useState } from "react";

function CustomisationsSection({ customisationsOptions }: Readonly<CustomisationsSectionProps>) {

  const initialCustomisationsValues: Customisations = {};
  customisationsOptions.forEach(customisationsOption => {
    initialCustomisationsValues[customisationsOption.id] = customisationsOption.initialValue;
  })

  const [customisationsValues, setCustomisationsValues] = useState<Customisations>()

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
          key={customisationsOption.id}
          spacing={1}
        >
          <Typography 
            variant="body2" 
            component="div"
            align="left" 
          >
            {customisationsOption.name}*:
          </Typography>
          {customisationsOption.stringOptions &&
            <Autocomplete 
              id={customisationsOption.id}
              options={customisationsOption.stringOptions} 
              getOptionLabel={(option: string) => option} 
              // TODO: add value and inputValue
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
          {customisationsOption.booleanOptions && 
            <Autocomplete 
              id={customisationsOption.id}
              options={customisationsOption.booleanOptions} 
              getOptionLabel={(option: boolean) => option ? "Yes" : "No"} 
              // TODO: add value and inputValue
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
      <Typography 
        variant="body2" 
        component="div"
        align="left" 
      >
        Other customisations:
      </Typography>
        <TextField 
          id="other-customisations"
          variant="filled"
          placeholder="Less ice etc" 
          multiline
        />
    </Stack>
  )
}

export default CustomisationsSection;