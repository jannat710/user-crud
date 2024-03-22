import axios from "axios";



const axiosOpen = axios.create({
    baseURL: 'https://user-crud-server-henna.vercel.app'
})

const useAxios = () => {
    return axiosOpen;
};
export default useAxios;