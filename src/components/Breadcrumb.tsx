import { Link, useLocation, useParams } from "react-router-dom";

const routeMap: Record<string, string> = {
  event: "이벤트 상세",
  mypage: "마이페이지",
  payment: "결제",
  check: "결제 확인",
};

export default function Breadcrumb() {
  const location = useLocation();
  const { eventId } = useParams();

  const segments = location.pathname
    .split("/")
    .filter(Boolean);

  const crumbs = segments.map((seg, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/");
    const label =
      routeMap[seg] ||
      (seg === eventId ? `이벤트 ${eventId}` : seg);

    return { path, label };
  });

  return (
    <div className="bg-white border-b px-6 py-2 text-[12px] text-gray-400">
      <Link to="/" className="hover:underline">
        홈
      </Link>

      {crumbs.map((c, i) => (
        <span key={c.path}>
          {" › "}
          {i === crumbs.length - 1 ? (
            <span className="text-gray-900">{c.label}</span>
          ) : (
            <Link to={c.path} className="hover:underline">
              {c.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
