import { lazy } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import {
  LoaderFunctionArgs,
  Navigate,
  createBrowserRouter,
  redirect
} from 'react-router-dom';
import useInitDataStore from './store/initData.ts';
import useUserStore from './store/user.ts';


const logError = (error: Error, info: { componentStack: string }) => {
  // Do something with the error, e.g. log to an external API
  console.log('logError', error, info);

};


const requireAuth = (role: string, request: LoaderFunctionArgs['request']) => {
  const user = useUserStore.getState().value
  const hasRole = user.role.includes(role)

  console.log('hasRole', role, hasRole);

  if (!hasRole) {
    let params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    // 仅仅没有权限 不能回 login, 应该回 401 页面
    console.log('to 401');

    throw redirect('/401');
  }
}
// need Login 
const rootLoader = async () => {
  console.log('rootLoader');

  const token = localStorage.getItem('token')
  if (!token) return redirect("/login")

  // fetch userInfo
  const user = useUserStore.getState().value
  const fetchUser = useUserStore.getState().fetch
  const isLoadingUser = useUserStore.getState().isLoading
  // fetch other data
  const fetchInitData = useInitDataStore.getState().fetch
  const isLoadingInitData = useInitDataStore.getState().isLoading

  console.log('loader:user', user);

  let fetchUserPromise = null
  let fetchInitDataPromise = null

  if (isLoadingUser) {
    fetchUserPromise = fetchUser()
  }
  if (isLoadingInitData) {
    fetchUserPromise = fetchInitData()
  }

  // Parallel request
  await fetchUserPromise
  await fetchInitDataPromise

  // Synchronize to get the latest status
  return useUserStore.getState()
}
//  need auth 
const getProtectedLoader = (role: string) => {
  console.log('getProtectedLoader', role);

  return ({ request }: LoaderFunctionArgs) => {
    requireAuth(role, request)
    return null
  }
}


async function loginLoader() {
  const token = localStorage.getItem('token')
  if (token) {
    return redirect('/');
  }

  return null;
}


const router = createBrowserRouter([
  { path: '/login', loader: loginLoader, Component: lazy(() => import('./pages/Login.tsx')) },
  {
    id: 'root',
    path: '/',
    loader: rootLoader,
    Component: lazy(() => import('./components/Layout.tsx')),
    errorElement: <ErrorBoundary fallback={<div>Something went wrong</div>} onError={logError} />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin" replace />,
      },
      {
        path: '/admin',
        loader: getProtectedLoader('admin'),
        Component: lazy(() => import('./pages/Admin.tsx')),
        // and renders this element in case something went wrong
        errorElement: <ErrorBoundary fallback={<div>Something went wrong</div>} onError={logError} />,
      },
      {
        path: '/custom',
        loader: getProtectedLoader('custom'),
        Component: lazy(() => import('./pages/Custom.tsx')),
        errorElement: <ErrorBoundary fallback={<div>Something went wrong</div>} onError={logError} />,
      },
    ],
  },
  { path: '/401', Component: lazy(() => import('./pages/Page401.tsx')) },
  { path: '*', Component: lazy(() => import('./pages/NotFound.tsx')) },
]);

export default router



/**
 * 1.rootLoader 处理是否 login 
 * 2.autoLoader 处理是否具有权限
 * 3. 根路由重定向的子页面，子页面需要满足任何登录用户都有权限查看，否则将永远停留在401页面,这是不合理的
 */