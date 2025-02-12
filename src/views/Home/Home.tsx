import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizQuestion from "../../components/QuizQuestion/QuizQuestion.tsx";

const Home = () => {
  const [quests, setQuests] = useState([]);

  const onGetQuest = () => {
    axios
      .get(process.env.REACT_APP_SERVER_HOST + "/api/quests/all")
      .then((resp) => {
        setQuests(resp.data);
      });
  };
  useEffect(() => {
    onGetQuest();
  }, []);

  return (
    <div>
      {quests?.map((quest, index) => (
        <QuizQuestion title={quest.name} id={index} />
      ))}
    </div>
  );
};

export default Home;
