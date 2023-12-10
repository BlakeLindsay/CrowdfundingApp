import React, {   useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function Profile({ token, userID }) {
  const [imageFile, setImageFile] = useState("");
  const [imageURL, setImageURL] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
  const [campaignName, setCampaignName] = useState("");
	

	useEffect(() => {
		const fetchAdminStatus = async () => {
			try {
				console.log('UserID:', userID);
				console.log('isAdmin:', isAdmin);
				// Check if userID is a valid ObjectId
				const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(userID);
	
				if (isValidObjectId) {
					const response = await fetch(
						`http://localhost:4000/user/adminStatus/${userID}`,
						{
							headers: new Headers({
								"Content-Type": "application/json",
								Authorization: token,
							}),
							method: "GET",
						}
					);
	
					if (response.status === 200) {
						const data = await response.json();
						setIsAdmin(data.isAdmin);
					} else {
						console.error("Failed to fetch admin status");
					}
				} else {
					console.error("Invalid userID format");
				}
			} catch (error) {
				console.error("Error fetching admin status:", error);
			}
		};
	
		// Fetch admin status when the component mounts
		fetchAdminStatus();
	}, [userID, token]);

  if (token) {
    initProfile();
  }

	// const handleDeleteUser = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const response = await fetch(`/api/user/delete/${owner}`, {
	// 			method: 'DELETE',
	// 			headers: {
	// 				Authorization: token, // Include the user's token for authentication
	// 			},
	// 		});
	
	// 		if (response.ok) {
	// 			// Handle success (e.g., show a success message)
	// 		} else {
	// 			// Handle errors (e.g., show an error message)
	// 		}
	// 	} catch (error) {
	// 		console.error('Error:', error);
	// 		// Handle errors (e.g., show an error message)
	// 	}
	// };

  const handleDeleteCampaign = async (e) => {
    e.preventDefault();
    try {
			const response = await fetch(
				`http://localhost:4000/campaign/delete/${campaignName}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

      if (response.status === 200) {
        console.log("Campaign deleted successfully");
      } else {
        console.log("Failed to delete campaign");
      }
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

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
						{isAdmin && (
              <div>
                {/* <form onSubmit={handleDeleteUser} className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">
                    Enter Username to Delete User:
                  </label>
                  <input
                    type="text"
                    value={deleteUsername}
                    onChange={(e) => setDeleteUsername(e.target.value)}
                    className="bg-gray-200 rounded-full px-4 py-2 w-full"
                  />
                  <button
                    type="submit"
                    className="bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600 transition ease-in duration-200 mt-2"
                  >
                    Delete User
                  </button>
                </form> */}

                <form onSubmit={handleDeleteCampaign}>
                  <label className="block text-white text-sm font-bold mb-2">
                    Enter Campaign Name to Delete:
                  </label>
                  <input
                    type="text"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="bg-gray-200 rounded-full px-4 py-2 w-full"
                  />
                  <button
                    type="submit"
                    className="bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600 transition ease-in duration-200 mt-2"
                  >
                    Delete Campaign
                  </button>
                </form>
              </div>
            )}
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
