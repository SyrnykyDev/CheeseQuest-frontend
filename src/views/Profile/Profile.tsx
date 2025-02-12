import React, { useEffect, useState } from "react";
import BubbleWrapper from "../../components/BubbleWrapper/BubbleWrapper";
import styles from "./Profile.module.scss";
import Button from "../../components/Button/Button";

// *** ASSETS ***
import editSVG from "../../assets/edit.svg";
import profileTest from "../../assets/profileTest.jpg";
import QuizQuestion from "../../components/QuizQuestion/QuizQuestion";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import axios from "axios";
import Input from "../../components/Input/Input.tsx";

const Profile = () => {
  // const user = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem("Authorization");

  const [user, setUser] = useState<any>();
  const [editedUser, setEditedUser] = useState<any>();
  const [isEditing, setIsEditing] = useState(false);

  const isOwner = true;
  const [currentTab, setCurrentTab] = useState(0);

  const buttonArray = [
    { label: "Quests" },
    { label: "History" },
    { label: "Starred" },
  ];

  const onUserEdit = () => {
    setIsEditing(!isEditing);
  };

  const onUserPost = () => {
    axios
      .post(
        process.env.REACT_APP_SERVER_HOST + "/users/edit",
        {
          username: editedUser,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      )
      .then((resp) => {
        onPostUser();
        // if (resp.data) setUser(resp.data.user);
      });
  };

  console.log("user", user);

  const onPostUser = () => {
    axios
      .get(process.env.REACT_APP_SERVER_HOST + "/users/user", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((resp) => {
        if (resp.data) setUser(resp.data.user);
      });
  };
  useEffect(() => {
    onPostUser();
  }, []);
  return (
    <BubbleWrapper>
      <div className={styles.profile}>
        <h1 style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <img src={profileTest} alt={"Profile"} width={60} height={60} />
          {user?.username}
          {isOwner && isEditing ? (
            <div style={{ display: "flex", alignItems: "end", gap: "20px" }}>
              <Input
                placeholder={"Username"}
                onChange={(event) => setEditedUser(event.target.value)}
                value={editedUser}
              />
              <Button onClick={onUserEdit}>Cancel</Button>
              <Button onClick={onUserPost}>Done</Button>
            </div>
          ) : (
            <img src={editSVG} onClick={onUserEdit} alt={"Edit user"} />
          )}
        </h1>
        <div style={{ display: "flex", gap: "10px" }}>
          {buttonArray.map((elem, index) => (
            <Button
              key={index}
              buttonType={"round"}
              onClick={() => setCurrentTab(index)}
              active={currentTab == index}
            >
              {elem.label}
            </Button>
          ))}
        </div>
        <div className={styles.profile_container}>
          <QuizQuestion title={"Test"} id={0} />
          <QuizQuestion title={"Test"} id={0} />
          <QuizQuestion title={"Test"} id={0} />
          <QuizQuestion title={"Test"} id={0} />
          <QuizQuestion title={"Test"} id={0} />
          <QuizQuestion title={"Test"} id={0} />
        </div>
      </div>
    </BubbleWrapper>
  );
};

export default Profile;
