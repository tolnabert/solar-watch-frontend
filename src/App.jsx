import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import HomeLayout from "./pages/HomeLayout";
import AdminPage from "./pages/AdminPage";
import AddSolarInfo from "./pages/AddSolarInfo";
import SecurityPw from "./pages/SecurityPw";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import ListSolarInfo from "./pages/ListSolarInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      {
        index: true,
        element: <AddSolarInfo />,
      },
      {
        path:"list",
        element:<ListSolarInfo/>
      },
      {
        path: "security",
        element: <SecurityPw />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
