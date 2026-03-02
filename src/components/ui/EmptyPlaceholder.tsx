import { FaBriefcase } from "react-icons/fa";

type EmptyPlaceholderProps = {
  message: string;
};

export default function EmptyPlaceholder({ message }: EmptyPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
      {/* Icon with circular background */}
      <div className="bg-gray-100 rounded-full p-6 mb-6">
        <FaBriefcase className="text-6xl text-gray-400" />
      </div>

      {/* Main message */}
      <h2 className="text-xl font-semibold">{message}</h2>
    </div>
  );
}
