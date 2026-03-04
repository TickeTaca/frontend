import { create } from "zustand";

type Category =
  | "all"
  | "concert"
  | "musical"
  | "sports"
  | "exhibition";

interface CategoryState {
  category: Category;
  setCategory: (c: Category) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  category: "all",
  setCategory: (c) => set({ category: c }),
}));
