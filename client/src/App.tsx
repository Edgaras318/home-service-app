// src/App.tsx
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home/Home";
import Services from "@/pages/Services";
import AboutUs from "@/pages/AboutUs";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Root from "@/Root";
import Category from "@/pages/Category/Category";
import ErrorPage from "@/pages/ErrorPage";
import routes from '@/routes';

// Create router with type safety
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

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
