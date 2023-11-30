import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
    
    const IndividualCampaign = () => {
      const { campaignName } = useParams();
      const [campaign, setCampaign] = useState(null);
    
      useEffect(() => {
        console.log("Campaign ID:", campaignName);
        const fetchData = async () => {
          try {
            const authToken = localStorage.getItem("token");
            const response = await fetch(`http://localhost:4000/campaign/${campaignName}`, {
              headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': authToken,
              }),
              method: "GET",
            });
    
            if (response.status === 200) {
              const result = await response.json();
              setCampaign(result);
            } else {
              console.log("Campaign not found");
            }
          } catch (error) {
            console.error("Error fetching campaign details:", error);
          }
        };
    
        fetchData();
      }, [campaignName]);
    
      if (!campaign) {
        return <div>Loading...</div>;
      }
    
      return (
        <div className="p-5 sm:p-0">
        
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-md bg-cyan-900 rounded-xl shadow-md py-8 px-8 mb-40 md:mt-40">
              <h2>{campaign.campaignName}</h2>
              <p>Fundraising Goal: ${campaign.fundGoal}</p>
              <p>Campaign Type: {campaign.campaignType}</p>
              <p>Short Description: {campaign.shortDesc}</p>
              <p>Detailed Description: {campaign.detailDesc}</p>
        </div> 
        </div>
      </div>
      );
    };
    
  
    
      
       
    
 

export default IndividualCampaign