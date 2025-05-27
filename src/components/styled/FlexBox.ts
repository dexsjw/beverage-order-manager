import { Box, styled } from "@mui/material";

export const FlexBoxColumnGap = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 10
})

export const FlexBoxRowGap = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 10
})