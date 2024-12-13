import { useEffect, useState } from "react";
import { VStack, Box, Spinner, Center } from "@chakra-ui/react";
import Topbar from './Topbar';
import UpcomingEvents from './UpcomingEvents';
import SearchBar from './SearchBar';
import ActivityList from './ActivityList';
import { getActivities } from '../api/getActivities';
import { Activity } from "../types";
import { getParticipatedActivities } from "../api/getParticipatedActivities";

const MainPage = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [participated, setParticipated] = useState<number[]>([]);

    const [searchActivities, setSearchActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const username = "Alice"; 
    const user_id = 1;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const activities_data = await getActivities();  
                setActivities(activities_data); 

                const participated_data = await getParticipatedActivities(user_id);  
                setParticipated(participated_data); 
            } catch (error) {
                console.error("Error fetching activities:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, []);

    // Function to handle Add Activity button
    const handleAddActivity = () => {
        console.log("Add Activity button clicked!");
        // Add your logic here (e.g., open a modal to create a new activity)
    };

    return (
        <Box>
        {loading ? (
            <Center height="100vh">
                <Spinner size="xl" color="teal" />
            </Center>
        ) : (
            <VStack align="stretch" w="full" p={4} spaceY={4}> 
                <Topbar username={username} onAddActivity={handleAddActivity} />
                <UpcomingEvents activities={activities}/>
                <SearchBar activities={activities} setActivities={setSearchActivities}/>
                <ActivityList activities={searchActivities} participated={participated}/>
            </VStack>
        )}
        </Box>
    )
}

export default MainPage