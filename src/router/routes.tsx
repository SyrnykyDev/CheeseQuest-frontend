import { useEffect } from "react";
import { Routes as ReactRoutes, Route, BrowserRouter } from "react-router";
import PrivateRoute from "./PrivateRoute.tsx";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../store/userSlice.ts";
import Wrapper from "../components/Wrapper/Wrapper.tsx";
import React from "react";
import Login from "../views/Login/Login.tsx";
import Register from "../views/Register/Register.tsx";
import Profile from "../views/Profile/Profile.tsx";
import CreateQuiz from "../views/CreateQuiz/CreateQuiz.tsx";
import Home from "../views/Home/Home.tsx";
import Quiz from "../views/Quiz/Quiz.tsx";
import EditQuiz from "../views/EditQuiz/EditQuiz.tsx";
import AuthorLeaderboard from "../views/AuthorLeaderboard/AuthorLeaderboard.tsx";

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
            path="/quiz/:id"
            element={
              <>
                <Quiz />
              </>
            }
          />
          <Route
            path="/authorLeaderboard"
            element={
              <>
                <AuthorLeaderboard />
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
            <Route path="/editQuiz/:id" element={<EditQuiz />} />
          </Route>
        </ReactRoutes>
      </Wrapper>
    </BrowserRouter>
  );
};

export default Routes;
