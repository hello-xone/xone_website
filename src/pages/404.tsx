import { Box, Button, Heading, HStack,Link, Text, VStack } from "@chakra-ui/react";

import { EXTERNAL_LINKS } from '@/lib/external';

export default function NotFoundPage() {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="white" px={6} py={24}>
      <VStack spacing={6} textAlign="center">
        <Text fontSize="lg" fontWeight="bold" color="red.500">
          404
        </Text>
        <Heading as="h1" fontSize={{ base: "3xl", sm: "5xl" }} fontWeight="semibold" color="gray.900">
          This page does not exist
        </Heading>
        <Text fontSize={{ base: "md", sm: "lg" }} color="gray.500">
          Sorry, we couldn’t find the page you’re looking for.
        </Text>
        <HStack spacing={4} mt={6}>
          <Link href="/" _hover={{ textDecoration: "none" }}>
            <Button bg="red.500" color="white" _hover={{ bg: "red.600" }} size="md">
              Go Back Home
            </Button>
          </Link>
          <Link href={EXTERNAL_LINKS.TelegramDevelopers} fontSize="md" color="red.500">
            Contact Support &rarr;
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}
