import Home from "./pages/home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CoinDetails from "./pages/CoinDetails";

const routes = [
  { path: "/", component: <Home />, exact: true },
  { path: "/about", component: <About /> },
  { path: "/contact", component: <Contact /> },
  { path: "/coindetails", component: <CoinDetails /> },
];

export default routes;
