import React from 'react';

interface AttendeeCardProps {
  name: string;
  date: string;
  email: string;
  event: string;
}

const AttendeeCard: React.FC<AttendeeCardProps> = ({ name, date, email, event }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 border border-gray-100 hover:shadow-lg transition">
      <div className="font-semibold text-lg text-blue-700">{name}</div>
      <div className="text-sm text-gray-500">{email}</div>
      <div className="text-xs text-gray-400">Registered: {new Date(date).toLocaleString()}</div>
      <div className="text-sm text-indigo-600">Event: <span className="font-medium">{event}</span></div>
    </div>
  );
};

export default AttendeeCard;
