import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCampaign = (props) => {
  const [campaignName, setCampaignName] = useState("");
  const [fundGoal, setFundGoal] = useState("");
  const [campaignType, setCampaignType] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [detailDesc, setDetailDesc] = useState("");
  const navigate = useNavigate();

  async function handleCreateCampaign(e) {
    e.preventDefault();

    const authToken = localStorage.getItem("token");
    

    const resetForm = () => {
      setCampaignName("");
      setFundGoal("");
      setCampaignType("");
      setShortDesc("");
      setDetailDesc("");
    };

    try {


      const response = await fetch("http://localhost:4000/campaign/create", {
        headers: new Headers({
					'Content-Type': 'application/json',
					'Authorization': authToken,
				}),
        method: "POST",
        body: JSON.stringify({
          campaignName,
          fundGoal,
          campaignType,
          shortDesc,
          detailDesc,
        }),
      });

      const results = await response.json();
      console.log(response.status);
      console.log("State before navigating:", { campaignId: results.madeCampaign._id });
      

      if (response.status === 200) {
        console.log("Campaign Created");
        // resetForm(); // Reset form fields
				console.log(results);
        // const createdCampaignName = results.campaignName;
        console.log("Created Campaign ID:", results.madeCampaign._id);

        navigate(`/campaign`, {state: {campaignId: results.madeCampaign._id}});
      } else {
        console.log("Campaign Could Not Be Created");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-5 sm:p-0">
    <div className="flex flex-col items-center justify-center h-screen">
    <div className="w-full max-w-md bg-cyan-900 rounded-xl shadow-md py-8 px-8 md:mt-40">
      <h2 className="text-[28px] font-bold text-white mb-6 text-center">Create a New Campaign</h2>
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
        <label htmlFor="campaignType" className="block text-white text-sm font-bold mb-2">
          Select an Option
        </label>
        <select
         className="w-full bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
          id="campaignType"
          name="dropdown"
          onChange={(e) => setCampaignType(e.target.value)}
        >
         <option value="Memorial">Select an Option</option> 
          <option value="Memorial">Memorial</option> 
          <option value="Medical">Medical</option>
          <option value="Emergency">Emergency</option>
          <option value="Nonprofit">Nonprofit</option>
          <option value="Financial Emergency">Financial Emergency</option>
          <option value="Animals">Animals</option>
        </select>
      </div>
      <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="shortDesc">
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
            <label className="block text-white text-sm font-bold mb-2" htmlFor="detailedDesc">
              A Detailed Description
            </label>
            <input
              className="placeholder:-translate-y-16 w-full h-40 bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
              id="detailedDesc"
              type="text"
              placeholder="Details Here"
              onChange={(e) => setDetailDesc(e.target.value)}
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="pic">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              id="pic"
              onChange={handleFileChange}
              className="w-full bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2 mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
            />
          </div> */}
         {/*  {pic && (
            <div className="mb-4">
              <img
                src={URL.createObjectURL(pic)} // Create a URL for the selected file
                alt="Uploaded Campaign"
                className="max-w-full h-auto"
              />
            </div>
          )} */}
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
