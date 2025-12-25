export const formatTime = (dateString) => {
  const date = new Date(dateString);

  const datePart = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  const timePart = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${datePart} · ${timePart}`;
};
