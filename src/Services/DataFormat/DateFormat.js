export function formatDateTime(dateTimeString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    const formattedDate = new Date(dateTimeString).toLocaleDateString(undefined, options);
    return formattedDate;
  }