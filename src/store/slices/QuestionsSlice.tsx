import { createSlice } from '@reduxjs/toolkit';
import { ObjectId } from 'mongoose';
export interface IQuestions {
	userName: string;
	date: Date;
	title: string;
	subjectId: string;
	header: string;
	answers: ObjectId[];
}

const dataQuestions = async () => {
	try {
		const response = await fetch('http://localhost:8000/questions', {
			method: 'GET',
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log();
	}
};
const questions: IQuestions[] = await dataQuestions();
console.log(questions);
export const questionsSlice = createSlice({
	name: 'Questions',
	initialState: {
		value: questions,
		filteredValue: {},
	},
	reducers: {
		setAllQuestions: (state) => {
			state.filteredValue = state.value;
		},
	},
});

export const { setAllQuestions } = questionsSlice.actions;

export default questionsSlice.reducer;