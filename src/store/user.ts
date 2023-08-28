import { create } from 'zustand'


// define types for state values and actions separately
type State = {
  value: {
    name: string
  email: string
  role: string[]
  }
  isLoading:boolean
}

type Actions = {
  fetch: () => void
  reset: () => void
}

// define the initial state
const initialState: State = {
  value: {
     name: '',
  email: '',
  role: [],
  },
  isLoading:true
}

// create store
const useUserStore = create<State & Actions>()((set, get) => ({
  ...initialState,

  fetch: async () => {
    const token = localStorage.getItem('token')
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${token}`)
    const data = await response.json()
    const isAdmin = data.name === 'Ervin Howell' 
    const isCustom = data.name === 'Leanne Graham'
    
    set({
      value: { ...data, role: [isAdmin ? 'admin' : null,isCustom? 'custom':null].filter(Boolean) },
      isLoading: false
    })
  },

  reset: () => {
    set(initialState)
  },
}))

export default useUserStore


