
import { getAllGuru, getAllMapel, getAllSiswa, getUserLogin } from '../utils/api'
import { create } from 'zustand'

const useAppStore = create((set) => ({

  sidebar: 'sidebar_aktif',
  setSidebar: () => set((state) => ({ sidebar: state.sidebar === 'sidebar_aktif' ? 'sidebar_non' : 'sidebar_aktif' })),
  
  user: undefined,
  updateUser: (data) => set({ user: data }),
  setUser: async () => {
    try {
      const {data} = await getUserLogin()
      set({user: data})
    } catch (error) {
      console.log(error);
    }
  },
  deleteUser: () => set({ user: undefined }),

  dataSiswa: undefined,
  setDataSiswa: (data) => set({ dataSiswa: data }),
  getDataSiswa: async () => {
    try {
      const {data} = await getAllSiswa()
      set({ dataSiswa: data });
    } catch (error) {
      console.log(error);
    }
  },

  dataGuru : undefined,
  updateDataGuru: (data) => set({dataGuru: data}),
  getDataGuru: async () => {
    try {
      const {data} = await getAllGuru()
      set({ dataGuru: data });
    } catch (error) {
      console.log(error);
    }
  },
  
  dataMapel : undefined,
  updateDataMapel: (data) => set({dataMapel: data}),
  getDataMapel: async () => {
    try {
      const {data} = await getAllMapel()
      set({ dataMapel: data });
    } catch (error) {
      console.log(error);
    }
  },

  resetState: () => set({user: undefined, dataSiswa: undefined, dataGuru: undefined, dataMapel: undefined})

}))

export default useAppStore