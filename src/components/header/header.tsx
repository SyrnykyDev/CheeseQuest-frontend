// *** COMPONENTS ***
import React from "react";

// *** STYLES ***
import styles from "./header.module.scss";

// *** ASSETS ***
import userIMG from "../../assets/header/user.svg";
import logoSVG from "../../assets/header/logo.svg";
import Button from "../Button/Button";
import Link from "../Link/Link.tsx";
// import { RootState } from "../../../../../Jakob/my-app/src/store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { authUser } from "../../store/userSlice.ts";
import { useNavigate } from "react-router";

// import { authUser } from "../../../../../Jakob/my-app/src/store/userSlice.ts";

const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <img src={logoSVG} alt={"Logo"} />
        </Link>
        <div className={styles.header_rightPart}>
          {user.firstFetch ? (
            !user.isAuthenticated ? (
              <>
                <Button>Sign In</Button>
                <Link href={"/login"}>
                  <Button buttonColor={"blue"}>Log In</Button>
                </Link>
              </>
            ) : (
              <>
                <div
                  style={{ display: "flex", gap: "10px" }}
                  className={styles.header_rightPart_logout}
                >
                  <Button
                    onClick={() => {
                      navigate("/createQuiz");
                    }}
                  >
                    Create Quest
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </Button>
                  <Button
                    buttonColor={"blue"}
                    onClick={() => {
                      localStorage.removeItem("Authorization");
                      // @ts-ignore
                      dispatch(authUser());
                    }}
                  >
                    Logout
                  </Button>
                  {/*<img*/}
                  {/*  src={exitSVG}*/}
                  {/*  alt="exit"*/}
                  {/*  className={styles.header_rightPart_logout_img}*/}
                  {/*/>*/}
                </div>
              </>
            )
          ) : (
            <></>
          )}
          {/*<Button>Sign In</Button>*/}
        </div>
        <div>
          <Link href="/profile">
            <></>
            {/*<Image src={userIMG} alt={"User Img"} width={30} height={30} />*/}
          </Link>
        </div>
      </header>
      <div className={styles.mockContainer} />
    </>
  );
};

export default Header;
