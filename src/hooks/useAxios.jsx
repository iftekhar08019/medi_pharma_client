import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://localhost:5003/`, // Adjust the base URL as needed
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
