import axios from "axios";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLogin } from "./../features/userSlice";

// const API_URL = "https://beppdb.evolusidigital.id/api/auth";
const API_URL = "http://127.0.0.1:8000/api/auth";


const register = (name, email, password, photo, biaya, jenjang) => {
    const postData = { name, email, password, photo, biaya, jenjang };
    // if (biaya) {
    //   postData = { ...postData, biaya: biaya };
    // }

    const config = {
        headers: {
            "Content-Type": "multipart/form-data", // Atur Content-Type yang sesuai
        },
    };
    return axios
        .post(API_URL + "/register", postData, config)
        .then((response) => {
            console.log(response);

            // if (response.data.token) {
            //   localStorage.setItem("myuser", JSON.stringify(response.data));
            // }
            return response.data;
        });
};

const login = (email, password) => {
    // const dispatch = useDispatch();

    console.log(password);
    return axios
        .post(API_URL + "/login", {
            email,
            password,
        })
        .then((response) => {
            console.log(response);
            // const userInfo = {
            //   //'photoURL dll' dapat dari console.log(user) utk dimasukkan k dlm Statemanagement (Redux)
            //   userId: response.id,
            //   displayName: response.name,
            //   email: response.email,
            //   emailVerifiedAt: response.email_verified_at,
            //   photoURL: response.image,
            //   token: response.token,
            // };

            // dispatch(userLogin(userInfo));

            // if (response.data.token) {
            //   localStorage.setItem("myuser", JSON.stringify(response.data));
            // }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("myuser");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("myuser"));
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default authService;
