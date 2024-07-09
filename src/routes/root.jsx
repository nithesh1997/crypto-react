import * as React from "react";
import { createBrowserRouter} from "react-router-dom";

// Lazy loading components
const App = React.lazy(() => import("src/App"));
const Login = React.lazy(() => import("pages/Login/index"));
const SignupPage = React.lazy(() => import("pages/Component/Signup"));
const Home = React.lazy(() => import("pages/Home"));
const About = React.lazy(() => import("pages/About"));
const Contact = React.lazy(() => import("src/pages/Contact"));
const CoinDetails = React.lazy(() => import("pages/CoinDetails"));
const Planpage = React.lazy(() => import("pages/PlanPage"));
const ErrorPage = React.lazy(() => import("pages/Errors/ErrorPage"));
const Spinner = React.lazy(()=> import("src/components/Spinner"))

const rootRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
         children: [
        {
          index: true,
          element: <Home />,
        },
        {
           path: "/spn",
      element: <Spinner />,
        },
         {
      path: "/login",
      element: <Login />,
      },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/coindetails",
          element: <CoinDetails />,
        },
        {
          path: "/plan",
          element: <Planpage />,
        },
      ]
    },
    //  { basename: `/${import.meta.env.VITE_BASE_ROUTE_PATH}` },
  ]
)

export default rootRouter;
