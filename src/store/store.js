import { create } from "zustand";

const useAppStore = create((set) => ({
  nationalHolidays: [
    {
      tanggal: "2024-01-01",
      keterangan: "Tahun Baru Masehi",
    },
    {
      tanggal: "2024-02-08",
      keterangan: "Tahun Baru Imlek 2575",
    },
    {
      tanggal: "2024-03-11",
      keterangan: "Isra Mi'raj Nabi Muhammad SAW",
    },
    {
      tanggal: "2024-03-22",
      keterangan: "Hari Raya Nyepi Tahun Baru Saka 1946",
    },
    {
      tanggal: "2024-03-29",
      keterangan: "Wafat Yesus Kristus",
    },
    {
      tanggal: "2024-04-10",
      keterangan: "Idul Fitri 1445 Hijriyah",
    },
    {
      tanggal: "2024-04-11",
      keterangan: "Hari Raya Idul Fitri 1445 Hijriyah",
    },
    {
      tanggal: "2024-05-01",
      keterangan: "Hari Buruh Internasional",
    },
    {
      tanggal: "2024-05-09",
      keterangan: "Kenaikan Yesus Kristus",
    },
    {
      tanggal: "2024-05-23",
      keterangan: "Hari Raya Waisak 2568 BE",
    },
    {
      tanggal: "2024-06-17",
      keterangan: "Hari Raya Idul Adha 1445 Hijriyah",
    },
    {
      tanggal: "2024-07-07",
      keterangan: "Tahun Baru Islam 1446 Hijriyah",
    },
    {
      tanggal: "2024-08-17",
      keterangan: "Hari Kemerdekaan Republik Indonesia",
    },
    {
      tanggal: "2024-09-16",
      keterangan: "Maulid Nabi Muhammad SAW",
    },
    {
      tanggal: "2024-12-25",
      keterangan: "Hari Raya Natal",
    },
  ],

  status: false,
  sidebar: "sidebar_non",
  setStatus: () => set((state) => ({ status: !state.status })),
  setSidebar: () =>
    set((state) => ({
      sidebar:
        state.sidebar === "sidebar_aktif" ? "sidebar_non" : "sidebar_aktif",
    })),

  selectedId: [],
  setSelectedId: (data) => set({ selectedId: data }),
  deleteSelectedId: () => set({ selectedId: [] }),

  isDelete: false,
  setIsDelete: (status) => set({ isDelete: status }),

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
