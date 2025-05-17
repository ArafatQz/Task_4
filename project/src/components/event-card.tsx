import useEventStore from '@/stores/eventStore';
import { useMutation } from '@tanstack/react-query';
import { deleteEventApi } from '@/api/eventsApi';
import useUserStore from '@/stores/userStore';

interface EventCardProps {
  id: number;
  name: string;
  dateTime: string;
  location: string;
  totalAttendees: number;
  imageUrl: string;
  onClick: () => void;
}

export default function EventCard({ 
  id,
  name, 
  dateTime, 
  location, 
  totalAttendees, 
  imageUrl,
  onClick 
}: EventCardProps) {
  const ticketsAvailable = useEventStore(state => {
    const event = state.events.find(e => e.id === id);
    return event ? event.tickets_available : 0;
  });
  const fetchEvents = useEventStore(state => state.fetchEvents);
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteEventApi(id),
    onSuccess: () => {
      fetchEvents();
    },
  });
  const isAuthenticated = useUserStore(state => state.isAuthenticated);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="bg-white rounded-sm shadow-lg overflow-visible flex flex-col w-80 relative">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-medium mb-2 card-h2">{name}</h2>
        <p className="text-sm italic text-gray-600 mb-2 card-date">
          {new Date(dateTime).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
        <p className="text-base text-gray-600 mb-2 card-location">{location}</p>
        <p className="text-[14px] text-gray-600 mb-2 card-attendee">
          Attendees: {totalAttendees}
        </p>
        <p className="text-[14px] text-gray-600 mb-2 card-tickets">
          Tickets Available: {ticketsAvailable}
        </p>
      </div>
      <button
        onClick={onClick}
        className="cursor-pointer hover:bg-blue-700 m-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md font-semibold"
      >
        View Details
      </button>
      {isAuthenticated && (
        <button
          onClick={handleDelete}
          className="absolute -top-5 -right-5 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full text-lg font-bold shadow hover:bg-red-700 transition cursor-pointer z-[99999] border-2 border-white ring-2 ring-red-300"
          disabled={deleteMutation.status === 'pending'}
          title="Delete event"
          style={{ lineHeight: 1 }}
        >
          {deleteMutation.status === 'pending' ? '…' : '×'}
        </button>
      )}
    </div>
  );
}
