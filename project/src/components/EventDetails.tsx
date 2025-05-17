import BuyTicketForm from "../pages/landing-pages/registerForm";


export interface Attendee {
  id: number;
  name: string;
  eventId: number;
}


export interface EventDetailsProps {
  id: number;
  name: string;
  dateTime: string;
  location: string;
  description: string;
  imageUrl: string;
  totalAttendees: number;
  attendees: Attendee[];
  onClick: () => void;
  handleClick: (eventId: number) => void;
}

const EventDetails = ({
  id,
  name,
  dateTime,
  location,
  description,
  imageUrl,
  onClick,
  totalAttendees,
  attendees,
  handleClick
}: EventDetailsProps) => {
    return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={imageUrl}
          alt={name}
          className="w-full md:w-64 h-48 object-cover rounded-md shadow-md"
        />
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
          <p className="text-gray-600 text-sm">{new Date(dateTime).toLocaleString()}</p>
          <p className="text-gray-600 text-sm">Location: {location}</p>
          <p className="text-gray-700 mt-2">{description}</p>
          <p className="text-gray-700 mt-2">Total Attendees: {totalAttendees}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="font-semibold text-gray-700">Attendees:</span>
            {attendees.length > 0 ? (
              attendees.map(a => (
                <span key={a.id} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{a.name}</span>
              ))
            ) : (
              <span className="text-gray-400">No attendees yet</span>
            )}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow"
            onClick={() => handleClick(id)}
          >
            Back to Events
          </button>
        </div>
      </div>
      <div className="mt-8">
        <BuyTicketForm onClick={onClick} eventId={id} />
      </div>
    </div>
  );
};

export default EventDetails;
