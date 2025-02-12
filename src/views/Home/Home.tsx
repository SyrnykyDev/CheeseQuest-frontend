import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizQuestion from "../../components/QuizQuestion/QuizQuestion.tsx";
import QuestSlider from "../../components/QuestSlider/QuestSlider.tsx";
import BubbleWrapper from "../../components/BubbleWrapper/BubbleWrapper.tsx";

const Home = () => {
  const [quests, setQuests] = useState([]);
  const [filteredQuests, setFilteredQuests] = useState();

  const onGetQuest = () => {
    axios
      .get(process.env.REACT_APP_SERVER_HOST + "/api/quests/all")
      .then((resp) => {
        setQuests(resp.data);
        console.log(resp.data);
      });
  };
  useEffect(() => {
    onGetQuest();
  }, []);

  return (
    // <div>
    <BubbleWrapper centered>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>Welcome to the Quiz!</h1>
        <p>Test your knowledge and have fun!</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            margin: "auto",
          }}
        >
          <h2>Welcome to the Quiz!</h2>
          <QuestSlider quests={quests} />
          <h2>Welcome to the Quiz!</h2>
          <QuestSlider quests={quests} />
          <h2>Welcome to the Quiz!</h2>
          <QuestSlider quests={quests} />
        </div>
      </div>
    </BubbleWrapper>
    // </div>
  );
};

export default Home;
