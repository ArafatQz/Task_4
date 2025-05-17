import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { updateEventApi } from '@/api/eventsApi';
import useEventStore from '@/stores/eventStore';

const UpdateEvent = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const eventId = id;
    const events = useEventStore(state => state.events);
    const fetchEvents = useEventStore(state => state.fetchEvents);
    const loading = useEventStore(state => state.loading);
    // Find event by matching string representations of IDs
    const event = events.find(e => String(e.id) === String(eventId));
    const updateEvent = useEventStore(state => state.updateEvent);

    // Debug logs
    useEffect(() => {
        console.log('Events:', events);
        console.log('eventId:', eventId);
        const found = events.find(e => String(e.id) === String(eventId));
        console.log('Found event:', found);
    }, [events, eventId]);

    const [form, setForm] = useState({
        name: '',
        date: '',
        location: '',
        description: '',
        image_url: '',
        tickets_available: 0,
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // React Query mutation for updating event
    const mutation = useMutation({
        mutationFn: (data: typeof form) => {
            if (!event) throw new Error('Event not found');
            return updateEventApi(event.id, { ...event, ...data });
        },
        onSuccess: (data) => {
            updateEvent(data); // update Zustand store
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate(-1);
            }, 1200);
        },
        onError: () => {
            setError('Failed to update event in database!');
        },
    });

    useEffect(() => {
        if (events.length === 0) {
            fetchEvents();
        }
    }, [events.length, fetchEvents]);

    useEffect(() => {
        if (event) {
            setForm({
                name: event.name || '',
                date: event.date || '',
                location: event.location || '',
                description: event.description || '',
                image_url: event.image_url || '',
                tickets_available: event.tickets_available || 0,
            });
        }
    }, [event]);

    if (loading || events.length === 0) {
        return <div className="p-6">Loading...</div>;
    }
    if (!event) {
        return <div className="p-6">Event not found.</div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        mutation.mutate(form);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
                <h1 className="text-2xl font-bold mb-6 text-center">Update Event</h1>
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
                    <label className="flex flex-col">
                        <span className="mb-1 font-medium">Image URL</span>
                        <input
                            type="text"
                            name="image_url"
                            value={form.image_url}
                            onChange={handleChange}
                            className="border rounded px-3 py-2"
                        />
                    </label>
                    <button
                        type="submit"
                        className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        disabled={mutation.status === 'pending'}
                    >
                        {mutation.status === 'pending' ? 'Updating...' : 'Update Event'}
                    </button>
                    {success && <div className="text-green-600 font-semibold mt-2 text-center">Event updated!</div>}
                    {error && <div className="text-red-600 font-semibold mt-2 text-center">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default UpdateEvent;