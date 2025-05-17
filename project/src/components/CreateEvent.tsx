import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useEventStore from '@/stores/eventStore';
import axios from 'axios';

const initialForm = {
  name: '',
  date: '',
  location: '',
  description: '',
  image_url: '',
  tickets_available: 0,
};

export default function CreateEvent() {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const addEventToStore = useEventStore(state => state.fetchEvents); // refetch events after adding

  // React Query mutation for creating event
  const mutation = useMutation({
    mutationFn: async (data: typeof form) => {
      // Generate a random string id (json-server will allow string or number)
      const eventToSend = { ...data, id: Date.now().toString() };
      const response = await axios.post('http://localhost:3000/events', eventToSend);
      return response.data;
    },
    onSuccess: async () => {
      setSuccess(true);
      await addEventToStore(); // refetch events
      setTimeout(() => {
        setSuccess(false);
        navigate(-1); // Go back to dashboard
      }, 1200);
    },
    onError: () => {
      setError('Failed to create event!');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'tickets_available' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    mutation.mutate(form);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Create New Event</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Date & Time</span>
            <input
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Location</span>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              rows={4}
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Event Image (local file)</span>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setForm(prev => ({
                    ...prev,
                    image_url: `${files[0].name}`
                  }));
                }
              }}
              className="border rounded px-3 py-2"
            />
            <span className="text-xs text-gray-500 mt-1">Place your image manually in the <b>images</b> folder at the project root. Only the file name will be saved.</span>
            {form.image_url && (
              <span className="text-xs text-green-600 mt-1">Image path to be saved: <b>{form.image_url}</b></span>
            )}
          </label>
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Tickets Available</span>
            <input
              type="number"
              name="tickets_available"
              value={form.tickets_available}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              min={0}
              required
            />
          </label>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={mutation.status === 'pending'}
          >
            {mutation.status === 'pending' ? 'Creating...' : 'Create Event'}
          </button>
          {success && <div className="text-green-600 font-semibold mt-2 text-center">Event created!</div>}
          {error && <div className="text-red-600 font-semibold mt-2 text-center">{error}</div>}
        </form>
      </div>
    </div>
  );
}
