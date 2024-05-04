import { formatInTimeZone } from "date-fns-tz";

const formatDate = (date) => {
  if (!(date instanceof Date)) {
    // Handle invalid input
    return ""; // Or throw an error, depending on your requirements
  }
  return formatInTimeZone(date, "Asia/Ho_Chi_Minh", "yyyy-MM-dd");
};

export default formatDate;
