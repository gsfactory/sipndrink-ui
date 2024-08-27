import { Grid, GridItem } from "@chakra-ui/react";

export default function TwoColumnLayout({ leftColumn, rightColumn }) {
  return (
    <Grid templateColumns={{ sm: "1fr", md: "2fr 1fr" }} gap={4} pt={20}>
      <GridItem colSpan={1}>
        {leftColumn}
      </GridItem>
      <GridItem colSpan={1}>
        {rightColumn}
      </GridItem>
    </Grid>
  );
}
