import React from "react";
import { Box, VStack} from "@chakra-ui/react";
import ActivityCard from "./ActivityCard";
import { Activity, Participant } from "../types";

interface ActivityListProps {
    activities: Activity[];
    user_id: number;
  }

const ActivityList : React.FC<ActivityListProps> = ({activities, user_id}) => {
    const handleCardClick = (activity : Activity, participants : Participant[]) => {
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
                    user_id={user_id}
                    onClick={handleCardClick}
                />
            );
        })}
        </VStack>
      </Box>
    );
  };

export default ActivityList