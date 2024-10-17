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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BusinessDetails from "@/pages/BusinessDetails/BusinessDetails";
import { SnackbarProvider } from 'notistack';
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
      {
        path: routes.businessDetails(':business_id'),
        element: <BusinessDetails />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const App: React.FC = () => {
  return(
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </QueryClientProvider>
  );
};

export default App;
