import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Customisations, CustomisationsKeysOfType } from "../../type-interface/Customisations";
import { CustomisationsSectionProps } from "../../type-interface/props/CustomisationsSectionProps";

const initialCustomisationsValues: Customisations = {
  isTakeAway: false,
  thicknessLevel: "",
  sweetnessLevel: "",
  others: null
};

const isCustomisationsKeyofType = <T,>(
  customisations: Customisations,
  customisationsKey: keyof Customisations, 
  type: string
): customisationsKey is CustomisationsKeysOfType<T> => {
  return customisationsKey in customisations && typeof customisations[customisationsKey] === type;
}

function CustomisationsSection({ customisationsOptions, handleCustomisationsChange }: Readonly<CustomisationsSectionProps>) {

  customisationsOptions.forEach(customisationsOption => {
    switch (customisationsOption.type) {
      case "boolean": {
        if (isCustomisationsKeyofType<boolean>(initialCustomisationsValues, customisationsOption.id, customisationsOption.type)) {
          initialCustomisationsValues[customisationsOption.id] = customisationsOption.options[0];
        }
        break;
      }

      case "string": {
        if (isCustomisationsKeyofType<string>(initialCustomisationsValues, customisationsOption.id, customisationsOption.type)) {
          initialCustomisationsValues[customisationsOption.id] = customisationsOption.options[0];
        }
        break;
      }
        
      default: {
        console.error("There are errors in customisations options provided. Check if 'id' or 'options' fields are provided correctly.")
        break;
      }
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