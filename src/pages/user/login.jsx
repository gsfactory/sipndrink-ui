import { getCsrfToken, getSession } from "next-auth/react";

export default function SimpleCard(props) {

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <form 
                method="post"
                action="/api/auth/callback/credentials" 
                className="row g-3 needs-validation">
              
              <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={props.csrfToken}
              />
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  id="password"
                />
              </FormControl>

              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  isLoading={false} // Set to true if you need to show loading state
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession(context);
    if (session && session.user.name) {
      return {
        redirect: {
          permanent: false,
          destination: "/app/main",
        },
      };
    }

    return {
      props: {
        error: context.query && context.query.error ? context.query.error : null,
        csrfToken: await getCsrfToken(context),
        session,
        message: context.query.msg || null
      },
    };
  } catch (error) {
    console.log("Error:", error);
    return {
      props: {
        statusCode: error.response ? error.response.status : 400,
      },
    };
  }
}