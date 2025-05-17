import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useEventStore from '@/stores/eventStore';
import EventCard from '@/components/event-card';
import SortDropdown from '@/components/SortDropdown';
import CreateNewEventButton from '@/components/CreateNewEventButton';

const CardsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { events, upcomingEvents, pastEvents } = useEventStore();
  const [sortBy, setSortBy] = useState('date-desc');

  const sortedEvents = useMemo(() => {
    const eventsCopy = [...events];
    switch (sortBy) {
      case 'date-asc':
        return eventsCopy.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'date-desc':
        return eventsCopy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'attendees-asc':
        return eventsCopy.sort((a, b) => a.totalAttendees - b.totalAttendees);
      case 'attendees-desc':
        return eventsCopy.sort((a, b) => b.totalAttendees - a.totalAttendees);
      case 'name-asc':
        return eventsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return eventsCopy.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return eventsCopy;
    }
  }, [events, sortBy]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent text-center mb-8">
          Dashboard
        </h1>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          
            <div
              
              role="button"
              tabIndex={0}
              
              className="bg-white rounded-2xl shadow-md p-6 transform transition hover:scale-105 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <h3 className="text-lg font-medium text-gray-700 mb-2">Total Events</h3>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">{events.length}</div>
            </div>

            <div
              
              role="button"
              tabIndex={0}
         
              className="bg-white rounded-2xl shadow-md p-6 transform transition hover:scale-105 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <h3 className="text-lg font-medium text-gray-700 mb-2">Upcoming Events</h3>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">{upcomingEvents.length}</div>
            </div>

            <div
              
              role="button"
              tabIndex={0}
             
              
              className="bg-white rounded-2xl shadow-md p-6 transform transition hover:scale-105 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <h3 className="text-lg font-medium text-gray-700 mb-2">Ended Events</h3>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">{pastEvents.length}</div>
            </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Events</h2>
        <div className="flex items-center justify-between mb-6">
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          <CreateNewEventButton onClick={() => navigate('/components/CreateEvent')} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              name={event.name}
              dateTime={event.date}
              location={event.location}
              totalAttendees={event.totalAttendees}
              imageUrl={event.image_url}
              onClick={() => navigate(`/components/UpdateEvent/${event.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsDashboard;
