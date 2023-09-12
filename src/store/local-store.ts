import { StoreApi, create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


// define types for state values and actions separately
type State = {
  accessToken: string
  refreshToken: string
}

type Actions = {
  set: StoreApi<State>['setState']
  reset: ()=> void
}

// define the initial state
const initialState: State = {
  accessToken: '',
  refreshToken: '',
}

// create store
const useLocalStore = create<State & Actions>()(persist(
  (set, get) => ({
    ...initialState,
    set,
    reset: () => {
      set(initialState)
    },
  }),
  {
    name: 'local-storage',
    storage: createJSONStorage(() => localStorage),
  }
))



export default useLocalStore


