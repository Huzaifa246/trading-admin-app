export function formatDateTime(dateTimeString, timeZone) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: timeZone
  };
  
  // Create a Date object using the provided date string
  const inputDate = new Date(dateTimeString);
  
  // Get the UTC timestamp in milliseconds
  const utcTimestamp = inputDate.getTime();
  
  // Get the local timestamp in the specified time zone
  const localTimestamp = utcTimestamp + (inputDate.getTimezoneOffset() * 60 * 1000);
  
  // Create a new Date object using the adjusted local timestamp
  const localDate = new Date(localTimestamp);
  
  // Format the local date using the specified options
  const formattedDate = localDate.toLocaleDateString(undefined, options);
  
  return formattedDate;
}
