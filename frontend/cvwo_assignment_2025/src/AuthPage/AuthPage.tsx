import { Box, Button, Input, VStack, Text } from "@chakra-ui/react"
import { Field } from "../components/ui/field"
import { useState } from "react";
import { createUserAndGetUserID } from "../api/createUserAndGetUserID";
import { toaster } from "../components/ui/toaster";
import { useNavigate } from "react-router-dom";

interface AuthPageProps {
  setUsername: (username:string) => void;
  setUserID: (userID:number) => void;
}

const AuthPage : React.FC<AuthPageProps> = ({
  setUsername, setUserID
}) => {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data : {user_id : number} = await createUserAndGetUserID(usernameInput)

      setUsername(usernameInput)
      setUserID(data.user_id)

      toaster.create({
          description: `Logged in as ${usernameInput}`,
          type: "success",
      })

      navigate("/");
    } catch (error) {
      toaster.create({
          description: `Failed to log in as ${usernameInput}`,
          type: "error",
      })
    }
  }

  return (
    <Box minH="80vh" display="flex" alignItems="center" justifyContent="center">
      <VStack
        spaceY={6}
        p={8}
        bg="white"
        shadow="md"
        borderRadius="md"
        width="100%"
        maxWidth="400px"
        textAlign="center"
      >
        <Text fontSize="2xl" fontWeight="bold" color="teal.600">
          Welcome to Your Hangout Hub!
        </Text>
        <Field label="What is your name?" color="gray.800">
          <Input
            placeholder="Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            focusRingColor="teal.500"
          />
        </Field>
        <Button onClick={handleLogin} variant="solid" colorPalette="teal">
          Enter
        </Button>
      </VStack>
    </Box>
  )
}

export default AuthPage