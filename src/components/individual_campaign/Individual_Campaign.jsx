import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const IndividualCampaign = ({userID, token}) => {
  // const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const location = useLocation();
  const { campaignId } = location.state;
  const navigate = useNavigate();
  

  const calculateProgressBarWidth = () => {
    if (!campaign) {
      return "0%"; // or any default value you prefer
    }

    const percentage = (campaign.fundRaised / campaign.fundGoal) * 100;

    if (isNaN(percentage)) {
      return "0%";
    } else {
      return `${Math.min(percentage, 100)}%`;
    }
  };

  const handleDeleteCampaign = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/campaign/delete/${campaignId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            'Authorization': token
          },
        }
      );

      if (response.status === 200) {
        navigate(`/`);
        console.log("Campaign deleted successfully");
      } else {
        console.log("Failed to delete campaign");
      }
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  useEffect(() => {
    console.log("Campaign ID:", campaignId);
    const fetchData = async () => {
      try {
        // const authToken = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:4000/campaign/${campaignId}`,
          {
            headers: new Headers({
              "Content-Type": "application/json",
              // 'Authorization': authToken,
            }),
            method: "GET",
          }
        );

        if (response.status === 200) {
          const result = await response.json();
          console.log(result);
          setCampaign(result.campaign);
          
        } else {
          console.log("Campaign not found");
        }
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      }
    };

    fetchData();
  }, [campaignId]);

  if (!campaign) {
    return <div>Loading...</div>;
  }

  console.log("Campaign Name:", campaign.campaignName);
  console.log("Fundraising Goal:", campaign.fundGoal);
  console.log("OwnerId:", campaign.ownerID)
  console.log("UserId:", userID)

  return (
    <div className="p-5 sm:p-0">
      <div className="flex flex-col items-center justify-center overflow-y-scroll">
        <div className="w-full max-w-md bg-cyan-900 rounded-xl shadow-md pb-8 px-8 mb-40 md:mt-20">
          <h2 className="text-[28px] font-bold text-white mb-6 mt-5 text-center">
            {campaign.campaignName}
          </h2>
          <p className="block text-white text-sm font-bold mt-4 mb-2 ">
            Fund↑Riser: {campaign.owner}
          </p>
          <p className="block text-white text-sm font-bold mb-2">
            Short Description: {campaign.shortDesc}
          </p>

          <div className="pt-2">
            <div className="w-full bg-gray-200 rounded-full max-h-3.5 dark:bg-gray-500 text-xs font-bold text-blue-100 text-center ">
              <div
                className="bg-teal-400 max-h-3.5 text-xs font-bold  text-teal-400 rounded-full"
                style={{ width: calculateProgressBarWidth() }}
              >
                {" "}
                '
              </div>
              ${campaign.fundRaised} of ${campaign.fundGoal} Raised
            </div>
            <p className="block pt-5 text-white text-sm font-bold mb-2">
              Campaign Type: {campaign.campaignType}
            </p>
            <p className="block text-white text-sm font-bold mb-2">
              Fundraising Goal: ${campaign.fundGoal}
            </p>
            {campaign.campaignImageLink && (
              <img
                className="pt-2"
                src={campaign.campaignImageLink}
                alt="Campaign"
              />
            )}
            <p className="block text-white text-sm font-bold mt-4 mb-2 ">
              Detailed Description: {campaign.detailDesc}
            </p>

            <div className="flex justify-center">
              <button
                className="bg-teal-400 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-600 transition ease-in duration-200"
                type="submit"
              >
                Donate
              </button>
            </div>

            {userID === campaign.ownerID ? 
                <div className="flex justify-center pt-3">
                  <button
                    className="bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600 transition ease-in duration-200"
                    onClick={handleDeleteCampaign}
                  >
                    Delete Campaign
                  </button>
                </div>
              : null } 
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualCampaign;
