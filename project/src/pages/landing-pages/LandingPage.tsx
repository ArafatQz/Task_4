import EventDetails from "./EventDetails";
import { useEffect } from "react";
import EventCard from "@/components/event-card";
import useEventStore from "@/stores/eventStore";
import Button from "@/components/button";
import { useNavigate, Routes, Route } from "react-router-dom";

const LandingPage = () => {
  const { events, loading, error, fetchEvents } = useEventStore();
  const navigate = useNavigate();
  const attendees = [
    { id: 1, name: 'nasser' },
    { id: 2, name: 'ahemd' }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleClick = (eventId: number) => {
    navigate(`/events/${eventId}`);
  };

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