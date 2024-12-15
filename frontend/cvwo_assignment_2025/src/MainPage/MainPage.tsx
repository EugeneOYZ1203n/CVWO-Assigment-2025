import { useEffect, useState } from "react";
import { VStack, Box, Spinner, Center } from "@chakra-ui/react";
import Topbar from './Topbar';
import UpcomingEvents from './UpcomingEvents';
import SearchBar from './SearchBar';
import { getActivities } from '../api/getActivities';
import { Activity } from "../types";
import { getParticipatedActivities } from "../api/getParticipatedActivities";
import React, { Suspense } from "react";

const ActivityList = React.lazy(() => import('./ActivityList'));

interface MainPageProps {
    username: string;
    user_id: number;
}

const MainPage : React.FC<MainPageProps> = ({username, user_id}) => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [participated, setParticipated] = useState<number[]>([]);

    const [searchActivities, setSearchActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [displayOpen, setDisplayOpen] = useState<boolean>(false);
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [modalActivity, setModalActivity] = useState<Activity | null>(null);

    const [refresh, setRefresh] = useState<boolean>(true);

    const [ActivityForm, setActivityForm] = useState<any>(null);
    const [ActivityDisplay, setActivityDisplay] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const activities_data = await getActivities();  
                setActivities(activities_data); 

                const participated_data = await getParticipatedActivities(user_id);  
                setParticipated(participated_data || []); 
            } catch (error) {
                console.error("Error fetching activities:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, [refresh]);

    useEffect(() => {
        // Dynamically import the form and display to speed up load times
        import("../ActivityDisplay/ActivityDisplay").then((module) => {
            setActivityDisplay(() => module.default);
        });
        import("../ActivityForm/ActivityForm").then((module) => {
            setActivityForm(() => module.default);
        });
    }, []);

    const handleAddActivity = () => {
        handleOpenForm(null)
    };

    const handleEditActivity = (activity: Activity) => {
        handleOpenForm(activity)
    }

    const handleOpenForm = (activity: Activity | null) => {
        setFormOpen(true)
        if (displayOpen) { handleCloseDisplay() }
        setModalActivity(activity)
    }

    const handleCloseForm = () => {
        setFormOpen(false)
    }

    const handleOpenDisplay = (activity : Activity) => {
        setDisplayOpen(true)
        if (formOpen) { handleCloseForm() }
        setModalActivity(activity)
    }

    const handleCloseDisplay = () => {
        setDisplayOpen(false)
    }

    const refreshData = () => {
        setRefresh(!refresh)
    }

    return (
        <Box>
        {loading ? (
            <Center height="100vh">
                <Spinner size="xl" color="teal" />
            </Center>
        ) : (
            <>
            <Box zIndex={10} position="fixed" left={0} top={0} width="full">
                {ActivityDisplay != null ? (
                    <ActivityDisplay
                    isOpen={displayOpen}
                    activity={modalActivity!} 
                    onClose={handleCloseDisplay} 
                    onUpdateData={refreshData}
                    onEdit={handleEditActivity}
                    user_id={user_id}/>
                    ) : <Spinner alignSelf="center" colorPalette="teal"/>}
                {ActivityForm != null ? (
                    <ActivityForm
                    isOpen={formOpen}
                    activity={modalActivity!} 
                    onClose={handleCloseForm} 
                    onUpdateData={refreshData}
                    user_id={user_id}/>
                    ) : <Spinner alignSelf="center" colorPalette="teal"/>}
            </Box>
            <VStack align="stretch" w="full" p={4} spaceY={4}> 
                <Topbar username={username} onAddActivity={handleAddActivity} />
                <UpcomingEvents activities={activities}/>
                <SearchBar activities={activities} setActivities={setSearchActivities}/>
                <Suspense fallback={<Spinner alignSelf="center" colorPalette="teal"/>}>
                    <ActivityList activities={searchActivities} participated={participated} onCardClick={handleOpenDisplay}/>
                </Suspense>
            </VStack>
            </>
        )}
        </Box>
    )
}

export default MainPage