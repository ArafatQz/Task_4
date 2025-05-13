interface EventCardProps {
  id: number;
  name: string;
  dateTime: string;
  location: string;
  totalAttendees: number;
  imageUrl: string;
  onClick: () => void;
}

export default function EventCard({ id, name, dateTime, location, totalAttendees, imageUrl, onClick }: EventCardProps) {
  return (
    
    <div className="bg-white rounded-sm shadow-lg overflow-hidden flex flex-col w-80">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-medium mb-2 card-h2">{name}</h2>
        <p className="text-base text-gray-600 mb-2 card-date">{dateTime}</p>
        <p className="text-base text-gray-600 mb-2 card-location">{location}</p>
        <p className="text-[14px] text-gray-600 mb-2 card-attendee">
          Attendees: {totalAttendees}
        </p>

      </div>
      <button
        onClick={onClick}
        className="cursor-pointer hover:bg-blue-700 m-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md font-semibold"
      >
        View Details
      </button>
    </div>
  );
}
