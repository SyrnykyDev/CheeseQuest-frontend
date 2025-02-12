// *** COMPONENTS ***
import React, { useState } from "react";
import SansWrapper from "../../components/SansWrapper/SansWrapper";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
// import FormikWrapper from "../../app/register/formikWrapper";

// *** ASSETS ***
import googleSVG from "../../assets/google-icon-logo-svgrepo-com.svg";
import MotionWrapper from "../../components/MotionWrapper/MotionWrapper";
import Link from "../../components/Link/Link.tsx";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { RootState } from "../../store/store.ts";
import RegisterContainer from "./Register.container.tsx";
import { Form, Formik } from "formik";

const Register = () => {
  const {
    states: { loading, errorMessage },
    function: { onRegister, setLoading },
  } = RegisterContainer();
  const user = useSelector((state: RootState) => state?.user);
  if (user.isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    // <div>
    // <FormikWrapper>
    <Formik
      initialValues={{ username: "", password: "", email: "" }}
      validate={() => {
        const errors = {};

        return errors;
      }}
      onSubmit={(values) => {
        console.log(values);
        setLoading(true);

        const urlencoded = new URLSearchParams();
        // urlencoded.append("user", values.user);
        // urlencoded.append("password", values.password);

        onRegister(values);
      }}
    >
      {({ values, handleChange, handleSubmit, dirty }) => (
        <MotionWrapper>
          <Form style={{ margin: "auto" }}>
            <SansWrapper centered>
              {" "}
              <h1 style={{ color: "black" }}>Register account</h1>
              <Input
                placeholder={"Enter your email"}
                name={"email"}
                required
                value={values.email}
                onChange={handleChange}
              />
              <Input
                placeholder={"Enter your username"}
                name={"username"}
                required
                value={values.username}
                onChange={handleChange}
              />
              <Input
                placeholder={"Enter your password"}
                name={"password"}
                type={"password"}
                required
                onChange={handleChange}
                value={values.password}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Link href={"/login"}>
                  <Button buttonColor={"blue"}>Log In</Button>
                </Link>
                <b>-</b>
                <Button buttonColor={"green"} type="submit" loading={loading}>
                  Register
                </Button>
              </div>
              <span
                style={{ color: "black", fontSize: "22px", fontWeight: 700 }}
              >
                {" "}
                or
              </span>
              <Button buttonColor={"gray"}>
                <img src={googleSVG} alt={"Google Icon"} width={30} />
                Register with Google
              </Button>
            </SansWrapper>
          </Form>
        </MotionWrapper>
      )}
    </Formik>
  );
};

export default Register;
