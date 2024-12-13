import React from 'react'

import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { Activity } from "../types";

interface ActivityCardProps {
  activity: Activity;
  isParticipant: boolean;
  onClick: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ 
    activity, 
    isParticipant, 
    onClick 
  }) => {
    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = date.toLocaleString("en-US", { month: "short" }); // "Jan", "Feb", etc.
        return `${day} ${month}`;
    };

    const isFullCapacity = activity.participant_count === activity.max_participants
  
    return (
        <Box 
            borderColor="teal.500"
            borderWidth={isParticipant ? "1px" : "0px"}
            borderRadius="md" 
            p={4} 
            mx={32}
            cursor="pointer" 
            _hover={{ bg: "gray.900" }} 
            onClick={onClick} 
        >
            <HStack justify="space-between" borderLeft="4px" borderColor="teal.500">
                <VStack align="start" maxW="80%" 
                    textOverflow="ellipsis" 
                    overflow="hidden"
                >
                    <HStack>
                        <Text textAlign="left" fontSize="xl" fontWeight="bold" lineClamp="2">{activity.title}</Text>
                        <Box borderRadius="10px" bg="teal.700" paddingX={2} height="20px">
                            <Text color="white" fontSize="xs">{activity.category}</Text>
                        </Box>
                    </HStack>
                    <Text textAlign="left" fontSize="sm" color="gray.500" lineClamp="3">{activity.description}</Text>
                    <Text textAlign="left" fontSize="sm">{activity.location}, {formatDate(activity.start_date)} - {formatDate(activity.end_date)}</Text>
                </VStack>
                <VStack align="end">
                    <Text fontSize="sm">{activity.status}</Text>
                    <Text 
                        fontSize="sm"
                        fontWeight={isFullCapacity ? "bold" : "inherit"}
                        color={isFullCapacity ? "teal.500" : "white"}
                    >
                        {activity.participant_count}/{activity.max_participants}
                    </Text>
                    {isParticipant && <Text fontSize="sm">Joined</Text>}
                </VStack>
            </HStack>
      </Box>
    );
  };

export default ActivityCard