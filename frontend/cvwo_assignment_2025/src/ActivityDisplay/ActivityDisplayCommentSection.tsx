import { Button, HStack, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Field } from '../components/ui/field';
import CommentDisplay from './CommentDisplay';
import { addComment } from '../api/addComment';
import { Activity, Comment } from '../types';
import { toaster } from '../components/ui/toaster';

interface ActivityDisplayCommentSectionProps {
    activity: Activity;
    comments: Comment[];
    user_id: number;
    onUpdateData: () => void;
}

const ActivityDisplayCommentSection:React.FC<ActivityDisplayCommentSectionProps> = ({
    activity,
    comments,
    user_id,
    onUpdateData
}) => {
    const [commentText, setCommentText] = useState<string>('');

    const handleAddComment = async () => {
        try {
            await addComment(user_id, commentText, activity.activity_id); 
            setCommentText(''); 
            onUpdateData();
            toaster.create({
                description: "Added Comment",
                type: "success",
            })
        } catch (error) {
            toaster.create({
                description: "Failed to add Comment",
                type: "error",
            })
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault(); 
          handleAddComment();  
        }
    };

    return (
        <>
        <HStack marginTop={8}>
        <Field width="5/6" >
            <Input 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment here..."
                size="md"
                onKeyDown={handleKeyDown}
            />
        </Field>
        <Button
            width="1/6"
            colorScheme="teal"
            onClick={handleAddComment}
            disabled={!commentText}
        >
            Submit
        </Button>
        </HStack>

        <VStack spaceY={2} p={2} width="full" align="stretch">
            {comments.map(comment => (
                <CommentDisplay comment={comment} />
            ))}
        </VStack>
        </>
    )
}

export default ActivityDisplayCommentSection