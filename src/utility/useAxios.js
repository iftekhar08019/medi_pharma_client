import axios from 'axios';

const useAxios = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5003',
    // You can add interceptors or auth headers here if needed
  });
  return instance;
};

export default useAxios; 
