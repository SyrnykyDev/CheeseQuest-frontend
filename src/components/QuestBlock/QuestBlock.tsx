import React, { useEffect, useState } from "react";
import banner from "../../assets/Shareable-Quizzes-In-Online-Training-7-Reasons.webp";
import styles from "./QuestBlock.module.scss";
import { IQuest } from "../../Interfaces/IQuest.tsx";
import { useNavigate } from "react-router";
import filledStar from "../../assets/star (1).png";
import star from "../../assets/star.png";
import { isFavouriteCheck } from "../../utils/favourite.tsx";

const QuestBlock = ({ id, description, name }: IQuest) => {
  const navigate = useNavigate();
  const [favourite, setFavourite] = useState(false);
  const onChangeFavourite = (value) => {
    setFavourite(value);
  };
  useEffect(() => {
    isFavouriteCheck(id, onChangeFavourite);
  }, []);

  return (
    <div
      className={styles.questBlock}
      onClick={() => {
        navigate(`/quiz/${id}`);
      }}
    >
      <div className={styles.quizQuestion_title}>{name}</div>
      <div style={{ width: "100%", margin: "auto" }}>
        <img src={banner} width={120} className={styles.questBlock_banner} />
      </div>
      <div style={{ position: "absolute", right: "10px", top: "10px" }}>
        <img
          src={favourite ? filledStar : star}
          width={30}
          // className={styles.questBlock_banner}
        />
      </div>
      <div className={styles.quizQuestion_description}>{description}</div>
    </div>
  );
};

export default QuestBlock;
