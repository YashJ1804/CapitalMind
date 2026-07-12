import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({

    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",

    timeout: 60000

});

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

);

api.interceptors.response.use(

    (response) => response,

    (error) => {

        const status = error.response?.status;

        const message =
            error.response?.data?.message ||
            "Something went wrong.";

        switch (status) {

            case 400:

                toast.error(message);
                break;

            case 401:

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                toast.error("Session expired. Please login again.");

                window.location.href = "/login";
                break;

            case 403:

                toast.error("You are not authorized.");
                break;

            case 404:

                toast.error(message);
                break;

            case 500:

                toast.error("Internal server error.");
                break;

            default:

                toast.error(message);

        }

        return Promise.reject(error);

    }

);

export default api;