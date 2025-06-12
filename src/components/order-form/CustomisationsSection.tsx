import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Customisations } from "../../type-interface/Customisations";
import { CustomisationsSectionProps } from "../../type-interface/props/CustomisationsSectionProps";

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
            console.warn("booleanOptions or numberOptions was wrongly provided instead");
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

  const handleCustomisationsValuesChange = (customisationId: string, customisationValue: string | boolean | number | null) => {
    const newCustomisations = {
      ...customisationsValues,
      [customisationId]: customisationValue
    }
    setCustomisationsValues(() => {
      console.log(newCustomisations);
      return newCustomisations;
    });
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
              value={customisationsValues[customisationsOption.id] as boolean}
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
              value={customisationsValues[customisationsOption.id] as string}
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
          multiline
          variant="filled"
          id="other-customisations"
          name="others"
          label="Others"
          placeholder="Less ice etc."
          value={customisationsValues.others ?? ""}
          onChange={(event) => handleCustomisationsValuesChange(event.target.name, event.target.value)}
        />
    </Stack>
  )
}

export default CustomisationsSection;