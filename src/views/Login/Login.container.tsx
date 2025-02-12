import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { authUser } from "../../store/userSlice.ts";
import { useDispatch } from "react-redux";
// import {
//   addNotification,
//   authUser,
// } from "../../../../../Jakob/my-app/src/store/userSlice.ts";

const LoginContainer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = (values: any) => {
    axios
      .post(process.env.REACT_APP_SERVER_HOST + "/auth/login", values, {
        headers: {
          "Content-type": "Application/json",
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
        if (resp.data) {
          localStorage.setItem("Authorization", resp.data.token);

          // @ts-ignore
          dispatch(authUser());
          setTimeout(() => {
            navigate("/profile");
          }, 100);
        }
      })
      .catch(() => {
        // dispatch(
        //   addNotification({
        //     message: resp.response.data.message,
        //     type: "error",
        //   }),
        // );
        // setErrorMessage(resp.response.data.message);
        // console.log("errorMessage", resp.response.data.message);
      })
      .finally(() => {
        setLoading(true);
      });
  };
  return {
    functions: { setLoading, onLogin },
    states: { loading },
  };
};

export default LoginContainer;
