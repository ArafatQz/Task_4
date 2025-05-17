import { create } from 'zustand';
import { fetchEventsApi } from '@/api/eventsApi';

export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  image_url: string;
  total_tickets: number;
  tickets_available: number;
  totalAttendees: number;
  
}

export interface EventStore {
  events: Event[];
  upcomingEvents: Event[];
  pastEvents: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<Event[]>;
  decrementTickets: (eventId: number, quantity: number) => void;
}

const useEventStore = create<EventStore>((set) => ({
  events: [],
  upcomingEvents: [],
  pastEvents: [],
  loading: false,
  error: null,
  fetchEvents: async (): Promise<Event[]> => {
    set({ loading: true, error: null });
    try {
      const events = await fetchEventsApi();
      const upcomingEvents = events.filter(event => new Date(event.date) > new Date());
      const pastEvents = events.filter(event => new Date(event.date) <= new Date());
      set({ events, upcomingEvents, pastEvents, loading: false });
      return events;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      set({ error: errorMessage, loading: false });
      return [];
    }
  },
  decrementTickets: (eventId: number, quantity: number) =>
    set((state) => ({
      events: state.events.map(event =>
        event.id === eventId
          ? { ...event, tickets_available: Math.max(0, event.tickets_available - quantity) }
          : event
      ),
    })),
}));

export default useEventStore;