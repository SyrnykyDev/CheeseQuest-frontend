import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { isFavouriteCheck } from "../../utils/favourite.tsx";
import axios from "axios";
import { addNotification } from "../../store/userSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";

const QuizContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem("Authorization");

  const [quiz, setQuiz] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const [commentText, setCommentText] = useState<any>("");
  const [reviews, setReviews] = useState<any>();
  const [isFavourite, setIsFavourite] = useState(false);
  const params = useParams();
  const [seconds, setSeconds] = useState<number>(null);
  const [quizStarted, setQuizStarted] = useState<any>();
  const [isQuizShowed, setIsQuizShowed] = useState<any>(true);
  const [activeTask, setActiveTask] = useState<any>();

  const onQuizStart = () => {
    if (user.isAuthenticated) {
      setIsQuizShowed(false);
      setTimeout(() => {
        setQuizStarted(true);
        setIsQuizShowed(true);
      }, 1000);
    }
  };
  const onLoadQuiz = () => {
    axios
      .get(process.env.REACT_APP_SERVER_HOST + "/api/quest/" + params?.id)
      .then((resp) => {
        console.log(resp.data);
        setQuiz(resp.data?.quest);
        console.log(resp.data?.reviews);
        setReviews(resp.data?.reviews);
      })
      .catch(() => {
        navigate("/");
        dispatch(
          addNotification({
            type: "error",
            message: "Sorry, quiz was not found...",
          }),
        );
      });
  };
  useEffect(() => {
    onLoadQuiz();
  }, []);
  const onChangeFavourite = (value) => {
    setIsFavourite(value);
  };
  useEffect(() => {
    quiz && isFavouriteCheck(quiz?.id, onChangeFavourite);
  }, [isFavourite, quiz]);
  const onCommentAdd = () => {
    setLoading(true);
    axios
      .post(
        process.env.REACT_APP_SERVER_HOST + "/api/review/createReview",
        {
          message: commentText,
          questId: params?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        setCommentText("");
        onLoadQuiz();
        dispatch(
          addNotification({
            type: "success",
            message: "Comment sent successfully",
          }),
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    states: {
      quiz,
      loading,
      commentText,
      reviews,
      isFavourite,
      seconds,
      params,
      quizStarted,
      isQuizShowed,
    },
    functions: {
      setQuiz,
      setLoading,
      setCommentText,
      setReviews,
      setIsFavourite,
      setSeconds,
      onChangeFavourite,
      onLoadQuiz,
      onCommentAdd,
      onQuizStart,
    },
  };
};

export default QuizContainer;
