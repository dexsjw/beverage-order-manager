import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { CustomisationsSectionProps } from "../../type-interface/props/CustomisationsSectionProps";
import { Customisations } from "../../type-interface/Customisations";
import { useState } from "react";

const initialCustomisationsValues: Customisations = {
  isTakeAway: false,
  thicknessLevel: "",
  sweetnessLevel: "",
  others: null
};

function CustomisationsSection({ customisationsOptions, handleCustomisationsChange }: Readonly<CustomisationsSectionProps>) {

  customisationsOptions.forEach(customisationsOption => {
    switch (customisationsOption.id) {
      // For boolean options
      case "isTakeAway": {
        if (customisationsOption.booleanOptions) {
          initialCustomisationsValues[customisationsOption.id] = customisationsOption.booleanOptions[0];
        } else {
          console.error(`For ${customisationsOption.id}, booleanOptions cannot be null or empty.`);
          if (customisationsOption.stringOptions || customisationsOption.numberOptions) {
            console.warn("stringOptions or numberOptions was wrongly provided instead");
          }
        }
        break;
      }

      // For string options
      case "thicknessLevel":
      case "sweetnessLevel": {
        if (customisationsOption.stringOptions) {
          initialCustomisationsValues[customisationsOption.id] = customisationsOption.stringOptions[0];
        } else {
          console.error(`For ${customisationsOption.id}, stringOptions cannot be null or empty.`);
          if (customisationsOption.stringOptions || customisationsOption.numberOptions) {
            console.warn("booleanOptions or numberOptions was wrongly provided instead")
          }
        }
        break;
      }
      
      default: {
        console.error(`${customisationsOption.id} does not exist in Customisations type!`)
        break;
      }
    }
  });

  const [customisationsValues, setCustomisationsValues] = useState<Customisations>(initialCustomisationsValues);
  // const [customisationsInputValues, setCustomisationsInputValues] = useState<Customisations>();

  const handleCustomisationsValuesChange = (customisationId: string, customisationValue: string | boolean | number | null) => {
    setCustomisationsValues(prevCustomisations => {
      const newCustomisations = {
        ...prevCustomisations,
        [customisationId]: customisationValue
      }
      console.log(newCustomisations);
      handleCustomisationsChange(newCustomisations);
      return newCustomisations;
    })
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
          key={customisationsOption.id}
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
          {customisationsOption.booleanOptions && 
            <Autocomplete 
              id={customisationsOption.id}
              options={customisationsOption.booleanOptions} 
              getOptionLabel={(option: boolean) => option ? "Yes" : "No"} 
              // TODO: add value and inputValue
              value={customisationsValues ? customisationsValues[customisationsOption.id] as boolean : null}
              onChange={(event, newValue) => handleCustomisationsValuesChange(customisationsOption.id, newValue)}
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
          {customisationsOption.stringOptions &&
            <Autocomplete 
              id={customisationsOption.id}
              options={customisationsOption.stringOptions} 
              getOptionLabel={(option: string) => option} 
              // TODO: add value and inputValue
              value={customisationsValues ? customisationsValues[customisationsOption.id] as string : null}
              onChange={(event, newValue) => handleCustomisationsValuesChange(customisationsOption.id, newValue)}
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