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
    let errMsg = "";
    switch (customisationsOption.id) {
      // For boolean options
      case "isTakeAway": {
        if (customisationsOption.booleanOptions) {
          initialCustomisationsValues[customisationsOption.id] = customisationsOption.booleanOptions[0];
        } else {
          errMsg = `For ${customisationsOption.id}, booleanOptions must be provided. \n`;
        }
        break;
      }

      // For string options
      case "thicknessLevel":
      case "sweetnessLevel": {
        if (customisationsOption.stringOptions) {
          initialCustomisationsValues[customisationsOption.id] = customisationsOption.stringOptions[0];
        } else {
          errMsg = `For ${customisationsOption.id}, stringOptions must be provided. \n`;
        }
        break;
      }
      
      default: {
        errMsg = `${customisationsOption.id} does not exist in Customisations type! \n`;
        break;
      }
    }

    // errMsg = errMsg + customisationsOption.stringOptions ? "" : "stringOptions";
    if (errMsg) {
      console.error(errMsg);
    }
  });

  const [customisationsValues, setCustomisationsValues] = useState<Customisations>(initialCustomisationsValues);
  const [isRequiredCustomisationsNull, setIsRequiredCustomisationsNull] = useState(false);
  const [customisationsNullErrorMessage, setCustomisationsNullErrorMessage] = useState("");

  const getNullCustomisationName = (customisations: Customisations) => {

  }

  const handleCustomisationsValuesChange = (customisationId: string, customisationValue: string | boolean | number | null) => {
    const newCustomisations: Customisations = {
      ...customisationsValues,
      [customisationId]: customisationValue
    };
    setCustomisationsValues(newCustomisations);
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
          {customisationsOption.type === "boolean" && 
            <Autocomplete 
              id={customisationsOption.id}
              options={customisationsOption.options} 
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
          {customisationsOption.type === "string" &&
            <Autocomplete 
              id={customisationsOption.id}
              options={customisationsOption.options} 
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
        name="others"
        label="Other customisations"
        placeholder="Less ice etc."
        value={customisationsValues.others ?? ""}
        onChange={(event) => handleCustomisationsValuesChange(event.target.name, event.target.value)}
      />
      {isRequiredCustomisationsNull && 
        <Typography 
          variant="body1" 
          component="div"
          align="left"
          color="error"
        >
          {`${customisationsNullErrorMessage} is required!`}
        </Typography>
      }
    </Stack>
  )
}

export default CustomisationsSection;