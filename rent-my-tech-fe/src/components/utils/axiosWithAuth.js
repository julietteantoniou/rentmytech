import axios from "axios";


export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");
    console.log('token', token)

    return axios.create({
        baseURL: 'https://techrental.herokuapp.com/',
        headers: {
            token: token
        }
    });
};

export default axiosWithAuth;