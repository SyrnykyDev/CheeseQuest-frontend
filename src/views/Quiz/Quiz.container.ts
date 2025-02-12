import { useState } from "react";
import { useParams } from "react-router";

const QuizContainer = () => {
  const [quiz, setQuiz] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const [commentText, setCommentText] = useState<any>("");
  const [reviews, setReviews] = useState<any>();
  const [isFavourite, setIsFavourite] = useState(false);
  const params = useParams();
  const [seconds, setSeconds] = useState<number>(null);

  return {
    states: {
      quiz,
      loading,
      commentText,
      reviews,
      isFavourite,
      seconds,
      params,
    },
    functions: {
      setQuiz,
      setLoading,
      setCommentText,
      setReviews,
      setIsFavourite,
      setSeconds,
    },
  };
};

export default QuizContainer;
