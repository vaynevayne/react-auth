import { Suspense, useMemo } from 'react';
import { getAuthRouters } from "react-router-auth-plus";
import { RouterProvider, RouterProviderProps, createBrowserRouter } from "react-router-dom";
import './App.css';
import NotAuth from "./pages/Page401";
import { routers } from './routers';
import useLocalStore from './store/local-store';
import useUserStore from './store/user-store';

console.log('app');

// if you want to use router navigate outside react component
export let router: RouterProviderProps['router'];

function App() {
  const auth = useUserStore(state => state.auth)
  const accessToken = useLocalStore(state => state.accessToken)
  const _routers = useMemo(() => {
    const result = getAuthRouters({
      routers,
      noAuthElement: (router) => <NotAuth />,
      render: (element) => element,
      auth: auth,
    });

    router = result;

    return result;
  }, [auth]);


  // useEffect(() => {
  //   if (!accessToken) {
  //     redirect("/login");
  //   }
  // }, [accessToken])

  return (
    <Suspense fallback={'loading...'}>
      <RouterProvider
        router={createBrowserRouter(_routers)}
        // route loader loading
        fallbackElement={'loading router'}
      />
    </Suspense>


  )
}

export default App
