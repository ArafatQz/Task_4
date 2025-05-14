import BuyTicketForm from "./registerForm";
import { useState } from 'react';


export interface Attendee {
  id: number;
  name: string;
  eventId: number;
}

import useEventStore from '@/stores/eventStore';

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
}: EventDetailsProps) => {
  const ticketsAvailable = useEventStore(state => {
    const event = state.events.find(e => e.id === id);
    return event ? event.tickets_available : 0;
  });
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div>
      {isClicked ? (
        <BuyTicketForm eventId={id} onClick={() => setIsClicked(false)} />
      ) : (
        <div className="bg-gray-100 text-gray-800 min-h-screen p-6">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={onClick}
              className="inline-flex items-center mb-6 text-indigo-600 hover:text-indigo-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Events
            </button>
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-3xl font-bold mb-4">{name}</h1>
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <h2 className="text-gray-600 uppercase tracking-wide text-sm mb-1">
                    Date &amp; Time
                  </h2>
                  <p className="text-lg">{dateTime}</p>
                </div>
                <div>
                  <h2 className="text-gray-600 uppercase tracking-wide text-sm mb-1">
                    Location
                  </h2>
                  <p className="text-lg">{location}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">{description}</p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div>
                  <p className="text-gray-600">
                    Total Attendees: <span className="font-semibold">{totalAttendees}</span>
                  </p>
                  <p className="text-gray-600">
                    Tickets Available: <span className="font-semibold">{ticketsAvailable}</span>
                  </p>
                </div>
                <button
                  onClick={() => setIsClicked(true)}
                  className="mt-4 sm:mt-0 inline-block px-6 py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700"
                >
                  Register Now
                </button>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Attendees</h2>
                <ul className="space-y-2">
                  {attendees.filter(a => a.eventId === id).map(({ id, name }) => (
                    <li
                      key={id}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetails;