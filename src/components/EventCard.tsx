// src/components/EventCard.tsx
import { Link } from "react-router-dom";

export type EventStatus = "open" | "soon" | "closing" | "available";

interface EventCardProps {
  id: number;
  title: string;
  date: string;
  venue: string;
  emoji?: string;
  status?: EventStatus;
  badgeText?: string;
}

export default function EventCard({
  id,
  title,
  date,
  venue,
  emoji = "🎤",
  status = "available",
  badgeText,
}: EventCardProps) {
  const badgeColor = () => {
    switch (status) {
      case "soon":
        return "bg-orange-500";
      case "open":
        return "bg-blue-600";
      case "closing":
        return "bg-red-600";
      default:
        return "bg-green-600";
    }
  };

  return (
    <Link
      to={`/event/${id}`}
      className="bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition cursor-pointer"
    >
      <div className="relative aspect-[3/4] bg-[#dde4f0] flex items-center justify-center text-[36px]">
        {emoji}
        {badgeText && (
          <span
            className={`absolute top-2 left-2 text-[10px] text-white font-bold px-2 py-0.5 rounded ${badgeColor()}`}
          >
            {badgeText}
          </span>
        )}
      </div>

      <div className="p-3">
        <div className="text-[13px] font-medium mb-1 truncate">
          {title}
        </div>
        <div className="text-[11.5px] text-gray-400 mb-0.5">
          {date}
        </div>
        <div className="text-[11.5px] text-gray-400 truncate">
          {venue}
        </div>
      </div>
    </Link>
  );
}
