import React from "react";
import { IQuest } from "../../Interfaces/IQuest.tsx";
import QuizQuestion from "../QuizQuestion/QuizQuestion.tsx";
import styles from "./QuestSlider.module.scss";
import QuestBlock from "../QuestBlock/QuestBlock.tsx";

const QuestSlider = ({ quests }: { quests: IQuest[] }) => {
  return (
    <div className={styles.questSlider}>
      {quests?.map((elem, index) => {
        return (
          <QuestBlock
            name={elem.name}
            id={elem?.id}
            description={elem.description}
          />
        );
      })}
    </div>
  );
};

export default QuestSlider;
