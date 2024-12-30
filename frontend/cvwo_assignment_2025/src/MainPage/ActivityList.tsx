import React from "react";
import { Box, VStack} from "@chakra-ui/react";
import ActivityCard from "./ActivityCard";
import { Activity } from "../types";

interface ActivityListProps {
    activities: Activity[];
    participated: number[];
    onCardClick: (activity : Activity) => void;
  }

const ActivityList : React.FC<ActivityListProps> = ({
  activities, 
  participated, 
  onCardClick
}) => {
  return (
    <Box width="full">
      <VStack 
          align="stretch"
          width="full" 
          spaceY={4}
          p={4}
      >
      {activities.map((activity) => {
          return (
              <ActivityCard
                  key={activity.activity_id}
                  activity={activity}
                  isParticipant={participated.includes(activity.activity_id)}
                  onClick={()=>onCardClick(activity)}
              />
          );
      })}
      </VStack>
    </Box>
  );
};

export default ActivityList