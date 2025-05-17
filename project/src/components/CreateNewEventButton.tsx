type ButtonProps = {
    onClick: () => void;
    icon?: string;
}
export default function CreateNewEventButton({ onClick, icon = '+' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-110"
      aria-label="Action Button"
    >
      <span className="text-2xl leading-none">Create New Event</span>
    </button>
  );
}