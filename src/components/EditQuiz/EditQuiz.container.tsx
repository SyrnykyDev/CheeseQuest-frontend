import { ChangeEvent, useEffect, useRef, useState } from "react";
import RandomNumber from "../../utils/randomNumber";
import axios from "axios";
import { addNotification } from "../../store/userSlice.ts";
import { useDispatch } from "react-redux";

export type questionTypes = "openAnswers" | "testQuestions";
interface IQuestion {
  question?: string;
  id: number;
  description?: string;
  timer?: number;
  position?: number;
  filled?: boolean;
  dirty?: boolean;
  type?: questionTypes;
}
const EditQuizContainer = () => {
  const dispatch = useDispatch();
  const [questName, setQuestName] = useState("");
  const [questDesc, setDesc] = useState("");
  const token = localStorage.getItem("Authorization");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const [activeQuestion, setActiveQuestion] = useState<null | number>(null);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [createdQuestId, setCreatedQuestId] = useState(null);

  useEffect(() => {
    if (!questions.find((elem) => elem.id == activeQuestion))
      setActiveQuestion(null);
  }, [questions]);

  const onAddQuestion = (value: boolean) => {
    if (value) {
      setQuestions([
        ...questions,
        {
          question: "",
          id: RandomNumber(),
          description: "",
          position: questions.length + 1,
        },
      ]);
    } else {
      if (!createdQuestId) return;
      setQuestions([
        ...questions,
        {
          question: "",
          id: RandomNumber(),
          description: "",
          position: questions.length + 1,
        },
      ]);
    }
  };

  const onSelectQuestion = (id: number) => {
    setActiveQuestion(id);
  };
  const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
    }
  };
  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onQuestionDelete = (id: number) => {
    if (id === activeQuestion) setActiveQuestion(null);
    setQuestions((prevState) => prevState.filter((elem) => elem.id != id));
    setQuestions((prevState) => {
      return prevState.map((elem, index) => {
        elem.position = index + 1;
        return elem;
      });
    });
  };

  const onQuestionChange = (key: keyof IQuestion, value: any) => {
    let editableQuestion = questions.find((elem) => elem.id == activeQuestion);
    editableQuestion = { ...editableQuestion, [key]: value };
    editableQuestion.dirty = true;
    if (editableQuestion?.description && editableQuestion?.question) {
      editableQuestion.filled = true;
    } else {
      editableQuestion.filled = false;
    }

    if (editableQuestion)
      setQuestions((prevState) => {
        let indexV;
        let newState2 = prevState;
        let newState = prevState.filter((elem, index) => {
          if (elem.id == activeQuestion) indexV = index;
          return elem.id != activeQuestion;
        });
        // newState2[indexV] = { ...editableQuestion };
        console.log("test", newState2);
        newState2[indexV] = editableQuestion;

        return [...newState2];
      });
  };

  const onQuestionTypeChange = (value: questionTypes) => {
    onQuestionChange("type", value);
  };

  const onSaveQuiz = () => {
    if (!createdQuestId || !imageFile) return;
    const formData = new FormData();

    formData.append("questId", createdQuestId);
    formData.append("media", imageFile);
    formData.append("type", questions[activeQuestion].type);
    formData.append("question", questions[activeQuestion].question);
    formData.append("answer", "[{},{},{},{},0]");
    axios
      .post(process.env.REACT_APP_SERVER_HOST + "/api/task/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setCreatedQuestId(resp.data);

        onAddQuestion(true);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(() => {
        dispatch(
          addNotification({
            type: "error",
            message: "Sorry, quiz was not found...",
          }),
        );
      });
  };
  const onCreateQuiz = () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("name", questName);
    formData.append("description", questDesc);
    formData.append("media", imageFile);
    axios
      .post(process.env.REACT_APP_SERVER_HOST + "/api/quest/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setCreatedQuestId(resp.data);
        dispatch(
          addNotification({
            type: "success",
            message: "Now you can create a new task :)",
          }),
        );

        onAddQuestion(true);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(() => {
        dispatch(
          addNotification({
            type: "error",
            message: "Sorry, quiz was not found...",
          }),
        );
      });
  };
  return {
    functions: {
      onAddQuestion,
      onSelectQuestion,
      onQuestionDelete,
      onQuestionChange,
      onQuestionTypeChange,
      onCreateQuiz,
      updateImage,
      handleImageUploadClick,
      setQuestName,
      setDesc,
      onSaveQuiz,
    },
    states: {
      questions,
      activeQuestion,
      fileInputRef,
      questDesc,
      questName,
      createdQuestId,
      loading,
    },
  };
};

export default EditQuizContainer;
