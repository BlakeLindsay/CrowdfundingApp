import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCampaign = (props) => {
  const [campaignName, setCampaignName] = useState("");
  const [fundGoal, setFundGoal] = useState("");
  const [campaignType, setCampaignType] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [detailDesc, setDetailDesc] = useState("");
  const [pic, setPic] = useState(null); // State to hold the selected file
  const navigate = useNavigate();

  async function handleCreateCampaign(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("campaignName", campaignName);
      formData.append("fundGoal", fundGoal);
      formData.append("campaignType", campaignType);
      formData.append("shortDesc", shortDesc);
      formData.append("detailDesc", detailDesc);
      formData.append("pic", pic);

      const response = await fetch("http://localhost:4000/create", {
        method: "POST",
        body: formData,
      });

      const results = await response.json();
      console.log(response.status);
      props.setToken(results.token);
      if (response.status === 200) {
        console.log("Campaign Created");
        console.log("Token:", results.token);
        props.setToken(results.token);
        navigate("/my-campaign"); // Navigate to your campaigns page
      } else {
        console.log("Campaign Could Not Be Created");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Handle file input change
  function handleFileChange(e) {
    const file = e.target.files[0];
    setPic(file);
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen pt-4">
      <h2 className="text-[28px] font-bold text-white mb-6 text-center">Create a New Campaign</h2>
      <div className="w-full max-w-md bg-cyan-900 rounded-xl shadow-md py-8 px-8 overflow-y-auto">
        <form className="flex flex-col" onSubmit={handleCreateCampaign}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="campaignName">
              Campaign Name
            </label>
            <input
              className="w-full bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
              id="campaignName"
              type="text"
              placeholder="Enter your campaign name"
              onChange={(e) => setCampaignName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="fundraisingGoal">
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
        <label htmlFor="dropdown" className="block text-white text-sm font-bold mb-2">
          Select an Option
        </label>
        <select
         className="w-full bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
          id="dropdown"
          name="dropdown"
          onChange={(e) => setCampaignType(e.target.value)}
        >
          <option value="option1">Medical</option>
          <option value="option2">Memorial</option>
          <option value="option3">Emergency</option>
          <option value="option4">Nonprofit</option>
          <option value="option5">Financial Emergency</option>
          <option value="option6">Animals</option>
        </select>
      </div>
      <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="shortDescription">
              Short Description
            </label>
            <input
              className="w-full bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
              id="fundraisingGoal"
              type=""
              placeholder="Short Description Here"
              onChange={(e) => setShortDesc(e.target.value)}
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="detailedDesc">
              A Detailed Description
            </label>
            <input
              className="placeholder:-translate-y-16 w-full h-40 bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
              id="fundraisingGoal"
              type="text"
              placeholder="Details Here"
              onChange={(e) => setDetailDesc(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="photo">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              id="photo"
              onChange={handleFileChange}
              className="w-full bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2 mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
            />
          </div>
          {pic && (
            <div className="mb-4">
              <img
                src={URL.createObjectURL(pic)} // Create a URL for the selected file
                alt="Uploaded Campaign"
                className="max-w-full h-auto"
              />
            </div>
          )}
          <button
            className="bg-teal-500 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-600 transition ease-in duration-200"
            type="submit"
          >
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;
