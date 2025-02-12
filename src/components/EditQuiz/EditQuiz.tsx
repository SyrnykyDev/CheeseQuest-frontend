// *** STYLES ***
import styles from "./EditQuiz.module.scss";

// *** ASSETS ***
import addCircleSVG from "../../assets/add-circle.svg";

import React from "react";
import QuizQuestion from "../../components/QuizQuestion/QuizQuestion";
import EditQuizContainer from "../../components/EditQuiz/EditQuiz.container";
import Input from "../../components/Input/Input";
import MotionWrapper from "../../components/MotionWrapper/MotionWrapper";
import Button from "../../components/Button/Button";

interface IEditQuizProps {
  type?: "edit" | "create";
}
const EditQuiz = ({ type }: IEditQuizProps) => {
  const {
    functions: {
      onAddQuestion,
      onSelectQuestion,
      onQuestionDelete,
      onQuestionChange,
      onQuestionTypeChange,
      onCreateQuiz,
      updateImage,
      handleImageUploadClick,
    },
    states: { questions, activeQuestion, fileInputRef },
  } = EditQuizContainer();
  return (
    <div className={styles.editQuiz}>
      <div className={styles.editQuiz_container}>
        <div className={styles.editQuiz_questions}>
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ marginBottom: "10px" }}>Questions</span>
            <div
              onClick={() => {
                onAddQuestion();
              }}
              style={{ cursor: "pointer" }}
            >
              <img src={addCircleSVG} alt={"Add"} width={40} />
            </div>
          </div>
          <div className={styles.editQuiz_questions_container}>
            {questions.map((elem, index) => (
              <div onClick={() => onSelectQuestion(elem.id)} key={elem.id}>
                {/*{elem.id}*/}
                <MotionWrapper>
                  <QuizQuestion
                    editable={true}
                    title={""}
                    {...elem}
                    active={elem.id == activeQuestion}
                    onQuestionDelete={onQuestionDelete}
                  />
                </MotionWrapper>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div
            className={`${styles.editQuiz_params} ${styles.editQuiz_params_container}`}
          >
            <h2 style={{ height: "10px" }}>Quest</h2>
            <div className={styles.editQuiz_params_container_inputs}>
              <Input placeholder={"Quest name"} />
              <Input placeholder={"Quest description"} textField />
              <Button onClick={handleImageUploadClick}>Add image</Button>
              {/*<Input placeholder={"Quest description"} textField />*/}
            </div>
          </div>
          {activeQuestion != null &&
            questions.find((elem) => elem.id == activeQuestion) && (
              <div className={styles.editQuiz_params}>
                <Input
                  placeholder={"Enter the question"}
                  inputType={"round"}
                  required
                  value={
                    questions.find((elem) => elem.id == activeQuestion)
                      ?.question
                  }
                  onChange={(event) => {
                    onQuestionChange("question", event.target.value);
                  }}
                />
                <Input
                  placeholder={"Enter the description"}
                  required
                  value={
                    questions.find((elem) => elem.id == activeQuestion)
                      ?.description
                  }
                  inputType={"round"}
                  onChange={(event) => {
                    onQuestionChange("description", event.target.value);
                  }}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <Input
                    type={"number"}
                    placeholder={"Enter a time limit (mins)"}
                    inputType={"round"}
                    value={
                      questions.find((elem) => elem.id == activeQuestion)?.timer
                    }
                    onChange={(event) => {
                      onQuestionChange("timer", event.target.value);
                    }}
                  />
                  {/*<Input*/}
                  {/*  type={"number"}*/}
                  {/*  placeholder={"Enter a time limit (mins)"}*/}
                  {/*  inputType={"round"}*/}
                  {/*/>*/}
                </div>
                <span style={{ fontSize: "18px" }}>Select Quest Type:</span>
                <div style={{ display: "flex", gap: "15px" }}>
                  <Button
                    buttonType={"round"}
                    onClick={() => onQuestionTypeChange("openAnswers")}
                    active={
                      questions.find((elem) => elem.id == activeQuestion)
                        ?.type === "openAnswers"
                    }
                  >
                    Open answers
                  </Button>
                  <Button
                    buttonType={"round"}
                    onClick={() => onQuestionTypeChange("testQuestions")}
                    active={
                      questions.find((elem) => elem.id == activeQuestion)
                        ?.type === "testQuestions"
                    }
                  >
                    Test questions
                  </Button>
                  <Button
                    buttonType={"round"}
                    onClick={() => onQuestionTypeChange("imageObjectSearch")}
                    active={
                      questions.find((elem) => elem.id == activeQuestion)
                        ?.type === "imageObjectSearch"
                    }
                  >
                    Search for objects in the image
                  </Button>
                </div>
                <div style={{ margin: "auto 10px auto auto" }}>
                  <Button
                    onClick={() => {
                      onCreateQuiz();
                    }}
                  >
                    {type == "edit" ? "Edit" : "Create"}
                  </Button>
                </div>
              </div>
            )}
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept={"image/*"}
        style={{ display: "none" }}
        onChange={updateImage}
      />
    </div>
  );
};

export default EditQuiz;
