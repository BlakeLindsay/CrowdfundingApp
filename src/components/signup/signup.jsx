import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Signup(props) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
	const [imageFile, setImageFile] = useState();
	const [imageURL, setImageURL] = useState();

	useEffect(() => {submitImageFile(imageFile)}, [imageFile]);
  
  const signupRoute = "http://localhost:4000/user/signup";

  async function displayInputFields(e) {
    e.preventDefault();
    console.log("testing this function");
    console.log(userName);
    console.log(email);
    console.log(password);

    try {
			console.log('tried');
      const response = await fetch(signupRoute, {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        method: "POST",
        body: JSON.stringify({
          userName,
          email,
          password,
        }),
      });

      let results = await response.json();
      // console.log(results);
      props.setToken(results.token);

      if (response.status === 200) {
        navigate("/");//navigate to homepage
      } else {
        // Signup failed, handle the error (e.g., display an error message)
        console.log("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }

  return (
    <div className="p-5 sm:p-0">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-cyan-900 rounded-xl shadow-md py-8 px-8">
          <h2 className="text-[28px] font-bold text-white mb-6 text-center">
            Sign Up
          </h2>
          <form className="flex flex-col" onSubmit={displayInputFields}>           
            <input
                placeholder="User Name"
                className="bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
                type="text" 
                onChange={(e) => setUserName(e.target.value)}/>                
            <input
                placeholder="Email"
                className="bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
                type="email" 
                onChange={(e) => setEmail(e.target.value)}/>
              <input
                placeholder="Password"
                className="bg-teal-50 text-cyan-900 border-0 font-bold rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
                type="password"
                onChange={(e) => setPassword(e.target.value)} />
                
                <button className='bg-teal-500 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-600 transition ease-in duration-200' type="submit">Submit</button>
                <p className='text-white mt-4 text-center'>Already have an account?
                <a className='text-teal-200 hover:underline mt-4 px-1' href='/login'>Login</a></p>
          </form>
					<input type="file" onChange={(e) => {
						console.log(e);
						setImageFile(e.target.files[0]);
						return;
					}} />
					{/* <button onClick={submitImageFile}>submit imageFile</button> */}
					<img src={`${imageURL}`} />
        </div>
      </div>
    </div>
  );

	async function submitImageFile(file) {
		console.log(file);

		// fetch to server to get link from s3
		const {url} = await fetch('http://localhost:4000/user/geturl').then(res => res.json());
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

export default Signup