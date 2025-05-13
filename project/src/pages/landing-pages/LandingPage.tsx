import EventDetails from "./EventDetails";
import { useState, useEffect } from "react";
import EventCard from "@/components/event-card";
import useEventStore from "@/stores/eventStore";
import Button from "@/components/button";

const LandingPage = () => {
  const { events, loading, error, fetchEvents } = useEventStore();
  const [isClicked, setIsClicked] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [attendees, setAttendee] = useState([{name:'nasser', email:'nasser.com'}, { name: 'ahemd', email: 'ahmed.com'}]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleClick = (eventId: number) => {
    setSelectedEventId(eventId);
    setIsClicked(true);
  };

  if (isClicked) {
    const selectedEvent = events.find(e => e.id === selectedEventId);
    return selectedEvent ? (
      <EventDetails
        totalAttendees={attendees.length}
        attendees={attendees.map((a, id) => ({ id: id + 1, name: a.name }))}
        id={selectedEvent.id}
        title={selectedEvent.name}
        dateTime={selectedEvent.date}
        imageUrl={selectedEvent.image_url}
        location={selectedEvent.location}
        description={selectedEvent.description}
        onClick={() => {
          setIsClicked(false);
          setSelectedEventId(null);
        }}
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
            totalAttendees={attendees.length}
            
          />
        ))}
      </div>
    </>
  );
};

export default LandingPage