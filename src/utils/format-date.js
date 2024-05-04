import { formatInTimeZone, format } from "date-fns-tz";

const formatDate = (date) => {
  const newDate = new Date(date);

  return formatInTimeZone(newDate, "Asia/Ho_Chi_Minh", "yyyy-MM-dd");
};

const formatReviewDate = (date) => {
  const newDate = new Date(date);

  return formatInTimeZone(newDate, "Asia/Ho_Chi_Minh", "MMMM dd, yyyy");
};

export { formatDate, formatReviewDate };
