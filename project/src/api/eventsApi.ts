import axios from 'axios';
import type { Event } from '@/stores/eventStore';

export async function fetchEventsApi(): Promise<Event[]> {
  const response = await axios.get<Event[]>('http://localhost:3000/events');
  return response.data || [];
}

export async function updateEventApi(id: number | string, data: Partial<Event>) {
  const response = await axios.put<Event>(`http://localhost:3000/events/${id}`, data);
  return response.data;
}
