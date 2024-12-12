import React, { useState, useEffect } from "react";
import { Input, VStack, Box, SelectRoot, SelectValueText, SelectTrigger, SelectContent, SelectItem, createListCollection, HStack } from "@chakra-ui/react";
import { Activity } from "../types"; // Replace with your actual activity type

interface SearchBarProps {
    activities: Activity[];
    setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
}

const sort_types = createListCollection({
    items: [
        { label: "Start Date", value: "start_date" },
        { label: "Create Date", value: "created_at" },
        { label: "Updated Date", value: "updated_at" },
        { label: "Status", value: "status" },
    ],
})

const statusMap: Map<string, number> = new Map([
    ["Planning", 1],
    ["Finalizing", 2],
    ["Confirmed", 3],
    ["Completed", 4]
]);

const category_types = createListCollection({
    items: [
        { label: "Sports and Exercise", value: "Sports and Exercise" },
        { label: "Outdoor Adventures", value: "Outdoor Adventures" },
        { label: "Shows and Movies", value: "Shows and Movies" },
        { label: "Creative Workshops", value: "Creative Workshops" },
        { label: "Museums and Culture", value: "Museums and Culture" },
        { label: "Social and Group Games", value: "Social and Group Games" },
    ],
})

const SearchBar : React.FC<SearchBarProps> = ({
    activities, 
    setActivities
}) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("start_date");
    const [categories, setCategories] = useState<string[]>([])
  
    // Filter and sort activities based on search and sort options
    const handleSearch = () => {
        let filteredActivities = activities.filter((activity) =>
            activity.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (categories.length > 0) {
            filteredActivities = filteredActivities.filter((activity) => 
                categories.includes(activity.category)
            )
        }
  
        // Sorting based on selected criteria
        filteredActivities = filteredActivities.sort((a, b) => {
            if (sortBy === "start_date") {
                return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
            } else if (sortBy === "created_at") {
                return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
            } else if (sortBy === "updated_at") {
                return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
            } else if (sortBy === "status") {
                return (statusMap.get(a.status) ?? 0) - (statusMap.get(b.status) ?? 0);
            }
            return 0;
        });
  
        setActivities(filteredActivities); // Update the activities in the parent
    };
  
    useEffect(() => {
        handleSearch();
    }, [searchQuery, sortBy, categories, activities]); // Trigger search when activities, query, or sort change
  
    return (
      <Box width="full" p={4} borderRadius="md">
        <VStack align="center">
            <Input
                placeholder="Search activities"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="md"
                width="80%"
                borderColor="teal.500"
                _hover={{ borderColor: "teal.700" }}
            />
            
            <HStack align="stretch" width="80%">
            <Box width="1/4">
            <SelectRoot 
                value={[sortBy]}
                onValueChange={(e) => setSortBy(e.value[0])}
                collection={sort_types} size="sm"
            >
                <SelectTrigger>
                    <SelectValueText placeholder="Start Date" />
                </SelectTrigger>
                <SelectContent position="absolute">
                    {sort_types.items.map((type) => (
                    <SelectItem item={type} key={type.value}>
                        {type.label}
                    </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>
            </Box>

            <Box width="3/4">
            <SelectRoot 
                value={categories}
                onValueChange={(e) => setCategories(e.value)}
                collection={category_types} size="sm" 
                multiple
            >
                <SelectTrigger>
                    <SelectValueText placeholder="Filter categories" />
                </SelectTrigger>
                <SelectContent position="absolute">
                    {category_types.items.map((type) => (
                    <SelectItem item={type} key={type.value}>
                        {type.label}
                    </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>
            </Box>
            </HStack>
        </VStack>
      </Box>
    );
  };

export default SearchBar