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

  dataSearchMapel: [],
  setDataSearchMapel: (data) => set(() => ({ dataSearchMapel: data })),

  dataSearchGuru: [],
  setDataSearchGuru: (data) => set(() => ({ dataSearchGuru: data })),

  dataSearchSiswa: [],
  setDataSearchSiswa: (data) => set(() => ({ dataSearchSiswa: data })),

  dataSearchKas: [],
  setDataSearchKas: (data) => set(() => ({ dataSearchKas: data })),
}));

export default useAppStore;
