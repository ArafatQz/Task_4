import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useAttendeeStore from '@/stores/attendeeStore';




export default function BuyTicketForm({onClick, eventId}: {onClick: () => void, eventId: number}) {

const schema = z.object({
  name: z.string().min(1, 'Name is required').regex(/^[A-Za-z]+$/, 'Name must contain only alphabetic characters'),
  email: z.string().email('Invalid email address'),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});
const [tickets, setTickets] = useState({name: '', quantity: 1});
const { addAttendee, attendees } = useAttendeeStore();

  console.log(attendees);
  const handleIncrement = () => setTickets(t => ({...t, quantity: t.quantity + 1}));
  
  const handleDecrement = () => setTickets(t => ({...t, quantity: t.quantity > 1 ? t.quantity - 1 : t.quantity}));


  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Buy Ticket
        </h2>
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
          Back to Event
        </button>
        <form onSubmit={handleSubmit((data) => {
    addAttendee({ id: Date.now(), name: data.name, email: data.email, eventId: eventId, ticketQuantity: tickets.quantity, date: new Date().toLocaleDateString() });
    onClick();
  })}>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { required: true })}
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: true })}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          {/* Tickets selector */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">
              Tickets
            </label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleDecrement}
                className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
              >
                −
              </button>
              <input
                type="number"
                value={tickets.quantity}
                readOnly
                className="w-16 text-center px-2 py-1 border rounded-lg focus:outline-none"
              />
              <button
                type="button"
                onClick={handleIncrement}
                className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Approve button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition"
            >
              Approve
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
