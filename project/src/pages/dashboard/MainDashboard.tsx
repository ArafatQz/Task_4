
import useEventStore from '@/stores/eventStore';
import useAttendeeStore from '@/stores/attendeeStore';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const events = useEventStore((state) => state.events);
  const attendees = useAttendeeStore((state) => state.attendees);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent text-center mb-20">
          Dashboard
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Total Events Card */}
          <div
            className="block bg-white rounded-2xl shadow-lg border border-indigo-100 p-8 transform transition hover:scale-105 cursor-pointer"
            onClick={() => navigate('/dashboard/cards')}
            role="button"
            tabIndex={0}
            >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Total Events</h2>
            <div className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              {events.length}
            </div>
          </div>

          {/* Total Attenders Card */}
          <div
            className="block bg-white rounded-2xl shadow-lg border border-indigo-100 p-8 transform transition hover:scale-105 cursor-pointer"
            onClick={() => navigate('/dashboard/attendees')}
            role="button"
            tabIndex={0}
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Total Attenders</h2>
            <div className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              {attendees.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}