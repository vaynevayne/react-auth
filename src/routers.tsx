import { lazy } from "react";
import { AuthRouteObject } from "react-router-auth-plus";
import { redirect } from 'react-router-dom';
import useLocalStore from './store/local-store';

const Layout = lazy(() => import("./components/Layout"));
const Application = lazy(() => import("./pages/Application"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Setting = lazy(() => import("./pages/Setting"));

type MetaMenu = {
  name?: string;
  icon?: React.ReactNode;
};

export type MetaMenuAuthRouteObject = AuthRouteObject<MetaMenu>;


export const routers: AuthRouteObject[] = [

  {
    path: "/",
    element: <Layout />,
    // it will pass th routers prop to Layout
    // genRoutersProp: true,
    // it will pass the authRouters prop to Layout, you can use it to generate menus
    genAuthRoutersProp: true,
    loader: () => {
      const accessToken = useLocalStore(state => state.accessToken)
      console.log('loader', accessToken);

      if (!accessToken) {
        console.log('redirect("/login");');

        return redirect("/login");
      }
      return null

    },
    children: [
      {
        element: <Home />,
        auth: ["admin"],
        index: true,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
      {
        path: "/application",
        element: <Application />,
        auth: ["application"],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "*", element: <NotFound /> },
];