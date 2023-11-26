import React, { useState, useEffect } from "react";

function Profile() {
	const [imageFile, setImageFile] = useState();
	const [imageURL, setImageURL] = useState();

	useEffect(() => {submitImageFile(imageFile)}, [imageFile]);

	return (
		<div>
			<input type="file" onChange={(e) => {
				console.log(e);
				setImageFile(e.target.files[0]);
				return;
			}} />
			{/* <button onClick={submitImageFile}>submit imageFile</button> */}
			<img src={`${imageURL}`} />
		</div>
	);

	async function submitImageFile(file) {
		console.log(file);

		// fetch to server to get link from s3
		const {url} = await fetch('http://localhost:4000/user/profileimage/makeurl').then(res => res.json());
		console.log(url);

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
	};
}

export default Profile;