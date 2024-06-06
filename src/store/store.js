import { create } from "zustand";

const useAppStore = create((set) => ({
  status: false,
  sidebar: "sidebar_non",
  setStatus: () => set((state) => ({ status: !state.status })),
  setSidebar: () =>
    set((state) => ({
      sidebar:
        state.sidebar === "sidebar_aktif" ? "sidebar_non" : "sidebar_aktif",
    })),
}));

export default useAppStore;
