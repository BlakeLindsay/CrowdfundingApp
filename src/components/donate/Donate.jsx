import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Donate({userID}) {
	const [amount, setAmount] = useState(0);
	const [message, setMessage] = useState("");
	const [donationName, setDonationName] = useState("");
	const location = useLocation();
  const { campaignId } = location.state;
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:4000/donation", {
				headers: new Headers({
					"Content-Type": "application/json",
				}),
				method: "POST",
				body: JSON.stringify({
					amount,
					message,
					donationName,
					userID,
					campaignId
				})
			});
			const results = await response.json();
			console.log(results);

			if (response.status === 200) {
				navigate("/campaign", { state: { campaignId }});
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="donation name" onChange={(e) => setDonationName(e.target.value)} />
				<input type="number" placeholder="amount" onChange={(e) => setAmount(e.target.value)} />
				<input type="text" placeholder="message" onChange={(e) => setMessage(e.target.value)} />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default Donate;