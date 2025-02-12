import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { authUser } from "../../store/userSlice.ts";
import { useDispatch } from "react-redux";
const LoginContainer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onGoogleLogin = async () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
    // await fetch(
    //   process.env.REACT_APP_SERVER_HOST + "/oauth2/authorization/google",
    // );
  };
  const onLogin = (values: any) => {
    axios
      .post(process.env.REACT_APP_SERVER_HOST + "/api/auth/login", values, {
        headers: {
          "Content-type": "Application/json",
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
        if (resp.data) {
          localStorage.setItem("Authorization", resp.data);

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
    functions: { setLoading, onLogin, onGoogleLogin },
    states: { loading },
  };
};

export default LoginContainer;
