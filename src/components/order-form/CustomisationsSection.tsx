import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Customisations, CustomisationsKeysOfType } from "../../type-interface/Customisations";
import { CustomisationsSectionProps } from "../../type-interface/props/CustomisationsSectionProps";

const CUSTOMISATIONS_OTHERS_FIELD = "others";
const initialCustomisations: Customisations = {
  isTakeAway: false,
  thicknessLevel: "",
  sweetnessLevel: "",
  others: ""
};

const isCustomisationsKeyOfType = <T,>(
  customisations: Customisations,
  customisationsKey: keyof Customisations, 
  type: string
): customisationsKey is CustomisationsKeysOfType<T> => {
  return customisationsKey in customisations && typeof customisations[customisationsKey] === type;
}

function CustomisationsSection({ customisationsOptions, handleCustomisationsChange }: Readonly<CustomisationsSectionProps>) {

  customisationsOptions.forEach(customisationsOption => {
    let errMsg = "";
    switch (customisationsOption.type) {
      case "boolean": {
        if (isCustomisationsKeyOfType<boolean>(initialCustomisations, customisationsOption.key, customisationsOption.type)) {
          initialCustomisations[customisationsOption.key] = customisationsOption.options[0];
        } else {
          errMsg = `${customisationsOption.key} field has error. Check if customisations options provided correctly.`;
        }
        break;
      }
      
      case "string": {
        if (isCustomisationsKeyOfType<string>(initialCustomisations, customisationsOption.key, customisationsOption.type)) {
          initialCustomisations[customisationsOption.key] = customisationsOption.options[0];
        } else {
          errMsg = `${customisationsOption.key} field has error. Check if customisations options provided correctly.`;
        }
        break;
      }
        
      default: {
        errMsg = "There are errors in customisations options provided. Check if 'id', 'type' or 'options' fields are provided correctly.";
        break;
      }
    }
    if (errMsg) {
      console.error(errMsg);
    }
  });

  const [customisations, setCustomisations] = useState<Customisations>(initialCustomisations);
  const [nullableCustomisations, setNullableCustomisations] = useState<Customisations>(initialCustomisations);
  const [customisationsNullFields, setCustomisationsNullFields] = useState<string[]>([]);

  const updateCustomisations = (
    customisationKey: keyof Customisations,
    customisationValue: string | boolean | number | null
  ): Customisations => {
    // TODO: switch-case not working as intended
    // FIXED: because newCustomisations[customisationKey] value was null which is an "object" type
    let newCustomisations: Customisations = { ...customisations };
    if (customisationValue === null) {
      switch (typeof newCustomisations[customisationKey]) {
        case "boolean": {
          newCustomisations = {
            ...newCustomisations,
            [customisationKey]: false
          }
          break;
        }
        
        case "string": {
          newCustomisations = {
            ...newCustomisations,
            [customisationKey]: ""
          }
          break;
        }
      
        default: {
          console.error(`Invalid Customisations key: ${customisationKey}.`);
          console.error(`Customisations value: ${customisationValue}.`);
          break;
        }
      }
    } else {
      newCustomisations = {
         ...newCustomisations,
         [customisationKey]: customisationValue
      }
    }
    setCustomisations(newCustomisations);
    return newCustomisations;
  }

  const handleCustomisationsValuesChange = (customisationKey: keyof Customisations, customisationValue: string | boolean | number | null) => {
    const newNullableCustomisations: Customisations = {
      ...nullableCustomisations,
      [customisationKey]: customisationValue
    };
    setNullableCustomisations(newNullableCustomisations);
    
    const newCustomisations = updateCustomisations(customisationKey, customisationValue);
    handleCustomisationsChange(newCustomisations);

    const customisationsOption = customisationsOptions.find(customisation => customisation.key === customisationKey);
    setCustomisationsNullFields(prevFields => {
      if (customisationKey !== CUSTOMISATIONS_OTHERS_FIELD && customisationValue === null) {
        return (customisationsOption && !customisationsNullFields.includes(customisationsOption.label))
          ? [ ...prevFields, customisationsOption.label ]
          : prevFields;
      } else {
        return (customisationsOption && customisationsNullFields.includes(customisationsOption.label)) 
          ? customisationsNullFields.filter(label => label !== customisationsOption.label)
          : prevFields;
      }
    });
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
          {customisationsOption.type === "boolean" && 
            <Autocomplete 
              id={customisationsOption.key}
              options={customisationsOption.options} 
              getOptionLabel={(option: boolean) => option ? "Yes" : "No"} 
              value={nullableCustomisations[customisationsOption.key] as boolean}
              onChange={(event, newValue) => handleCustomisationsValuesChange(customisationsOption.key, newValue)}
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
              id={customisationsOption.key}
              options={customisationsOption.options} 
              getOptionLabel={(option: string) => option} 
              value={nullableCustomisations[customisationsOption.key] as string}
              onChange={(event, newValue) => handleCustomisationsValuesChange(customisationsOption.key, newValue)}
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
        value={nullableCustomisations.others ?? ""}
        onChange={(event) => handleCustomisationsValuesChange(event.target.name as "others", event.target.value)}
      />
      {customisationsNullFields.length > 0 && 
        <Typography 
          variant="body1" 
          component="div"
          align="left"
          color="error"
        >
          {`${customisationsNullFields.join(", ")} is required!`}
        </Typography>
      }
    </Stack>
  )
}

export default CustomisationsSection;