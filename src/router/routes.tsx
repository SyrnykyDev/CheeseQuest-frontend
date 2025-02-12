import { useEffect } from "react";
import { Routes as ReactRoutes, Route, BrowserRouter } from "react-router";
import PrivateRoute from "./PrivateRoute.tsx";
// import Login from "..//src/views/Login/Login.tsx";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../store/userSlice.ts";
import Search from "../../../../Jakob/my-app/src/views/Search/Search.tsx";
import Wrapper from "../components/Wrapper/Wrapper.tsx";
import User from "../../../../Jakob/my-app/src/views/User/User.tsx";
import React from "react";
import Login from "../views/Login/Login.tsx";
import Register from "../views/Register/Register.tsx";
import Profile from "../views/Profile/Profile.tsx";
import CreateQuiz from "../views/CreateQuiz/CreateQuiz.tsx";
import Home from "../views/Home/Home.tsx";

const Routes = () => {
  const dispatch = useDispatch();

  // const user = useSelector((state: RootState) => state.user);
  // console.log("user", user);
  useEffect(() => {
    // @ts-ignore
    dispatch(authUser());
  }, []);

  return (
    <BrowserRouter>
      <Wrapper>
        <ReactRoutes>
          {/*--- PUBLIC ROUTES ---*/}
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Register />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />

          {/*--- PRIVATE ROUTES ---*/}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/createQuiz" element={<CreateQuiz />} />
          </Route>
        </ReactRoutes>
      </Wrapper>
    </BrowserRouter>
  );
};

export default Routes;
