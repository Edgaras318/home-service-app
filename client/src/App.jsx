// src/App.js
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs"; // Fix spelling error
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Root from "./Root";
import Category from "./pages/Category/Category";
import ErrorPage from "./pages/ErrorPage";
import routes from './routes'; // Import the routes configuration

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
      {
        path: routes.services,
        element: <Services />,
      },
      {
        path: routes.about,
        element: <AboutUs />,
      },
      {
        path: routes.login,
        element: <Login />,
      },
      {
        path: routes.register,
        element: <Register />,
      },
      {
        path: routes.category(':category'),
        element: <Category />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
