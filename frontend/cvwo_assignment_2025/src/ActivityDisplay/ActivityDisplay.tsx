import { 
    Badge,
    Button, 
    DialogActionTrigger, 
    DialogBackdrop, 
    DialogBody, 
    DialogContent, 
    DialogFooter, 
    DialogHeader, 
    DialogRoot, 
    HStack, 
    IconButton, 
    Spacer, 
    Text,
} from "@chakra-ui/react";
import { Activity, Participant, Comment } from "../types";
import { categoryMap } from "../helper/mapTables";
import { useEffect, useState } from "react";
import { getParticipants } from "../api/getParticipants";
import { getComments } from "../api/getComments";
import { toaster } from "../components/ui/toaster";
import { addParticipant } from "../api/addParticipant";
import { deleteParticipant } from "../api/deleteParticipant";
import { FiEdit } from "react-icons/fi";
import DeleteActivityPopover from "./DeleteActivityPopover";
import ActivityDisplayDetails from "./ActivityDisplayDetails";
import ActivityDisplayCommentSection from "./ActivityDisplayCommentSection";
import JoinLeaveButton from "./JoinLeaveButton";

interface ActivityDisplayProps {
    activity: Activity;
    onClose: () => void;
    onUpdateData: () => void;
    user_id: number; // The ID of the logged-in user
}

const ActivityDisplay : React.FC<ActivityDisplayProps> = ({
    activity,
    onClose,
    onUpdateData,
    user_id
}) => {

    const [participants, setParticipants] = useState<Participant[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [refresh, setRefresh] = useState<boolean>(true);

    const isParticipant = participants.map(participant => participant.user_id).includes(user_id)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const participants_data = await getParticipants(activity.activity_id);  
                setParticipants(participants_data); 

                const comments_data = await getComments(activity.activity_id);

                comments_data.sort((a, b) => 
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                )

                setComments(comments_data)
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchData();
    }, [refresh]);

    const refreshData = () => {
        setRefresh(!refresh)
    }

    return (
        <DialogRoot open={true} size="xl">
            <DialogBackdrop/>
            <DialogContent colorScheme="teal">
                <DialogHeader>
                <HStack align="center">
                    <Text fontSize="2xl" fontWeight="bold" color="teal.600">{activity.title}</Text>
                    <Badge colorPalette={categoryMap.get(activity.category)}>{activity.category}</Badge>

                    <Spacer />

                    <IconButton
                        variant="outline" 
                        colorPalette="teal"><FiEdit /></IconButton>
                    <DeleteActivityPopover activity={activity} onClose={() => {
                        onUpdateData(); onClose(); }} />
                </HStack>
                </DialogHeader>
                <DialogBody>
                    
                    <ActivityDisplayDetails activity={activity} participants={participants} loading={loading} />
                    <ActivityDisplayCommentSection activity={activity} comments={comments} user_id={user_id} onUpdateData={refreshData} />

                </DialogBody>
                <DialogFooter>
                <DialogActionTrigger asChild>
                    <JoinLeaveButton 
                        activity={activity} isParticipant={isParticipant} user_id={user_id} 
                        onClose={onClose} onUpdateData={onUpdateData}/>
                </DialogActionTrigger>
                <DialogActionTrigger asChild>
                    <Button variant="outline" onClick={onClose}>Exit</Button>
                </DialogActionTrigger>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
};
export default ActivityDisplay