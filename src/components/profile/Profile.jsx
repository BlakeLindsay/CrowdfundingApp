import React, { useState, useEffect } from "react";

function Profile({ token, userID }) {
  const [imageFile, setImageFile] = useState("");
  const [imageURL, setImageURL] = useState("");

  if (token) {
    initProfile();
  }

  return (
    <div className="p-5 sm:p-0">
      <div className="flex flex-col items-center justify-center overflow-y">
        <div className="w-full max-w-md bg-cyan-900 rounded-xl shadow-md py-8 px-8 mb-40 md:mt-20">
          <h2 className="text-[28px] font-bold text-white mb-4 text-center">
            My Profile
          </h2>
          <img
            src={`${imageURL}`}
            alt="profile"
            className="rounded-full mx-auto pt-5 shadow-md object-cover"
          />
          <div className="max-w-md mx-auto text-center p-4">
            <form
              onSubmit={submitImageFile}
              className="bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2 mt-4 mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900 "
            > <h2 className="text-[18px] font-bold text-cyan-900 mt-2 mb-2 text-center">
            Choose a profile picture
          </h2>
					<div className="space-x-2 mb-3">
						<button className="relative cursor-pointer bg-teal-800 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-700 transition ease-in duration-200 "> 
						<label className="relative cursor-pointer bg-teal-800 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-700 transition ease-in duration-200">
              {imageFile ? "File Chosen: " + imageFile.name : "Choose a file"}
              <input
                name="file"
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="sr-only"
              />
            </label>
              </button>
              <button
                type="submit"
                className="bg-cyan-600 mt-4 text-white font-medium py-2 px-4 rounded-md hover:bg-cyan-700 transition ease-in duration-200"
              >
                Submit Photo
              </button></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  async function initProfile() {
    try {
      await getImageLink();
    } catch (error) {
      console.log(error);
    }
  }

  async function getImageLink() {
    try {
      const res = await fetch(
        "http://localhost:4000/user/profileimage/geturl",
        {
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: token,
          }),
          method: "GET",
        }
      );
      const response = await res.json();
      const { url } = response;

      if (res.status === 200) {
        setImageURL(url);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function submitImageFile(e) {
    e.preventDefault();
    try {
      const file = imageFile;

      const res = await fetch(
        "http://localhost:4000/user/profileimage/makeurl",
        {
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: token,
          }),
          method: "GET",
        }
      );

      const response = await res.json();
      const url = response.url;

      await fetch(url, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "multipart/form-data",
        }),
        body: file,
      });

      const imgURL = url.split("?")[0];

      setImageURL(imgURL);

      const res2 = await fetch(
        `http://localhost:4000/user/profileimage/saveurl`,
        {
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: token,
          }),
          method: "POST",
          body: JSON.stringify({
            url: imgURL,
          }),
        }
      );

      if (res2.status !== 200) {
        alert("The profile image did not save correctly.");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default Profile;
