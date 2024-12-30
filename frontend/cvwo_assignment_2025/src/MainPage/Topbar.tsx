import { Button, Text, Spacer, Icon, Flex } from "@chakra-ui/react";
import { MdAdd} from "react-icons/md";

type TopbarProps = {
    username: string; 
    onAddActivity: () => void; 
};

const Topbar : React.FC<TopbarProps> = ({username, onAddActivity}) => {
  return (
    <Flex
      direction="row"
      bg="teal.600" color="white" shadow="md"
      align="center" 
      px={8} py={4} 
    >
      <Text fontSize="2xl" fontWeight="bold">
          Hangout Hub
      </Text>

      <Spacer />

      <Text 
        fontSize="md" maxWidth="200px" maxLines={1} marginRight={4}
        display={{ base: "none", md: "block" }}
      >
        Hello, {username.slice(0,20)}!
      </Text>
      <Button colorScheme="teal" onClick={onAddActivity}>
          <Icon><MdAdd/></Icon>
          <Text display={{ base: "none", md: "block" }}>Add Activity</Text>
      </Button>
    </Flex>
  )
}

export default Topbar