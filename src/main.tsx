import { NextUIProvider } from "@nextui-org/react"
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import useLocalStore from './store/local-store.ts'
import useUserStore from './store/user-store.ts'
import { wrapPromise } from './utils/index.ts'

import { makeServer } from "./server.ts"


if (import.meta.env.DEV) {
  makeServer({ environment: "development" })
}

export const fetchUser = async (token: string) => {
  if (!token) {
    return null
  }
  const response = await fetch(`/api/user/${token}`, {
    method: "GET",
    headers: {
      'x-access-token': token
    }
  });

  return response.json()
}

const InitialProvider = ({ children }: any) => {
  const accessToken = useLocalStore(state => state.accessToken)
  let setUser = useUserStore((state) => state.set);

  // 当accessToken改变时,有值时,会再次执行 promise 方法

  if (!accessToken) {
    // router 还未挂载 无法使用
    // navigate(`/login?from=${location.pathname}`)
    return children
  }

  wrapPromise(Promise.all([fetchUser(accessToken).then(user => setUser(user))]))

  return children
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={'loading'}>
      <InitialProvider>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </InitialProvider>
    </Suspense>




  </React.StrictMode>
)
