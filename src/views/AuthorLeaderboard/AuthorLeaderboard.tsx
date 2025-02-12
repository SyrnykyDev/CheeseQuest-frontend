import React, { useEffect, useState } from "react";
import axios from "axios";
import BubbleWrapper from "../../components/BubbleWrapper/BubbleWrapper.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import MotionWrapper from "../../components/MotionWrapper/MotionWrapper.tsx";
import star from "../../assets/star (1).png";

const AuthorLeaderboard = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  const onGetState = () => {
    setLoading(true);
    axios
      .get("http://localhost:8081" + "/api/authors")
      .then((resp) => setState(resp?.data))
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    onGetState();
  }, []);

  return (
    <>
      {!loading ? (
        <MotionWrapper
          style={{
            width: "100%",
          }}
        >
          <BubbleWrapper>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <h1>Author Leaderboard</h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {state.map((elem, index) => (
                  <div
                    style={{
                      width: "100%",
                      boxShadow: "3px 3px 3px 3px gray",
                      padding: "10px 45px",
                      borderRadius: "6px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "5px",
                        fontSize: "20px",
                        backgroundColor: "black",
                        padding: "4px",
                        borderRadius: "20px",
                        color: "white",
                      }}
                    >
                      {index + 1}
                    </span>
                    <span>
                      Username: <b>{elem.username}</b>
                    </span>
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        marginTop: "10px",
                      }}
                    >
                      <img
                        src={star}
                        width={32}
                        style={{ marginRight: "20px" }}
                      />
                      <span>
                        Sum Score: <b>{elem.sumScore}</b>
                      </span>
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        marginTop: "10px",
                      }}
                    >
                      <span>
                        Sum Quest: <b>{elem.sumQuest}</b>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BubbleWrapper>
        </MotionWrapper>
      ) : (
        // <MotionWrapper>
        <div
          style={{
            padding: "40px",
            margin: "auto",
            backgroundColor: "white",
            borderRadius: "30px",
          }}
        >
          <Loader />
        </div>
        // </MotionWrapper>
      )}
    </>
  );
};

export default AuthorLeaderboard;
