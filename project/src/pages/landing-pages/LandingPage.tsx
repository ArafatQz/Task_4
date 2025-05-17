import { useState, useMemo, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import EventCard from "@/components/event-card";
import SortDropdown from "@/components/SortDropdown";
import useEventStore, { type Event } from "@/stores/eventStore";
import Button from "@/components/button";
import useAttendeeStore, { type Attendee } from "@/stores/attendeeStore";
import EventDetails from "@/components/EventDetails";

const LandingPage = () => {
  const { fetchEvents } = useEventStore();
  const { data: events, isLoading, isError, error } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: () => fetchEvents()
  });

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('date-asc');

  const { attendees } = useAttendeeStore();

  const handleClick = (eventId: number) => {
    console.log('Clicked event id:', eventId);
    setSelectedEventId(eventId);
    setIsClicked(true);
  };

  // Reset event details view if the selected event was deleted
  useEffect(() => {
    if (isClicked && selectedEventId != null && events) {
      const stillExists = events.some(e => e.id === selectedEventId);
      if (!stillExists) {
        setIsClicked(false);
        setSelectedEventId(null);
      }
    }
  }, [events, isClicked, selectedEventId]);

  let eventDetailsJSX = null;
  if (isClicked && selectedEventId != null && events) {
    const selectedEvent = events.find(e => e.id === selectedEventId);
    console.log('Selected event:', selectedEvent);
    const attendeesForThisEvent = attendees
      .filter((a: Attendee) => a.eventId === selectedEventId)
      .map((a: Attendee, idx: number) => ({
        id: idx + 1,
        name: a.name,
        eventId: a.eventId
      }));

    if (selectedEvent) {
      eventDetailsJSX = (
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
          handleClick={() => {
            setIsClicked(false);
            setSelectedEventId(null);
          }}
        />
      );
    }
  }

  const sortedEvents = useMemo(() => {
    if (!events) return [];
    return [...events].sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'attendees-asc':
          return attendees.filter(at => at.eventId === a.id).length - attendees.filter(at => at.eventId === b.id).length;
        case 'attendees-desc':
          return attendees.filter(at => at.eventId === b.id).length - attendees.filter(at => at.eventId === a.id).length;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [events, sortBy, attendees]);

  return (
    <>
      {isLoading ? (
        <div className="text-center mt-10">Loading events…</div>
      ) : isError ? (
        <div className="text-center mt-10 text-red-500">Error: {error.message}</div>
      ) : (
        eventDetailsJSX ? (
          eventDetailsJSX
        ) : (
          <>
            <div className="w-full px-10 mt-8 mb-6 flex items-center">
              <div className="w-1/3">
              </div>
              <div className="w-1/3 flex justify-center">
                <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  Event Horizon
                </h1>
              </div>
              <div className="w-1/3 flex justify-end">
                <Button/>
              </div>
            </div>
            <div className="px-10 mt-6 flex justify-end">
              <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
            </div>
            <div className="flex justify-center gap-5 flex-wrap mt-4 px-10">
              {sortedEvents.map((event: Event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  name={event.name}
                  dateTime={event.date}
                  location={event.location}
                  totalAttendees={attendees.filter(a => a.eventId === event.id).length}
                  imageUrl={event.image_url}

                  onClick={() => handleClick(event.id)}
                />
              ))}
            </div>
          </>
        )
      )}
    </>
  );
};

export default LandingPage;
