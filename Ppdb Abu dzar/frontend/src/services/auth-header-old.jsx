import { useSelector } from "react-redux";
import React from "react";

const authHeader = () => {
  const auth = useSelector((state) => state.user);
  if (auth && auth.token) {
    return { Authorization: "Bearer " + auth.token };
    // return { "x-auth-token": user.accessToken };
  } else {
    return {};
  }
};

const authHeaderWithType = () => {
  const auth = useSelector((state) => state.user);
  if (auth && auth.token) {
    return {
      Authorization: "Bearer " + auth.token,
      "Content-Type": "multipart/form-data",
    };
    // return { "x-auth-token": user.accessToken };
  } else {
    return {};
  }
};

const auth = {
  authHeader,
  authHeaderWithType,
};
export default auth;
