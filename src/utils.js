export const getCurrentWeekNumber = (startDate) => {
  const currentDate = new Date();

  // Ensure both dates are set to the same time (start of the day)
  startDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  // Calculate the difference in days between the current date and the start date
  const daysDifference = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));

  // Calculate the number of weeks since the start date
  const weeksSinceStart = Math.floor(daysDifference / 7);

  // Determine if it's "Week 1" or "Week 2"
  return weeksSinceStart % 2 === 0 ? "week1" : "week2";
};

export const weeklyEvent = {
  week1: [
    { name: "Sonic", day: 1, time: "18:00", duration: 30 },
    { name: "DOA", day: 2, time: "1:00", duration: 20 },
    { name: "Party", day: 2, time: "1:20", duration: 20 },
    { name: "DOA", day: 4, time: "18:00", duration: 20 },
    { name: "Party", day: 4, time: "18:20", duration: 20 },
    { name: "Sonic", day: 5, time: "1:00", duration: 30 },
    { name: "Water Event'", day: 5, time: "15:00", duration: 60 },
  ],
  week2: [
    { name: "Sonic", day: 1, time: "18:00", duration: 30 },
    { name: "DR", day: 2, time: "1:00", duration: 60 },
    { name: "Party", day: 2, time: "1:00", duration: 20 },
    { name: "DR", day: 4, time: "18:00", duration: 60 },
    { name: "Party", day: 4, time: "18:20", duration: 20 },
    { name: "Sonic", day: 5, time: "1:00", duration: 30 },
    { name: "Water Event'", day: 5, time: "15:00", duration: 60 },
  ]
}

export const getNextThreeEvents = (startDate) => {
  const currentWeek = getCurrentWeekNumber(startDate);
  const weekKey = currentWeek === "week1" ? "week1" : "week2";

  const currentTime = new Date(); // Current time in UTC
  const currentDay = currentTime.getUTCDay() || 7; // Adjust Sunday (0) to 7

  // Get events for the current week
  const events = weeklyEvent[weekKey];

  const formattedEvents = events.map((event) => {
    const [hours, minutes] = event.time.split(":").map(Number);

    // Calculate event start time
    const eventStart = new Date(currentTime);
    eventStart.setUTCDate(currentTime.getUTCDate() + (event.day - currentDay));
    eventStart.setUTCHours(hours, minutes, 0, 0);

    // If the calculated event start time is in the past, move it to the next week
    if (eventStart < currentTime) {
      eventStart.setUTCDate(eventStart.getUTCDate() + 7);
    }

    // Calculate event end time
    const eventEnd = new Date(eventStart);
    eventEnd.setMinutes(eventEnd.getMinutes() + event.duration);

    // Calculate remaining time in milliseconds
    const timeLeftMs = eventStart - currentTime;

    return {
      ...event,
      eventStart,
      eventEnd,
      ongoing: currentTime >= eventStart && currentTime <= eventEnd,
      timeLeftMs, // Pass raw milliseconds
    };
  });

  // Filter upcoming events and sort by proximity
  const upcomingEvents = formattedEvents
    .filter((event) => event.ongoing || event.eventStart >= currentTime) // Include ongoing and future events
    .sort((a, b) => a.eventStart - b.eventStart)
    .slice(0, 3);

  return upcomingEvents;
};