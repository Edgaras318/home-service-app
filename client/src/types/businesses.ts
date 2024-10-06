type Image = {
    url: string; // URL of the image
};

export type Business = {
    _id: string;
    name: string;
    description: string;
    category: string;
    contactPerson: string;
    address: string;
    email: string;
    photos: Image[];
};
