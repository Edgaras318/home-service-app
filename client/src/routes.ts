// src/routes.ts

// Define a type for the routes object
type Routes = {
    home: string;
    services: string;
    about: string;
    login: string;
    register: string;
    category: (category: string) => string;
    businessDetails: (businessId: string) => string;
    userBookings: (email: string) => string;
};

// Define the routes object with type annotation
const routes: Routes = {
    home: '/',
    services: '/services',
    about: '/about',
    login: '/login',
    register: '/signup',
    category: (category: string) => `/search/${category}`,
    businessDetails: (businessId: string) => `/details/${businessId}`,
    userBookings: (email: string) => `/bookings/user/${email}`,
};

export default routes;
