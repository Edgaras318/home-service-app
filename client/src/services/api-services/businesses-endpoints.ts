import axiosInstance from "./axios-instance";

const entityPath = 'businesses';

export const getBusinesses = async (search?: string) => {
    let url = entityPath;

    if(search !== undefined) {
        url+= `?search=${search}`
    }

    return axiosInstance.get(url);
}
