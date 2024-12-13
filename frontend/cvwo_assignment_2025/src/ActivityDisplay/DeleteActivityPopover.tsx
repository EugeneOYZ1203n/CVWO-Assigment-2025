import { useState } from "react"
import {
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTrigger,
  } from "../components/ui/popover"
import { Button, IconButton, Text } from "@chakra-ui/react"
import { FiTrash } from "react-icons/fi"
import { deleteActivity } from "../api/deleteActivity"
import { Activity } from "../types"
import { toaster } from "../components/ui/toaster"

interface DeleteActivityPopoverProps {
    activity: Activity;
    onClose: () => void;
}

const DeleteActivityPopover : React.FC<DeleteActivityPopoverProps> = ({
    activity,
    onClose
}) => {
    const [open, setOpen] = useState<boolean>(false)

    const handleDeleteActivity = async () => {
        try {
            await deleteActivity(activity.activity_id) 
            onClose()
            toaster.create({
                description: `Deleted ${activity.title}`,
                type: "success",
            })
        } catch (error) {
            toaster.create({
                description: `Failed to delete ${activity.title}`,
                type: "error",
            })
        }
    }

    return (
        <PopoverRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
            <PopoverTrigger>
                <IconButton 
                    variant="outline"
                    colorPalette="teal"><FiTrash /></IconButton>
            </PopoverTrigger>
            <PopoverContent width="160px">
                <PopoverArrow />
                <PopoverBody>
                    <Text textAlign="center" fontSize="md">Are you sure?</Text>
                    <Button 
                        width="full"
                        marginTop={2}
                        onClick={handleDeleteActivity}
                    >
                        Delete
                    </Button>
                </PopoverBody>
            </PopoverContent>
        </PopoverRoot>
    )
}

export default DeleteActivityPopover