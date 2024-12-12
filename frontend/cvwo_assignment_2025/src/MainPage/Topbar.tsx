import { Box, Button, Text, HStack, Spacer, Icon } from "@chakra-ui/react";
import { MdAdd} from "react-icons/md";

type TopbarProps = {
    username: string; 
    onAddActivity: () => void; 
};

const Topbar : React.FC<TopbarProps> = ({username, onAddActivity}) => {
  return (
    <Box bg="teal.600" color="white" px={8} py={4} shadow="md">
      <HStack spaceX={4} w="full">
        <Text fontSize="2xl" fontWeight="bold">
            Hangout Hub
        </Text>

        <Spacer />

        <Text fontSize="md">Hello, {username}!</Text>
        <Button colorScheme="teal" onClick={onAddActivity}>
            <Icon><MdAdd/></Icon>
            Add Activity
        </Button>
      </HStack>
    </Box> 
  )
}

export default Topbar