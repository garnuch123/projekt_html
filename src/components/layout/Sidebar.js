import { Box, Button, Stack, Code } from "@chakra-ui/react"
import { PROTECTED, USERS } from "lib/routes"
import { Link } from "react-router-dom"
import { useAuth } from "hooks/auth";
import Avatar from "components/profile/Avatar";


function ActiveUser() {
  const {user, isLoading} = useAuth();

  if(isLoading) return "Loading...";


  return (
    <Link to={`${PROTECTED}/profile/${user.id}`}> 
    <Stack align={"center"} spacing={"5"} my={"8"}>
      <Avatar user={user} />
      <Code> @{user?.username}</Code>
      <Button colorScheme="teal" width={"full"} as={Link} to={`${PROTECTED}/profile/${user.id}`} >Edit Profile</Button>
    </Stack>
  </Link>
  );
}



export default function Sidebar() {
  return (
    <Box
      px="6"
      height="100vh"
      w="100%"
      maxW="300px"
      borderLeft="1px solid"
      borderLeftColor="teal.100"
      position="sticky"
      top="16"
      display={ {base: "none", md: "block"}}
    >
      <ActiveUser />
      <Box alignContent={"center"}>
      <Box as="ul" borderBottom="2px solid" borderColor="teal.200"></Box>
      <Button
          variant={"outline"}
          colorScheme="teal"
          as={Link}
          to={USERS}
          mt="4"
          size="sm">All users</Button>
      </Box>
    </Box>
      
  )
}
