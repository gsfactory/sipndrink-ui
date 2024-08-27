import { Box, Button, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

const MarketingHero = () => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("gray.900", "gray.100");

  return (
    <Box
      bgImage="url('/images/hero-bg.jpg')"
      bgSize="cover"
      bgPosition="center"
      minH="50vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box textAlign="center">
        <Heading fontSize={{ base: "4xl", md: "6xl" }} fontWeight="bold" mb={6} color={color}>
          Welcome to My Website
        </Heading>
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" mb={8} color={color}>
          We offer the best solutions for your needs. Check out our services and see how we can help
          you achieve your goals.
        </Text>
        <Link href="/services" passHref>
          <Button size="lg" colorScheme="blue">
            Our Services
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default MarketingHero;
