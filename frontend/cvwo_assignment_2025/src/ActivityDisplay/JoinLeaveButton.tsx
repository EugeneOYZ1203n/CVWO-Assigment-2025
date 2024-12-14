import { Button } from '@chakra-ui/react'
import React from 'react'
import { toaster } from '../components/ui/toaster';
import { Activity } from '../types';
import { addParticipant } from '../api/addParticipant';
import { deleteParticipant } from '../api/deleteParticipant';

interface JoinLeaveButtonProps {
    activity: Activity;
    isParticipant: boolean;
    user_id: number;
    onClose: () => void;
    onUpdateData: () => void;
}

const JoinLeaveButton : React.FC<JoinLeaveButtonProps> = ({
    activity,
    isParticipant,
    user_id,
    onClose,
    onUpdateData
}) => {
    const handleJoinLeaveActivity = async () => {
        if (isParticipant) {
            handleLeaveActivity()
        } else {
            handleJoinActivity()
        }
        onClose()
    }

    const handleJoinActivity = async () => {
        try {
            if (activity.participant_count === activity.max_participants) {
                throw new Error("Activity already full!")
            }

            await addParticipant(user_id, activity.activity_id)  
            onUpdateData()
            toaster.create({
                description: `Joined ${activity.title}`,
                type: "success",
            })
        } catch (error) {
            toaster.create({
                description: `Failed to join ${activity.title}`,
                type: "error",
            })
        }
    }

    const handleLeaveActivity = async () => {
        try {
            await deleteParticipant(user_id, activity.activity_id)  
            onUpdateData()
            toaster.create({
                description: `Left ${activity.title}`,
                type: "success",
            })
        } catch (error) {
            toaster.create({
                description: `Failed to leave ${activity.title}`,
                type: "error",
            })
        }
    }

    return (
        <Button 
            variant="subtle" colorPalette="teal"
            onClick={handleJoinLeaveActivity} 
            width="20%"
        >
            {isParticipant ? "Leave" : "Join"}
        </Button>
    )
}

export default JoinLeaveButton