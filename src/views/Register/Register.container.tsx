import { addNotification, authUser } from "../../store/userSlice.ts";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";

const RegisterContainer = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onRegister = (values: any) => {
    axios
      .post("http://localhost:8081" + "/api/auth/registration", values, {
        headers: {
          "Content-type": "Application/json",
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data) {
          localStorage.setItem("Authorization", resp.data.token);
          // @ts-ignore
          dispatch(authUser());
        }
        navigate("/login");
      })
      .catch((resp) => {
        dispatch(
          addNotification({
            message: resp.response.data.message,
            type: "error",
          }),
        );
        setErrorMessage(resp.response.data.message);
        console.log("errorMessage", resp.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    function: { onRegister, setLoading },
    states: { loading, errorMessage },
  };
};

export default RegisterContainer;
