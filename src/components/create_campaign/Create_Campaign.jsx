import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCampaign = ({ token }) => {
  const [campaignName, setCampaignName] = useState("");
  const [fundGoal, setFundGoal] = useState("");
  const [campaignType, setCampaignType] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [detailDesc, setDetailDesc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [campaignImageLink, setCampaignImageLink] = useState("");
  const [owner, setOwner] = useState("");
  const navigate = useNavigate();

  async function getS3Link() {
    try {
      const file = imageFile;

      // Fetch to the server to get the S3 link
      const res = await fetch(
        "http://localhost:4000/campaign/campaignimage/makeurl",
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

      // Fetch to S3 to upload the image
      await fetch(url, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "multipart/form-data",
        }),
        body: file,
      });

      // Extract the image URL from the S3 link
      const campaignImageLink = url.split("?")[0];

      return campaignImageLink;
    } catch (error) {
      console.error("Error getting S3 link:", error);
      // Handle errors, perhaps set an error state or show a user-friendly message
      return null;
    }
  }

  async function handleCreateCampaign(e) {
    e.preventDefault();

    try {
      // Fetch S3 link before form submission
      const s3Link = await getS3Link();

      if (s3Link !== null) {
        // Set the S3 link in the state
        setCampaignImageLink(campaignImageLink);

        // Create the campaign with the obtained S3 link
        const response = await fetch("http://localhost:4000/campaign/create", {
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: token,
          }),
          method: "POST",
          body: JSON.stringify({
            campaignName,
            fundGoal,
            campaignType,
            shortDesc,
            detailDesc,
            campaignImageLink: s3Link, // Use the S3 link obtained from getS3Link
            owner,
          }),
        });

        const results = await response.json();
        if (response.status === 200) {
          console.log("Campaign Created");
          resetForm();
          navigate(`/campaign`, {
            state: { campaignId: results.madeCampaign._id },
          });
        } else {
          console.log("Campaign Could Not Be Created");
        }
      } else {
        console.log("Unable to fetch S3 Link. Campaign not created.");
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  }

  const resetForm = () => {
    setCampaignName("");
    setFundGoal("");
    setCampaignType("");
    setShortDesc("");
    setDetailDesc("");
    setImageFile(null);
    setSelectedImage(null);
    setCampaignImageLink("");
    setOwner("");
  };

  return (
    <div className="p-5 sm:p-0 ">
      <div className="flex flex-col items-center justify-center overflow-y">
        <div className="w-full max-w-md bg-cyan-900 rounded-xl shadow-md py-8 px-8 md:mt-32">
          <h2 className="text-[28px] font-bold text-white mb-6 text-center">
            Create a New Campaign
          </h2>
          <form className="flex flex-col" onSubmit={handleCreateCampaign}>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="campaignName"
              >
                Campaign Name
              </label>
              <input
                className="w-full bg-teal-50 text-cyan-800 font-bold border-0 rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
                id="campaignName"
                type="text"
                placeholder="Enter your campaign name"
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="fundraisingGoal"
              >
                Fundraising Goal ($)
              </label>
              <input
                className="w-full bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
                id="fundraisingGoal"
                type="number"
                placeholder="Enter your fundraising goal"
                onChange={(e) => setFundGoal(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="campaignType"
                className="block text-white text-sm font-bold mb-2"
              >
                Select an Option
              </label>
              <select
                className="w-full bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
                id="campaignType"
                name="dropdown"
                onChange={(e) => setCampaignType(e.target.value)}
              >
                <option value="Select">Select an Option</option>
                <option value="Medical">Medical</option>
                <option value="Memorial">Memorial</option>
                <option value="Emergency">Emergency</option>
                <option value="Nonprofit">Nonprofit</option>
                <option value="Financial Emergency">Financial Emergency</option>
                <option value="Animals">Animals</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="shortDesc"
              >
                Short Description
              </label>
              <input
                className="w-full bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
                id="shortDesc"
                type=""
                placeholder="Short Description Here"
                onChange={(e) => setShortDesc(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="detailedDesc"
              >
                A Detailed Description
              </label>
              <textarea
                className="w-full h-40 bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2 mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
                id="detailedDesc"
                placeholder="Details Here"
                onChange={(e) => setDetailDesc(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-0"
                htmlFor="pic"
              >
                Upload Photo
              </label>

            <div className="bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2 mt-4 mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="max-w-full h-auto mb-4"
                  />
                )}
                <div className="flex items-center justify-center overflow-y">
                  <label className="relative cursor-pointer bg-teal-700 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-500 transition ease-in duration-200">
                    {imageFile
                      ? "File Chosen: " + imageFile.name
                      : "Choose a file"}
                    <input
                      name="file"
                      type="file"
                      onChange={(e) => {
                        setImageFile(e.target.files[0]);
                        setSelectedImage(
                          URL.createObjectURL(e.target.files[0])
                        );
                      }}
                      className="sr-only"
                    />
                  </label>
                  <button
                    type="submit"
                    className="bg-cyan-600  text-white font-medium py-2 px-4 rounded-md hover:bg-cyan-700 transition ease-in duration-200 ml-12"
                  >
                    Upload Photo
                  </button>
                </div>
              </div>
              </div>
            
            <button
              className="bg-teal-500 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-600 transition ease-in duration-200"
              type="submit"
            >
              Create Campaign
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
