import { useEffect, useState } from "react";
import { VStack, Box, Spinner, Center } from "@chakra-ui/react";
import Topbar from './Topbar';
import UpcomingEvents from './UpcomingEvents';
import SearchBar from './SearchBar';
import ActivityList from './ActivityList';
import { getActivities } from '../api/getActivities';
import { Activity } from "../types";

const MainPage = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [searchActivities, setSearchActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const username = "Alice"; 
    const user_id = 1;

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const data = await getActivities();  
                setActivities(data); 
            } catch (error) {
                console.error("Error fetching activities:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchActivities();
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
                <ActivityList activities={searchActivities} user_id={user_id}/>
            </VStack>
        )}
        </Box>
    )
}

export default MainPage