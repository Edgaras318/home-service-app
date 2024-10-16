import axiosInstance from "./axios-instance";

const entityPath = 'categories';

export const getCategories = async (search?: string) => {
    let url = entityPath;

    if(search !== undefined) {
        url+= `?search=${search}`
    }

    return axiosInstance.get(url);
}
