import { Grid, GridItem, Text } from '@chakra-ui/react'
import { Activity, Participant } from '../types';
import { formatDate } from '../helper/format_date';

interface ActivityDisplayDetailsProps {
    activity: Activity;
    participants: Participant[];
    loading: boolean;
}

const ActivityDisplayDetails : React.FC<ActivityDisplayDetailsProps> = ({activity, participants, loading}) => {
  return (
    <>
    <Text textAlign="left" fontSize="md" color="gray.500" mb={8}>
        {activity.description}
    </Text>

    <Grid 
        templateColumns={"repeat(2, 1fr)"} 
        overflow="hidden"
    >
        <GridItem alignContent="start">
            <Text textAlign="start" lineClamp={1}>
            <strong>Duration:</strong> {formatDate(activity.start_date)} - {formatDate(activity.end_date)}
            </Text>
        </GridItem>
        <GridItem>
            <Text textAlign="start" lineClamp={1}>
            <strong>Location:</strong> {activity.location}
            </Text>
        </GridItem>
        <GridItem>
            <Text textAlign="start" lineClamp={1}>
            <strong>Status:</strong> {activity.status}
            </Text>
        </GridItem>
        <GridItem>
            <Text textAlign="start" lineClamp={1}>
            <strong>Vacancy:</strong> {activity.participant_count}/{activity.max_participants}
            </Text>
        </GridItem>
        <GridItem colSpan={2}>
            <Text textAlign="start" lineClamp={1}>
            <strong>Participants:</strong> {
                loading ? "Loading..." :
                participants.length === 0 ? "None" :
                participants.map(participant => participant.user_name).join(", ")
            }
            </Text>
        </GridItem>
    </Grid>
    </>
  )
}

export default ActivityDisplayDetails