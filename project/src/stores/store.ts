import { create } from 'zustand'

type BearState = {
  bears: number
  increasePopulation: () => void
  removeAllBears: () => void 
  updateBears: (newBears: number) => void // <-- Added this line
}

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state:BearState) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears:BearState) => set({ bears: newBears }),
}))

export default useStore