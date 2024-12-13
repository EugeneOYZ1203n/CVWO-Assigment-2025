import React from 'react'

import { Box, Text, VStack, HStack, Badge } from "@chakra-ui/react";
import { Activity } from "../types";
import { formatDate } from '../helper/format_date';
import { categoryMap } from '../helper/mapTables';

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
                        <Badge colorPalette={categoryMap.get(activity.category)}>{activity.category}</Badge>
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