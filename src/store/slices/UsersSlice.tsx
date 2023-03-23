import { createSlice } from "@reduxjs/toolkit";
import { ObjectId } from "mongoose";

export interface IUser {
	firstName: string;
	_id: ObjectId;
	lastName: string;
	userName: string;
	email: string;
	password: string;
	token?: string;
	connect?: boolean;
}

const datausers = async () => {
	try {
		const response = await fetch("http://localhost:8000/users", {
			method: "GET",
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log();
	}
};
const users: IUser[] = await datausers();
export const userSlice = createSlice({
	name: "users",
	initialState: {
		value: users,
		filteredValue: {},
	},
	reducers: {
		setAllUsers: (state) => {
			state.filteredValue = state.value;
		},
	},
});

export const { setAllUsers } = userSlice.actions;

export default userSlice.reducer;
