import React, { useRef, useEffect, useState } from "react";
import {
    Box,
    Text,
    HStack,
    VStack, 
    IconButton
} from "@chakra-ui/react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Activity } from '../types';
import { formatDate } from "../helper/format_date";

interface UpcomingEventsProps {
    activities: Activity[];
}

const UpcomingEvents : React.FC<UpcomingEventsProps> = ({
    activities
  }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isScrollable, setIsScrollable] = useState(true); // To toggle arrow visibility

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollBy({
            left: -200,
            behavior: "smooth",
          });
        }
    };
    
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
            left: 200,
            behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        if (scrollContainerRef.current) {
          const scrollContainer = scrollContainerRef.current;
          const isContentOverflowing =
            scrollContainer.scrollWidth > scrollContainer.clientWidth;
          setIsScrollable(isContentOverflowing);
        }
      }, [activities]); // Run effect when activities change

    const filteredActivities = activities
        .filter((activity) => new Date(activity.start_date) > new Date()) // Only events after today
        .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()) // Sort by date
        .slice(0, 10); // Limit to 10 events

    return (
        <Box>
        <Text fontSize="xl" fontWeight="bold" color="teal.600" mb={0}>
            Upcoming Events
        </Text>

        <HStack>
            {isScrollable && <IconButton
            aria-label="Scroll Left"
            onClick={scrollLeft}
            color="teal.500"
            background="transparent"
            _hover={{ color: "teal.700" }}
            zIndex={1}>
                <FiArrowLeft />
            </IconButton>}

            <Box
                ref={scrollContainerRef} 
                overflowX="auto" py={4}
                css={{
                    // Hide scrollbar while keeping scrolling functional
                    scrollbarWidth: "none", // For Firefox
                    "-ms-overflow-style": "none", // For IE and Edge
                    "&::-webkit-scrollbar": {
                        display: "none", // For Chrome, Safari, and Edge
                    },
                }}
            >
            <HStack spaceX={-2} align="stretch" divideX="1px" divideColor="teal.500"
                transform={{base: "scale(0.75)", md: "scale(1)"}}
            >
                {filteredActivities.map((activity) => (
                    <Box
                        key={activity.activity_id}
                        minW="200px"
                        maxW="200px"
                        paddingX={4}
                        paddingY={4}
                    >
                        <VStack>
                        {/* Date */}
                        <Text fontSize="2xl" fontWeight="bold" color="white">
                            {formatDate(activity.start_date)}
                        </Text>

                        {/* Title with ellipses */}
                        <Text
                            fontSize="sm"
                            color="teal.500"
                            lineClamp="1"
                        >
                            {activity.title}
                        </Text>
                        </VStack>
                    </Box>
                    ))}
            </HStack>
            </Box>
            
            {isScrollable && <IconButton
            aria-label="Scroll Right"
            onClick={scrollRight}
            color="teal.500"
            background="transparent"
            _hover={{ color: "teal.700" }}
            zIndex={1}>
                <FiArrowRight />
            </IconButton>}
        </HStack>

        </Box>
    );
};
  

export default UpcomingEvents