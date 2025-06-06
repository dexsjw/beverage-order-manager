import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { CustomisationsSectionProps } from "../../type-interface/props/CustomisationsSectionProps";
import { Customisations } from "../../type-interface/Customisations";
import { useState } from "react";

function CustomisationsSection({ customisationsOptions }: Readonly<CustomisationsSectionProps>) {

  // const 

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
          key={customisationsOption.name}
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
              id={customisationsOption.name}
              options={customisationsOption.stringOptions} 
              getOptionLabel={(option: string) => option} 
              
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
              id={customisationsOption.name}
              options={customisationsOption.booleanOptions} 
              getOptionLabel={(option: boolean) => option ? "Yes" : "No"} 
              
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