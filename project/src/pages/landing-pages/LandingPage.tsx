import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import EventCard from "@/components/event-card";
import useEventStore, { type Event } from "@/stores/eventStore";
import Button from "@/components/button";
import useAttendeeStore, { type Attendee } from "@/stores/attendeeStore";
import EventDetails from "./EventDetails";

const LandingPage = () => {
  const { fetchEvents } = useEventStore();
  const { data: events, isLoading, isError, error } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: () => fetchEvents()
  });

  const [isClicked, setIsClicked] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const { attendees } = useAttendeeStore();

  const handleClick = (eventId: number) => {
    setSelectedEventId(eventId);
    setIsClicked(true);
  };

  if (isClicked && selectedEventId != null && events) {
    const selectedEvent = events.find(e => e.id === selectedEventId);
    const attendeesForThisEvent = attendees
      .filter((a: Attendee) => a.eventId === selectedEventId)
      .map((a: Attendee, idx: number) => ({
        id: idx + 1,
        name: a.name,
        eventId: a.eventId
      }));

    if (selectedEvent) {
      return (
        <EventDetails
          id={selectedEvent.id}
          name={selectedEvent.name}
          dateTime={selectedEvent.date}
          imageUrl={selectedEvent.image_url}
          location={selectedEvent.location}
          description={selectedEvent.description}
          totalAttendees={attendeesForThisEvent.length}
          attendees={attendeesForThisEvent}
          onClick={() => {
            setIsClicked(false);
            setSelectedEventId(null);
          }}
          handleClick={() => {}} // Required by EventDetailsProps
        />
      );
    }
  }

  if (isLoading) return <div className="text-center mt-10">Loading events…</div>;
  if (isError)  return <div className="text-center mt-10 text-red-500">Error: {error.message}</div>;

  return (
    <>
      <Button />
      <div className="flex justify-center gap-5 flex-wrap mt-10">
        {(events || []).map((event: Event) => (
          <EventCard
            key={event.id}
            id={event.id}
            name={event.name}
            dateTime={event.date}
            location={event.location}
            imageUrl={event.image_url}
            description={event.description}
            totalAttendees={attendees.filter((a: Attendee) => a.eventId === event.id).length}
            onClick={() => handleClick(event.id)}
          />
        ))}
      </div>
    </>
  );
};

export default LandingPage;
