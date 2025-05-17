import React, { useState, useMemo } from 'react';
import useAttendeeStore from '@/stores/attendeeStore';
import useEventStore from '@/stores/eventStore';
import SortDropdown from '@/components/SortDropdown';
import AttendeeCard from '@/components/AttendeeCard';

const AttendeesDashboard: React.FC = () => {
  const attendees = useAttendeeStore((state) => state.attendees);
  const events = useEventStore((state) => state.events);
  const [sortBy, setSortBy] = useState('attendees-desc');

  const sortedEvents = useMemo(() => {
    const eventsCopy = [...attendees];
    switch (sortBy) {
      case 'date-asc':
        return eventsCopy.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'date-desc':
        return eventsCopy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'name-asc':
        return eventsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return eventsCopy.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return eventsCopy;
    }
  }, [attendees, sortBy]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent text-center mb-8">
          Attendees Dashboard
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          
            <div
              
              role="button"
              tabIndex={0}
              
              className="bg-white rounded-2xl shadow-md p-6 transform transition hover:scale-105 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <h3 className="text-lg font-medium text-gray-700 mb-2">Total Attendees</h3>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">{attendees.length}</div>
            </div>

           

            
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Attendees</h2>
        <div className="flex items-center justify-between mb-6">
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((attendee) => {
            const eventObj = events.find(e => String(e.id) === String(attendee.eventId));
            return (
              <AttendeeCard
                key={attendee.id}
                name={attendee.name}
                date={attendee.date}
                email={attendee.email}
                event={eventObj ? eventObj.name : 'Unknown Event'}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttendeesDashboard;
