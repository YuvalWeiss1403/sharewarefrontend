import { createSlice } from '@reduxjs/toolkit';
import { ObjectId } from 'mongoose';
export interface IAnswers {
	questionsId: ObjectId;
	userName: string;
	date: Date;
	title: string;
}

const dataAnswers = async () => {
	try {
		const response = await fetch('http://localhost:8000/answers', {
			method: 'GET',
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log();
	}
};
const answers: IAnswers[] = await dataAnswers();
console.log(answers);
export const answersSlice = createSlice({
	name: 'Answers',
	initialState: {
		value: answers,
		filteredValue: {},
	},
	reducers: {
		setAllAnswers: (state) => {
			state.filteredValue = state.value;
		},
	},
});

export const { setAllAnswers } = answersSlice.actions;

export default answersSlice.reducer;