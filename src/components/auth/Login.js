import { Text, Link ,Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react'
import { DASHBOARD, REGISTER } from 'lib/routes';
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import {useLogin} from "hooks/auth"
import { useForm } from 'react-hook-form';
import { emailValidate, passwordValidate } from 'utils/form-validate';

export default function Login() {

  const {login, isLoading} = useLogin();
  const {register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm();

  async function handleLogin(data) {
    const succeded = await login({email: data.email,
       password: data.password,
       redirectTo: DASHBOARD,
      });

    if (succeded) {
      reset();
    }
  }

  return (
  <Center w="100%" h="100vh">
    <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
      <Heading mb="4" size="lg" textAlign="center">
        Log in
      </Heading>
      <form onSubmit={handleSubmit(handleLogin)}>
      <FormControl isInvalid={errors.password}>
          <FormLabel>Email</FormLabel>
          <Input type="email"
           placeholder="user@gmail.com"
          {...register('email', emailValidate)}/>
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
          type="password"
          placeholder="password123"
          {...register('password', passwordValidate)}/>
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>
        <Button mt="4" type="submit" colorScheme='teal'>Log In</Button>
      </form>

      <Text fontSize="xlg" align="center" mt="6"> Dont have an accaunt?
      <Link as={RouterLink} to={REGISTER} color="teal"
      fontWeight="medium" textDecor="underline"
      _hover={{background: "teal.100"}} mt="6" mr="2">
        Register
      </Link>
       instead!
      </Text>

    </Box>
  </Center>
  );
}
