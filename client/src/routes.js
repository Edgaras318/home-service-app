// src/routes.js
const routes = {
    home: '/',
    services: '/services',
    about: '/about',
    login: '/login',
    register: '/signup',
    category: (category) => `/search/${category}`,
};

export default routes;
