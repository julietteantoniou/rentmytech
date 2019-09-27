import axios from "axios";


export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");
    console.log('token', token)

    return axios.create({
        baseURL: 'https://tech-stuff.herokuapp.com/',
        headers: {
            authorization: token
        }
    });
};

export default axiosWithAuth;