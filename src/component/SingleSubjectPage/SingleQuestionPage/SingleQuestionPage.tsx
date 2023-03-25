import "./SingleQuestionPage.css";
import { IQuestions } from "../../../store/slices/QuestionsSlice";
import { useState } from "react";

export interface IQuestionCard {
	question?: IQuestions;
}

const SingleQuestionPage: React.FC<IQuestionCard> = (props: IQuestionCard) => {
	const [ShowAnswers, setShowAnswers] = useState<boolean>(false);
	const currentQuestion = props.question;
	return (
		<div className="question-content">
			<div className="question-header">{currentQuestion?.header}</div>
			<div className="question-username">{currentQuestion?.userName}</div>
			<div className="question-title">{currentQuestion?.title}</div>
			<div className="buttons-container">
				<button
					className="button show-answer"
					onClick={() => {
						ShowAnswers ? setShowAnswers(false) : setShowAnswers(true);
					}}>
					{ShowAnswers ? "Hide answers" : "Show answers"}
				</button>
				<button className="button add-answer">Add answer</button>
			</div>
			{ShowAnswers && <div className="answers-container"></div>}
		</div>
	);
};

export default SingleQuestionPage;
