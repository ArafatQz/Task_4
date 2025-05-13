import { create } from 'zustand';

export interface Attendee {
  id: number;
  name: string;
  email: string;
  ticketQuantity: number;
  date: string;
  eventId: number;
}

interface AttendeeStore {
  attendees: Attendee[];
  addAttendee: (attendee: Attendee) => void;
  removeAttendee: (id: number) => void;
  updateAttendee: (id: number, updatedAttendee: Partial<Attendee>) => void;
}

const useAttendeeStore = create<AttendeeStore>((set) => ({
  attendees: [],
  addAttendee: (attendee) =>
    set((state) => ({ attendees: [...state.attendees, attendee] })),
  removeAttendee: (id) =>
    set((state) => ({
      attendees: state.attendees.filter((attendee) => attendee.id !== id),
    })),
  updateAttendee: (id, updatedAttendee) =>
    set((state) => ({
      attendees: state.attendees.map((attendee) =>
        attendee.id === id ? { ...attendee, ...updatedAttendee } : attendee
      ),
    })),
}));

export default useAttendeeStore