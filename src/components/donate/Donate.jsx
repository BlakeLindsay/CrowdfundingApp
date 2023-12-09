import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Donate({userID}) {
	const [amount, setAmount] = useState(0);
	const [message, setMessage] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="number" placeholder="amount" onChange={(e) => setAmount(e.target.value)} />
				<input type="text" placeholder="message" onChange={(e) => setMessage(e.target.value)} />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default Donate;