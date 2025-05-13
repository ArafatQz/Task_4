import EventDetails from "./EventDetails";
import { useState, useEffect } from "react";
import EventCard from "@/components/event-card";
import useEventStore from "@/stores/eventStore";
import Button from "@/components/button";
import  useAttendeeStore  from "@/stores/attendeeStore";


const LandingPage = () => {
  const { events, loading, error, fetchEvents } = useEventStore();
  const [isClicked, setIsClicked] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const { attendees } = useAttendeeStore();
 
  console.log(attendees);
  console.log(events);

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleClick = (eventId: number) => {
    setSelectedEventId(eventId);
    setIsClicked(true);
  };

  if (isClicked) {
    const selectedEvent = events.find(e => e.id === selectedEventId);
    console.log(selectedEvent);
    return selectedEvent ? (
      <EventDetails
        name={selectedEvent.name}
        totalAttendees={attendees.filter(a => a.eventId === selectedEvent.id).length}
        attendees={attendees.filter(a => a.eventId === selectedEvent.id).map((a, idx) => ({ id: idx + 1, name: a.name, eventId: a.eventId }))}
        id={selectedEvent.id}
        dateTime={selectedEvent.date}
        imageUrl={selectedEvent.image_url}
        location={selectedEvent.location}
        description={selectedEvent.description}
        onClick={() => {
          setIsClicked(false);
          setSelectedEventId(null);
        }}
        handleClick={()=>handleClick}
      />
    ) : null;
  }

  if (loading) return <div className="text-center mt-10">Loading events...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <>
        <Button />
      <div className="flex justify-center gap-5 flex-wrap mt-10">
        {events.map(event => (
          <EventCard
            name={event.name}
            key={event.id}
            onClick={() => handleClick(event.id)}
            id={event.id}
            dateTime={event.date}
            location={event.location}
            imageUrl={event.image_url}
            totalAttendees={attendees.filter(a => a.eventId === event.id).length}
          />
        ))}
      </div>
    </>
  );
};

export default LandingPage