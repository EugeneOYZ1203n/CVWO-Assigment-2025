import { createListCollection } from "@chakra-ui/react";

export const categoryMap: Map<string, string> = new Map([
    ["Sports and Exercise", "red"] ,
    ["Outdoor Adventures", "green"] ,
    ["Shows and Movies", "blue"] ,
    ["Creative Workshops", "purple"] ,
    ["Museums and Culture", "yellow"] ,
    ["Social and Group Games", "orange"],
    ["Work and Study", "cyan"] ,
    ["Others", "gray"] 
]);

export const sort_types = createListCollection({
    items: [
        { label: "Start Date", value: "start_date" },
        { label: "Create Date", value: "created_at" },
        { label: "Updated Date", value: "updated_at" },
        { label: "Status", value: "status" },
    ],
})

export const statusMap: Map<string, number> = new Map([
    ["Planning", 1],
    ["Finalizing", 2],
    ["Confirmed", 3],
    ["Completed", 4]
]);

export const category_types = createListCollection({
    items: [
        { label: "Sports and Exercise", value: "Sports and Exercise" },
        { label: "Outdoor Adventures", value: "Outdoor Adventures" },
        { label: "Shows and Movies", value: "Shows and Movies" },
        { label: "Creative Workshops", value: "Creative Workshops" },
        { label: "Museums and Culture", value: "Museums and Culture" },
        { label: "Social and Group Games", value: "Social and Group Games" },
        { label: "Work and Study", value: "Work and Study" },
        { label: "Others", value: "Others" },
    ],
})