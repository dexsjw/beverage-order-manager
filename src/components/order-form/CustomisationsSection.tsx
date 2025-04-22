import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { OnePlusKopiCustomisations } from "../../static-data/OnePlusKopi";

function CustomisationsSection() {
  return (
    <Stack spacing={1}>
      <Typography 
        variant="body1" 
        component="div"
        align="left" 
      >
        Customisations
      </Typography>
      <Typography 
        variant="body2" 
        component="div"
        align="left" 
      >
        Take Away?*
      </Typography>
      <Autocomplete 
        id="customisations" 
        options={OnePlusKopiCustomisations.isTakeAway} 
        getOptionLabel={(option: boolean) => option ? "Yes" : "No"} 
        defaultValue={OnePlusKopiCustomisations.isTakeAway[0]}
        renderInput={(params) => (
          <TextField 
            {...params}
            required
            variant="filled"
            placeholder="Yes" 
          />
        )}
      />
      <Typography 
        variant="body2" 
        component="div"
        align="left" 
      >
        Thickness Level*:
      </Typography>
      <Autocomplete 
        id="thickness-level" 
        options={OnePlusKopiCustomisations.thicknessLevel} 
        getOptionLabel={(option: string) => option} 
        renderInput={(params) => (
          <TextField 
            {...params}
            required
            variant="filled"
            placeholder="Gao" 
          />
        )}
      />
      <Typography 
        variant="body2" 
        component="div"
        align="left" 
      >
        Sweetness Level*:
      </Typography>
      <Autocomplete 
        id="sweetness-level" 
        options={OnePlusKopiCustomisations.sweetnessLevel} 
        getOptionLabel={(option: string) => option} 
        renderInput={(params) => (
          <TextField 
            {...params}
            required
            variant="filled"
            placeholder="Siu Dai" 
          />
        )}
      />
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