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

export async function deleteEventApi(id: number | string) {
  await axios.delete(`http://localhost:3000/events/${id}`);
}

export async function createEventApi(data: Partial<Event>) {
  // Generate a random string id (json-server will allow string or number)
  const eventToSend = { ...data, id: Date.now().toString() };
  const response = await axios.post('http://localhost:3000/events', eventToSend);
  return response.data;
}
