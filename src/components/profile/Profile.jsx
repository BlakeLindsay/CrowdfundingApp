import React, { useState, useEffect } from "react";

function Profile({token, userID}) {
	const [imageFile, setImageFile] = useState("");
	const [imageURL, setImageURL] = useState("");

	// useEffect(() => {initProfile()}, []);

	console.log(token);
	if (token) {
		initProfile();
	}

	return (
		<div>
			<form onSubmit={submitImageFile}>
				<input name="file" type="file" onChange={(e) => setImageFile(e.target.files[0])}/>
				{/* <input name="image" type="image" /> */}
				<button type="submit">submit</button>
			</form>
			<img src={`${imageURL}` } alt="profile picture" />
		</div>
	);

	async function initProfile() {
		try {
			const res = await getImageLink();
		} catch (error) {
			console.log(error);
		}
	}

	async function getImageLink() {
		try {
			console.log(token);
			const res = await fetch('http://localhost:4000/user/profileimage/geturl', {
				headers: new Headers({
					'Content-Type': 'application/json',
					'Authorization': token
				}),
				method: 'GET'
			});
			const response = await res.json();
			const {url} = response;

			if(res.status === 200) {
				console.log(url);
				setImageURL(url);
			}

		} catch (error) {
			console.log(error);
		}
	};

	async function submitImageFile(e) {
		e.preventDefault();
		try {
			const file = imageFile;

			console.log(file);

			// fetch to server to get link from s3
			const res = await fetch('http://localhost:4000/user/profileimage/makeurl', {
				headers: new Headers({
					'Content-Type': 'application/json',
					'Authorization': token
				}),
				method: 'GET'
			});

			const response = await res.json();
			const url = response.url;

			// fetch to s3 to upload image
			await fetch(url, {
				method: "PUT",
				headers: new Headers({
					"Content-Type": "multipart/form-data"
				}),
				body: file
			});

			// fetch to our server to post link
			const imgURL = url.split('?')[0];

			console.log(imgURL);

			setImageURL(imgURL);

			const res2 = await fetch(`http://localhost:4000/user/profileimage/saveurl`, {
				headers: new Headers({
					'Content-Type': 'application/json',
					'Authorization': token
				}),
				method: 'POST',
				body: JSON.stringify({
					url: imgURL
				})
			});

			if(res2.status !== 200) {
				alert('The profile image did not save correctly.');
			}
		} catch (error) {
			console.log(error);
		}
	};
}

export default Profile;