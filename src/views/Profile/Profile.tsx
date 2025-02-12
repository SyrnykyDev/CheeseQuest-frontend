import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import BubbleWrapper from "../../components/BubbleWrapper/BubbleWrapper";
import styles from "./Profile.module.scss";
import Button from "../../components/Button/Button";

// *** ASSETS ***
import editSVG from "../../assets/edit.svg";
import profileTest from "../../assets/profileTest.jpg";
import QuizQuestion from "../../components/QuizQuestion/QuizQuestion";
import axios from "axios";
import Input from "../../components/Input/Input.tsx";
import { Form } from "formik";
import Loader from "../../components/Loader/Loader.tsx";

const Profile = () => {
  // const user = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem("Authorization");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<any>();
  const [editedUser, setEditedUser] = useState<any>();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

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
    // alert();
    const formData = new FormData();
    formData.append("username", editedUser);
    formData.append("file", imageFile);
    setLoading(true);
    axios
      .post(process.env.REACT_APP_SERVER_HOST + "/api/user/edit", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        onGetUser();
        setIsEditing(false);
        // if (resp.data) setUser(resp.data.user);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log("user", user);

  const onGetUser = () => {
    axios
      .get(process.env.REACT_APP_SERVER_HOST + "/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data) setUser(resp.data);
      });
  };
  useEffect(() => {
    onGetUser();
  }, []);

  const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
    }
  };
  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <BubbleWrapper>
      <div className={styles.profile}>
        <>
          <h1 style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <img
              src={user?.avatar}
              className={styles.profile_img}
              onLoad={() => setLoading(false)}
              // alt={profileTest}
              width={60}
              height={60}
              onClick={() => {
                isEditing && handleImageUploadClick();
              }}
            />
            {/*{user?.username}*/}
            {isOwner ? (
              <div style={{ display: "flex", alignItems: "end", gap: "20px" }}>
                <Input
                  placeholder={"Username"}
                  isText={!isEditing}
                  textedInput={user?.username}
                  onChange={(event) => setEditedUser(event.target.value)}
                  value={editedUser}
                />
                {isEditing && (
                  <>
                    <Button onClick={onUserEdit}>Cancel</Button>
                    <Button onClick={onUserPost} loading={loading}>
                      Done
                    </Button>
                  </>
                )}
                {!isEditing && (
                  <img src={editSVG} onClick={onUserEdit} alt={"Edit user"} />
                )}
              </div>
            ) : (
              <></>
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
        </>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept={"image/*"}
        style={{ display: "none" }}
        onChange={updateImage}
      />
    </BubbleWrapper>
  );
};

export default Profile;
