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
      if (usernameInput.length > 100) { 
        throw new Error("Username too long!")
      }

      if (usernameInput.trim().length == 0) { 
        throw new Error("Username cannot be whitespace!")
      }

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
          description: `Failed to log in as ${usernameInput}: ${error}`,
          type: "error",
      })
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); 
      handleLogin()
    }
  };

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
        <Field label="What is your name?" color="gray.800"
          invalid={usernameInput.length > 100}
          errorText="Username cannot be longer than 100 characters"
        >
          <Input
            placeholder="Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            focusRingColor="teal.500"
            onKeyDown={handleKeyDown}
          />
        </Field>
        <Button onClick={handleLogin} variant="solid" colorPalette="teal"
          disabled={usernameInput.length > 100}
        >
          Enter
        </Button>
      </VStack>
    </Box>
  )
}

export default AuthPage