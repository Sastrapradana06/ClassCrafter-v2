
import { getAllSiswa } from '../utils/api'
import { create } from 'zustand'

const useAppStore = create((set) => ({

  sidebar: 'sidebar_aktif',
  setSidebar: () => set((state) => ({ sidebar: state.sidebar === 'sidebar_aktif' ? 'sidebar_non' : 'sidebar_aktif' })),
  
  user: undefined,
  setUser: (newUser) => set({ user: newUser }),

  dataSiswa: undefined,
  setDataSiswa: (data) => set({ dataSiswa: data }),
  getDataSiswa: async () => {
    try {
      const {data} = await getAllSiswa()
      set({ dataSiswa: data });
    } catch (error) {
      console.log(error);
    }
  }

}))

export default useAppStore