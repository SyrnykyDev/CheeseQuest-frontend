// *** COMPONENTS ***
import React from "react";
import SansWrapper from "../../components/SansWrapper/SansWrapper";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

// *** ASSETS ***
import googleSVG from "../../assets/google-icon-logo-svgrepo-com.svg";
import MotionWrapper from "../../components/MotionWrapper/MotionWrapper";
import axios from "axios";
import Link from "../../components/Link/Link.tsx";
import { Form, Formik } from "formik";
import LoginContainer from "./Login.container.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { Navigate } from "react-router";

const Login = () => {
  const user = useSelector((state: RootState) => state.user);

  const {
    states: { loading },
    functions: { onLogin, setLoading, onGoogleLogin },
  } = LoginContainer();

  if (user.isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    // <div>
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={() => {
        const errors = {};

        return errors;
      }}
      onSubmit={(values) => {
        console.log(values);
        setLoading(true);

        const urlencoded = new URLSearchParams();

        onLogin(values);
      }}
    >
      {({ values, handleChange, handleSubmit, dirty }) => (
        <MotionWrapper>
          <Form style={{ margin: "auto" }}>
            <SansWrapper centered>
              <h1 style={{ color: "black" }}>Sign In</h1>
              <Button buttonColor={"gray"} onClick={onGoogleLogin}>
                <img src={googleSVG} alt={"Google Icon"} width={30} />
                Sign in with Google
              </Button>
              <span
                style={{ color: "black", fontSize: "22px", fontWeight: 700 }}
              >
                {" "}
                or
              </span>
              <Input
                placeholder={"Enter your email"}
                required
                name={"email"}
                onChange={handleChange}
                value={values.email}
              />
              <Input
                placeholder={"Enter your password"}
                name={"password"}
                type={"password"}
                required
                onChange={handleChange}
                value={values.password}
              />
              <Button buttonColor={"gray"} type="submit">
                Continue with email
              </Button>

              <Link href={"/register"}>
                <Button buttonColor={"blue"}>Register</Button>
              </Link>
            </SansWrapper>
          </Form>
        </MotionWrapper>
      )}
    </Formik>
    // </div>
  );
};

export default Login;
