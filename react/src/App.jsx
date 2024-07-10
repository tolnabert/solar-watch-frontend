import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import HomeLayout from "./pages/HomeLayout";
import AdminPage from "./pages/AdminPage";
import AddSolarInfo from "./pages/AddSolarInfo";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import ListSolarInfo from "./pages/ListSolarInfo";
import TestAdminPage from "./pages/TestAdminPage";
import TestPublic from "./pages/TestPublicPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "contact", element: <Contact /> },
      { path: "security", element: <ChangePw /> },
      { path: "test/admin", element: <TestAdminPage /> },
      { path: "test/public", element: <TestPublic /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      { index: true, element: <AddSolarInfo /> },
      { path: "list", element: <ListSolarInfo /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
