// businesses.ts

// Define a type for an image associated with a business
type Image = {
    url: string; // URL of the image
};

// Define a type for a business
type Business = {
    _id: string; // Unique identifier for the business
    name: string; // Name of the business
    about?: string; // Description of the business (optional)
    address: string; // Address of the business
    category: string; // Category of the business
    contactPerson: string; // Contact person at the business
    email: string; // Email of the business
    images: Image[]; // Array of images related to the business
};

// Define an array of businesses with the Business type
export const businesses: Business[] = [
    {
        _id: "662e9aabc68c09aa945445481",
        name: "Išsivalyk pats",
        about: "Description One",
        address: "Kauno g. 27, Vilnius",
        category: "cleaning",
        contactPerson: "Tadas Gedvilas",
        email: "email@example.com",
        images: [
            {
                url: "https://www.pristinehome.com.au/wp-content/uploads/2020/01/15-Cleaning-Tips-from-Professional-Cleaners-3.jpg",
            },
        ],
    },
    {
        _id: "662e9ac5c68c09aa945445492",
        name: "UAB Valymas",
        about: "Description Two",
        address: "Aukštaičių al. 27, Klaipėda",
        category: "cleaning",
        contactPerson: "Regina Kazlauskienė",
        email: "email2@example.com",
        images: [
            {
                url: "https://www.pristinehome.com.au/wp-content/uploads/2020/01/15-Cleaning-Tips-from-Professional-Cleaners.jpg",
            },
        ],
    },
    {
        _id: "662e9ac5c68c09aa945445493",
        name: "Moki veži",
        about: "Description Two",
        address: "Žemaičių al. 27, Klaipėda",
        category: "shifting",
        contactPerson: "Darius Standys",
        email: "email2@example.com",
        images: [
            {
                url: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/08/featured_image_what_size_moving_truck_do_you_need.jpeg.jpg",
            },
        ],
    },
    {
        _id: "662ea59ed296417abaedfdfc4",
        name: "Elektrikas į namus",
        address: "Maisto g. 17, Vilnius",
        category: "electric",
        contactPerson: "Rokas Andreikėnas",
        email: "food@gmail.com",
        images: [
            {
                url: "https://grainger-prod.adobecqms.net/content/dam/grainger/gus/en/public/digital-tactics/know-how/hero/kh-qualified-vs-unqualified-electrical-workers_feat.jpg",
            },
        ],
    },
];
