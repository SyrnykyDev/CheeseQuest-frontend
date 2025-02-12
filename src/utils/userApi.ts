import axios from "axios";

export const authUser = async () => {
  const token = localStorage.getItem("Authorization");
  console.log("tokentoken", token);
  return await axios
    .get(process.env.REACT_APP_SERVER_HOST + "/users/auth", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Accept: "application/json",

        Authorization: `${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch(() => {
      return { auth: false };
    });
};

export const fetchUser = async () => {
  const token = localStorage.getItem("Authorization");
  console.log("tokentoken", token);
  // if (!token) return false;
  return await axios
    .get(process.env.REACT_APP_SERVER_HOST + "/users/user", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Accept: "application/json",

        Authorization: `${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch(() => {
      return { auth: false };
    });
};
