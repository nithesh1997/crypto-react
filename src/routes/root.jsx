import * as React from "react";
import { createBrowserRouter, redirect} from "react-router-dom";

// Lazy loading components
const App = React.lazy(() => import("src/App"));
const Login = React.lazy(() => import("pages/Login/index"));
const SignupPage = React.lazy(() => import("src/pages/Signup"));
const Home = React.lazy(() => import("pages/Home"));
const About = React.lazy(() => import("pages/About"));
const Contact = React.lazy(() => import("src/pages/Contact"));
const CoinDetails = React.lazy(() => import("pages/CoinDetails"));
const Planpage = React.lazy(() => import("pages/PlanPage"));
const ErrorPage = React.lazy(() => import("pages/Errors/ErrorPage"));


const loader = async () => {
  const profilePreferences = JSON.parse(sessionStorage.getItem("profile-preferences"));

  return profilePreferences ? null : redirect("/login");
};

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
           loader
        },
       {
      path: "/login",
      element: <Login />,
      },
      
        {
          path: "/about",
          element: <About />,
            loader
        },
        {
          path: "/signup",
          element: <SignupPage />,
            loader
        },
        {
          path: "/contact",
          element: <Contact />,
            loader
        },
        {
          path: "/coindetails",
          element: <CoinDetails />,
            loader
        },
        {
          path: "/plan",
          element: <Planpage />,
            loader
        },
      ]
    },
     { basename: `/${import.meta.env.VITE_BASE_ROUTE_PATH}` },
  ]
)

export default rootRouter;
