import '../HomePage/HomePage.css';
import Navbar from '../General/Navbar/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './singleTip.css';
import like from './image/like.svg';
import { useState } from 'react';
import { ObjectId, Types } from 'mongoose';
import { ITips } from '../../store/slices/TipsSlice';

const SingleTip: React.FC = () => {
	const user = JSON.parse(sessionStorage.getItem('user') || '{}');
	const tipsData = useSelector((state: RootState) => state.tips.value);
	const [number, setNumber] = useState<number>(0);
	const handlePlus = async (e: React.MouseEvent, _id: ObjectId) => {
		const newData = tipsData.find((data: ITips) => {
			return data._id === _id;
		});
		console.log(newData);
		if (newData && newData.likes !== undefined) {
			const updatedData = { ...newData }; // create a new object with the same properties as newData
			updatedData.likes += 1; // modify the likes property on the new object
			console.log(updatedData.likes);
			await addLike(_id, updatedData);
		}
	};

	const addLike = async (_id: ObjectId, newData: ITips) => {
		console.log(_id);
		console.log(newData);
		try {
			const response = await fetch(`http://localhost:8000/tips/`, {
				method: 'PUT',
				body: JSON.stringify({
					_id: _id,
					data: newData,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			});
			const data = await response.json();
			window.location.reload();
			if (!response.ok) {
				throw new Error(data.message);
			}
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
	const closeButton = async (id: ObjectId) => {
		console.log(id);
		await deleteTips(id);
	};

	const deleteTips = async (_id: ObjectId) => {
		console.log(_id);
		try {
			const response = await fetch(`http://localhost:8000/tips/`, {
				method: 'DELETE',
				body: JSON.stringify({
					_id: _id,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					Authorization: `Bearer ${user.token}`,
				},
			});
			const data = await response.json();
			window.location.reload();
			if (!response.ok) {
				throw new Error(data.message);
			}
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
	return (
		<div className="Tips-Page">
			<div id="all-the-tips">
				{tipsData.map((data: any) => {
					return (
						<div
							id="tip"
							key={data._id}>
							{user.userType === 'admin' && (
								<span
									id="closeButton"
									onClick={() => closeButton(data._id)}
									className="close">
									&times;
								</span>
							)}
							<div id="title">{data.title}</div>
							<div id="comment">{data.comment}</div>
							<div id="username">{data.username}</div>
							<div>
								<img
									src={like}
									alt="like"
									id="like"
									onClick={(e) => {
										handlePlus(e, data._id);
									}}
								/>
								<div>{data.likes}</div>
							</div>
							<div id="approved">{data.approved ? 'true' : ''}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SingleTip;
