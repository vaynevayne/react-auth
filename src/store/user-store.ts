import { StoreApi, create } from 'zustand'
import { computed } from 'zustand-middleware-computed-state'

// define types for state values and actions separately
type State = {
 email: string
  auth: string[]
    isFetched:boolean
}

type Actions = {
  login: (payload: {email:string,password:string})=> Promise<any>
  reset: () => void
  set:StoreApi<State>['setState']
}

// define the initial state
const initialState: State = {
  email: '',
  auth: [],
  isFetched:false,
}

type Store = State & Actions

type ComputedStore = {
}

type SetType = (
  partial:
    | Store
    | Partial<Store>
    | ((state: Store) => Store | Partial<Store>),
  replace?: boolean | undefined
) => void;


// create store
const useUserStore = create<Store & ComputedStore>()(
  computed<Store, ComputedStore>(
    (set:SetType, get) => ({
      ...initialState,
      login: async ({ email, password }) => {
        const response = await fetch('/api/authentication/sign-in', {
          method: "POST",
          body: JSON.stringify({
            email: "email",
            password: "password"
          })
        })
        set({
          email: '121',
          auth: [],
          isFetched:true
         })
        
      },
      set,
   reset: () => {
      set(initialState)
    },
    }),
    () => {
      return {
      };
    }
  )
);

export default useUserStore


