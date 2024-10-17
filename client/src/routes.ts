// src/routes.ts

// Define a type for the routes object
type Routes = {
    home: string;
    services: string;
    about: string;
    login: string;
    register: string;
    category: (category: string) => string;
    businessDetails: (business_id: string) => string;
};

// Define the routes object with type annotation
const routes: Routes = {
    home: '/',
    services: '/services',
    about: '/about',
    login: '/login',
    register: '/signup',
    category: (category: string) => `/search/${category}`,
    businessDetails: (business_id: string) => `/details/${business_id}`,
};

export default routes;
