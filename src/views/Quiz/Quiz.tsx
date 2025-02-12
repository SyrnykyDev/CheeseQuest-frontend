import React, { useEffect, useState } from "react";
import BubbleWrapper from "../../components/BubbleWrapper/BubbleWrapper.tsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Button from "../../components/Button/Button.tsx";
// *** ASSETS ***
import bannerPNG from "../../assets/Shareable-Quizzes-In-Online-Training-7-Reasons.webp";
import starPNG from "../../assets/star.png";
import filledStarPNG from "../../assets/star (1).png";
import { isFavouriteCheck, onAddFavourite } from "../../utils/favourite.tsx";
import Input from "../../components/Input/Input.tsx";
import { useDispatch } from "react-redux";
import { addNotification } from "../../store/userSlice.ts";
import QuizContainer from "./Quiz.container.ts";
let timeout: NodeJS.Timeout;
import styles from "./Quiz.module.scss";
import Loader from "../../components/Loader/Loader.tsx";

const Quiz = () => {
  const dispatch = useDispatch();
  const {
    states: {
      loading,
      quiz,
      commentText,
      reviews,
      seconds,
      isFavourite,
      params,
      quizStarted,
      isQuizShowed,
    },
    functions: {
      setLoading,
      setQuiz,
      setCommentText,
      setReviews,
      setIsFavourite,
      setSeconds,
      onChangeFavourite,
      onCommentAdd,
      onQuizStart,
    },
  } = QuizContainer();

  // message questId
  useEffect(() => {
    if (seconds > 0) {
      timeout = setTimeout(() => {
        setSeconds((state) => state - 1);
      }, 1000);
    } else {
      clearTimeout(timeout);
    }
  }, [seconds]);

  const navigate = useNavigate();

  return (
    <div
      className={`${styles.quiz} ${isQuizShowed ? styles.quiz__active : styles.quiz__inactive}`}
    >
      <BubbleWrapper>
        {quizStarted ? (
          <>sssssssssssssssssssss</>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              width: "100%",
              minHeight: "50vh",
            }}
          >
            <h1>{quiz?.name}</h1>
            <div style={{ width: "100%", display: "flex" }}>
              {quiz?.media && !loading ? (
                <img
                  src={quiz?.media}
                  style={{ width: "40%", margin: "auto" }}
                />
              ) : (
                <div
                  style={{
                    width: "40%",
                    margin: "auto",
                    height: "300px",
                    display: "flex",
                  }}
                >
                  <div style={{ margin: "auto" }}>
                    <Loader />
                  </div>
                </div>
              )}
            </div>
            <span>{quiz?.description}</span>
            <div
              style={{
                boxShadow: "3px 3px 3px 3px gray",
                padding: "0px 20px 30px 20px",
                display: "flex",
                marginTop: "15px",
                marginBottom: "20px",
                flexDirection: "column",
              }}
            >
              <h2>Author:</h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                  gap: "20px",
                }}
              >
                <img
                  src={quiz?.user?.avatar}
                  width={100}
                  height={100}
                  style={{ borderRadius: "5px", objectFit: "cover" }}
                />
                <div>
                  Username: <b>{quiz?.user?.username}</b>
                </div>
                <div>
                  Email: <b>{quiz?.user?.email}</b>
                </div>
              </div>
            </div>

            <div></div>
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                fontSize: "30px",
                alignItems: "center",
                display: "flex",
              }}
            >
              <img
                style={{ marginRight: "20px", cursor: "pointer" }}
                src={isFavourite ? filledStarPNG : starPNG}
                onClick={() => {
                  onAddFavourite(quiz?.id, onChangeFavourite);
                }}
                width={40}
              />
              Rating: <b>{quiz?.rating}</b>
            </span>

            <div
              style={{
                display: "flex",
                gap: "10px",
                paddingTop: "30p",
                margin: "auto 20px 20px auto",
              }}
            >
              <Button
                onClick={() => {
                  onQuizStart();
                }}
              >
                Start Quest
              </Button>
              <Button
                buttonColor={"blue"}
                onClick={() => {
                  navigate(`/editQuiz/${quiz.id}`);
                }}
              >
                Edit Quest
              </Button>
              <Button buttonColor={"red"}>Delete Quest</Button>
            </div>
            {/*--- COMMENTS ---*/}
            <div
              style={{
                padding: "20px",
                width: "100%",
                minHeight: "100px",
                // backgroundColor: "white",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                boxShadow: "3px 3px 3px 3px gray",
              }}
            >
              {reviews?.length >= 1 ? (
                <div>
                  {reviews?.map((elem, index) => (
                    <div
                      key={index}
                      style={{
                        margin: "30px 15px",
                        boxShadow: "3px 3px 3px gray",
                        padding: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "20px",
                        }}
                      >
                        <img
                          src={elem?.avatar}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        />
                        <div>{elem?.username}</div>
                      </div>
                      <div style={{ margin: "10px 10px 10px 10px" }}>
                        {elem.message}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <span style={{ margin: "auto", fontSize: "20px" }}>
                  No comments yet. Be first!
                </span>
              )}

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <Input
                  placeholder={"Add a comment..."}
                  textField
                  width={100}
                  value={commentText}
                  onChange={(event) => setCommentText(event.target?.value)}
                />
                <Button
                  onClick={() => {
                    onCommentAdd();
                  }}
                  loading={loading}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </BubbleWrapper>
    </div>
  );
};

export default Quiz;
