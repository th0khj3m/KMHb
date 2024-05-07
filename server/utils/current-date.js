import { addHours, format } from "date-fns";

// Function to get the current time in a specific time zone and format it
const getCurrentTime = () => {
  // Get the current time
  const currentTime = new Date();

  // Add 1 hour (3600000 milliseconds) to the current time
  const futureTime = addHours(currentTime, 1);

  // Format the future time according to the specified options
  return format(futureTime, "yyyy-MM-dd HH:mm:ss", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
};

export default getCurrentTime;
