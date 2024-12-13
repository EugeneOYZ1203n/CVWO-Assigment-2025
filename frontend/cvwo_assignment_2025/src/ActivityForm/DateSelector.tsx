import DatePicker from "react-datepicker";
import './DateSelector.css'
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import { Input, Box } from "@chakra-ui/react";

const DateSelector = ({ selectedDate, setSelectedDate }: { selectedDate: string; setSelectedDate: (date: string) => void }) => {
  return (
    <Box width="full">
      <DatePicker
        selected={new Date(selectedDate)}
        onChange={(date) => setSelectedDate(date!.toISOString())}
        customInput={
          <Input
            placeholder="Select date"
            size="md"
            width="full"
            focusRingColor="gray.400"
          />
        }
        dateFormat="dd MMM YY"
        showPopperArrow={false}
      />
    </Box>
  );
};

export default DateSelector;