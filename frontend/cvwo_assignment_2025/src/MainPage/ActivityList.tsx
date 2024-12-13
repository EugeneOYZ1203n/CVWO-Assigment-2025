import React from "react";
import { Box, VStack} from "@chakra-ui/react";
import ActivityCard from "./ActivityCard";
import { Activity } from "../types";

interface ActivityListProps {
    activities: Activity[];
    participated: number[];
  }

const ActivityList : React.FC<ActivityListProps> = ({activities, participated}) => {
    const handleCardClick = (activity : Activity) => {
      // Open modal logic for the activity
      console.log(`Opening modal for activity ${activity.activity_id}`);
    };
  
    return (
      <Box width="full">
        <VStack 
            align="stretch"
            width="full" 
            spaceY={4}
        >
        {activities.map((activity) => {
            return (
                <ActivityCard
                    key={activity.activity_id}
                    activity={activity}
                    isParticipant={participated.includes(activity.activity_id)}
                    onClick={()=>handleCardClick(activity)}
                />
            );
        })}
        </VStack>
      </Box>
    );
  };

export default ActivityList