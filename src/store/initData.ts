import { create } from 'zustand'


// define types for state values and actions separately
type State = {
  value: {
    title:string
  },
  isLoading:boolean

}

type Actions = {
  fetch: () => void
  reset: () => void
}

// define the initial state
const initialState: State = {
   value: {
    title:''
  },
  isLoading:true
}

// create store
const useInitDataStore = create<State & Actions>()((set, get) => ({
  ...initialState,

  fetch: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  
    set({
      value: await response.json(),
      isLoading:false
    })
  
  },

  reset: () => {
    set(initialState)
  },
}))

export default useInitDataStore


