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
  Grid, 
  GridItem, 
  HStack, 
  IconButton, 
  Input, 
  NumberInput, 
  SelectContent, 
  SelectItem, 
  SelectRoot, 
  SelectTrigger, 
  SelectValueText, 
  SimpleGrid, 
  Spacer, 
  Text,
  Textarea,
  VStack, 
  chakra, 
  useRecipe
} from "@chakra-ui/react";
import AutoResize from "react-textarea-autosize"
import { Activity } from "../types";
import { useState } from "react";
import { Field } from "../components/ui/field";
import { NumberInputField, NumberInputRoot } from "../components/ui/number-input";
import { category_types, status_types } from "../helper/mapTables";
import DateSelector from "./DateSelector";
import { toaster } from "../components/ui/toaster";
import { createActivity } from "../api/createActivity";
import { updateActivity } from "../api/updateActivity";

interface ActivityFormProps {
    activity: Activity;
    onClose: () => void;
    onUpdateData: () => void;
    user_id: number; // The ID of the logged-in user
}

const StyledAutoResize = chakra(AutoResize)

const ActivityForm : React.FC<ActivityFormProps> = ({
  activity,
  onClose, 
  onUpdateData,
  user_id
}) => {
  const isEdit = activity != null;

  const [title, setTitle] = useState<string>(isEdit ? activity.title : "");
  const [description, setDescription] = useState<string>(isEdit ? activity.description : "");
  const [startDate, setStartDate] = useState<string>(isEdit ? new Date(activity.start_date).toISOString() : new Date().toISOString());
  const [endDate, setEndDate] = useState<string>(isEdit ? new Date(activity.end_date).toISOString() : new Date().toISOString());
  const [category, setCategory] = useState<string>(isEdit ? activity.category : "Others");
  const [status, setStatus] = useState<string>(isEdit ? activity.status : "Planning");
  const [location, setLocation] = useState<string>(isEdit ? activity.location : "");
  const [maxParticipants, setMaxParticipants] = useState<number>(isEdit ? activity.max_participants : 5);

  const recipe = useRecipe({ key: "textarea" })
  const styles = recipe({ size: "sm" })

  const isValidTitle = title != "" && title.length < 100
  const isValidDescription = description != "" && description.trim().split(/\s+/).length < 1000
  const isValidDates = new Date(endDate).getTime() >= new Date(startDate).getTime()
  const isValidLocation = location != ""
  const isValidMaxParticipants = maxParticipants > 0 && maxParticipants <= 50

  const handleSubmission = () => {
    if (!(isValidTitle && isValidDescription && isValidDates &&
      isValidLocation && isValidMaxParticipants)) { return; }

    const newActivity : Activity = {
      activity_id: isEdit ? activity.activity_id : 0,
      title: title,
      description: description,
      category: category,
      start_date: startDate, 
      end_date: endDate, 
      location: location,
      max_participants: maxParticipants,
      status: status,
      created_at: "",
      updated_at: "",
      participant_count: 0,
    }

    if (isEdit) {
      handleUpdateActivity(newActivity)
    } else {
      handleCreateActivity(newActivity)
    }
    onUpdateData()
  }

  const handleCreateActivity = async (newActivity:Activity) => {
    try {
      await createActivity(newActivity, user_id) 
      onClose()
      toaster.create({
          description: `Created ${newActivity.title}`,
          type: "success",
      })
    } catch (error) {
      toaster.create({
          description: `Failed to create ${newActivity.title}`,
          type: "error",
      })
    }
  }

  const handleUpdateActivity = async (newActivity:Activity) => {
    try {
      await updateActivity(newActivity) 
      onClose()
      toaster.create({
          description: `Updated ${newActivity.title}`,
          type: "success",
      })
    } catch (error) {
      toaster.create({
          description: `Failed to update ${newActivity.title}`,
          type: "error",
      })
    }
  }
  
  return (
    <>
    <DialogRoot open={true} size="xl">
      <DialogBackdrop />
      <DialogContent colorScheme="teal" 
        overflow="auto" maxH="80vh" 
        css={{
          // Hide scrollbar while keeping scrolling functional
          scrollbarWidth: "none", // For Firefox
          "-ms-overflow-style": "none", // For IE and Edge
          "&::-webkit-scrollbar": {
              display: "none", // For Chrome, Safari, and Edge
          },
      }}>
        <DialogHeader>
          <Text fontSize="2xl" fontWeight="bold" color="teal.500">{isEdit ? "Edit Activity" : "Add activity"}</Text>
        </DialogHeader>
 
        <DialogBody>
          <VStack spaceY={2}>
          <Field label="Title" 
            invalid={!isValidTitle} 
            errorText={title ? "Title should be less than 100 characters!" : "Title cannot be empty!"}>
            <Input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title goes here"
                size="md"
            />
          </Field>

          <Field label="Description" 
            invalid={!isValidDescription} 
            errorText={description ? "Description should be less than 1000 words!" : "Description cannot be empty!"}>
            <StyledAutoResize
              placeholder="Description goes here"
              minH="initial"
              resize="none"
              overflow="hidden"
              lineHeight="inherit"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              css={styles}
            />
          </Field>

          <SimpleGrid columns={3} gap={2} width="full">
          <Field label="Start Date">
            <DateSelector 
              selectedDate={startDate}
              setSelectedDate={setStartDate}
            />
          </Field>

          <Field label="End Date" 
            invalid={!isValidDates} 
            errorText="End Date should be after Start Date">
            <DateSelector 
              selectedDate={endDate}
              setSelectedDate={setEndDate}
            />
          </Field>

          <Field label="Location"
            invalid={!location} errorText="Location cannot be empty!"
          >
            <Input 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location goes here"
                size="md"
            />
          </Field>

          <Field label="Max Participants">
            <NumberInputRoot 
              defaultValue="4" 
              min={1} max={50}
              value={maxParticipants.toString()}
              onValueChange={(e) => setMaxParticipants(Number(e.value))}
              width="full"
            >
              <NumberInputField/>
            </NumberInputRoot>
          </Field>

          <Field label="Categories">
            <SelectRoot 
                value={[category]}
                onValueChange={(e) => setCategory(e.value[0])}
                collection={category_types} size="sm" 
            >
                <SelectTrigger>
                    <SelectValueText placeholder="Categories" />
                </SelectTrigger>
                <SelectContent position="absolute">
                    {category_types.items.map((type) => (
                    <SelectItem item={type} key={type.value}>
                        {type.label}
                    </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>
          </Field>

          <Field label="Status">
            <SelectRoot 
                value={[status]}
                onValueChange={(e) => setStatus(e.value[0])}
                collection={status_types} size="sm" 
            >
                <SelectTrigger>
                    <SelectValueText placeholder="Status" />
                </SelectTrigger>
                <SelectContent position="absolute">
                    {status_types.items.map((type) => (
                    <SelectItem item={type} key={type.value}>
                        {type.label}
                    </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>
          </Field>

          </SimpleGrid>

          </VStack>
        </DialogBody>

        <DialogFooter>
        <DialogActionTrigger asChild>
          <Button variant="subtle" colorPalette="teal" 
            disabled = {!(isValidTitle && isValidDescription && isValidDates &&
              isValidLocation && isValidMaxParticipants)}
            width="20%" onClick={handleSubmission}>Submit</Button>
        </DialogActionTrigger>
        <DialogActionTrigger asChild>
          <Button variant="outline" onClick={onClose}>Exit</Button>
        </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
    </>
  )
}

export default ActivityForm