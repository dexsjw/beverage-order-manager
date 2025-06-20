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

const isCustomisationsKeyofType = <T,>(
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
        if (isCustomisationsKeyofType<boolean>(initialCustomisations, customisationsOption.id, customisationsOption.type)) {
          initialCustomisations[customisationsOption.id] = customisationsOption.options[0];
        } else {
          errMsg = `${customisationsOption.id} field has error. Check if customisations options provided correctly.`;
        }
        break;
      }
      
      case "string": {
        if (isCustomisationsKeyofType<string>(initialCustomisations, customisationsOption.id, customisationsOption.type)) {
          initialCustomisations[customisationsOption.id] = customisationsOption.options[0];
        } else {
          errMsg = `${customisationsOption.id} field has error. Check if customisations options provided correctly.`;
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
  const [isRequiredCustomisationsNull, setIsRequiredCustomisationsNull] = useState(false);
  const [customisationsNullFields, setCustomisationsNullFields] = useState<string[]>([]);

  const isRequiredCustomisationsValuesNull = (customisations: Customisations): boolean => {
    let isAnyNullValue = false;
    for (const [key, value] of Object.entries(customisations)) {
      if (key !== CUSTOMISATIONS_OTHERS_FIELD && value === null) {
        isAnyNullValue = true
      }
    }
    return isAnyNullValue;
  }

  const handleCustomisationsValuesChange = (customisationId: keyof Customisations, customisationValue: string | boolean | number | null) => {
    const newCustomisations: Customisations = {
      ...customisations,
      [customisationId]: customisationValue
    };
    setCustomisations(newCustomisations);

    if (customisationId !== CUSTOMISATIONS_OTHERS_FIELD && customisationValue === null) {
      setIsRequiredCustomisationsNull(true);
      setCustomisationsNullFields(prevFields => {
        const customisationsOption = customisationsOptions.find(customisation => customisation.id === customisationId);
        return (customisationsOption && !customisationsNullFields.includes(customisationsOption.label)) 
        ? [ ...prevFields, customisationsOption.label ]
        : prevFields;
      });
      handleCustomisationsChange(emptyCustomisations);

    } else {
      setCustomisationsNullFields(prevFields => {
        const customisationsOption = customisationsOptions.find(customisation => customisation.id === customisationId);
        return customisationsOption 
        ? customisationsNullFields.filter(label => label !== customisationsOption.label)
        : prevFields;
      });

      if (isRequiredCustomisationsValuesNull(newCustomisations)) {
        setIsRequiredCustomisationsNull(true);
        handleCustomisationsChange(emptyCustomisations);
      } else {
        setIsRequiredCustomisationsNull(false);
        handleCustomisationsChange(newCustomisations);
      }
    }
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
              value={customisations[customisationsOption.id] as boolean}
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
              value={customisations[customisationsOption.id] as string}
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
        name={CUSTOMISATIONS_OTHERS_FIELD}
        label="Other customisations"
        placeholder="Less ice etc."
        value={customisations.others ?? ""}
        onChange={(event) => handleCustomisationsValuesChange(event.target.name as "others", event.target.value)}
      />
      {isRequiredCustomisationsNull && 
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