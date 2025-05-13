import {create} from 'zustand';
import axios from 'axios';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  image_url: string;
  total_tickets: number;
  available_tickets: number;
  totalAttendees: number;
}

interface EventStore {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => void;
}

const useEventStore = create<EventStore>((set) => ({
  events: [],
  loading: false,
  error: null,
  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('http://localhost:3000/events');
      set({ events: response.data, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred', loading: false });
    }
  },
}));

export default useEventStore;