import { Box, Container, styled } from "@mui/material";

export const FlexContainerColumn = styled(Container)({
  height: "100vh",
  display: "flex",
  flexDirection: "column"
})

export const FlexBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignContent: "flex-start"
})