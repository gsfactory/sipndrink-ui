import { Grid, GridItem } from "@chakra-ui/react";

export default function OneColumnLayout({ column }) {
  return (
    <Grid templateColumns={{ sm: "1fr", md: "1fr" }} gap={4} pt={20}>
      <GridItem colSpan={1}>
        {column}
      </GridItem>
    </Grid>
  );
}
