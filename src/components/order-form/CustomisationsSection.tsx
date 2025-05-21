import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { CustomisationsSectionProps } from "../../type-interface/props/CustomisationsSectionProps";

function CustomisationsSection({ customisationsOptions }: Readonly<CustomisationsSectionProps>) {

  return (
    <Stack spacing={1}>
      <Typography 
        variant="body1" 
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
              defaultValue={
                typeof customisationsOption.defaultValue === "string" 
                ? customisationsOption.defaultValue 
                : ""
              }
              renderInput={(params) => (
                <TextField 
                  {...params}
                  required
                  variant="filled"
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
              defaultValue={
                typeof customisationsOption.defaultValue === "boolean" 
                ? customisationsOption.defaultValue 
                : true
              }
              renderInput={(params) => (
                <TextField 
                  {...params}
                  required
                  variant="filled"
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