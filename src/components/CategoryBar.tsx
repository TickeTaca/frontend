import { useCategoryStore } from "../store/category.store";

const categories = [
  { key: "all", label: "전체" },
  { key: "concert", label: "콘서트" },
  { key: "musical", label: "뮤지컬" },
  { key: "sports", label: "스포츠" },
  { key: "exhibition", label: "전시" },
] as const;

export default function CategoryBar() {
  const { category, setCategory } = useCategoryStore();

  return (
    <div className="h-[40px] bg-white border-b border-gray-200 flex items-center px-6 text-[13px]">
      {categories.map((c) => {
        const isActive = category === c.key;

        return (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            className={`
              px-3 h-[40px] border-b-2 transition
              ${
                isActive
                  ? "border-[#1a6ad4] text-[#1a6ad4] font-medium"
                  : "border-transparent text-gray-500 hover:text-[#1a6ad4] hover:border-[#1a6ad4]"
              }
            `}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
