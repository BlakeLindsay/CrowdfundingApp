import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Donate({ userID }) {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [donationName, setDonationName] = useState("");
  const location = useLocation();
  const { campaignId } = location.state;
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/donation", {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        method: "POST",
        body: JSON.stringify({
          amount,
          message,
          donationName,
          userID,
          campaignId,
        }),
      });
      const results = await response.json();
      console.log(results);

      if (response.status === 200) {
        navigate("/campaign", { state: { campaignId } });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-5 sm:p-0">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-cyan-900 rounded-xl shadow-md py-8 px-8 mb-40 md:mt-40">
				<h2 className="text-[28px] font-bold text-white mb-6 text-center">
            Donate
          </h2>
          <form className="flex flex-col"  onSubmit={handleSubmit}>
            <input
						className="bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
              type="text"
              placeholder="Donators Name"
              onChange={(e) => setDonationName(e.target.value)}
            />
            <input
						className="bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
              type="number"
              placeholder="Amount $"
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
						className="bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
              type="text"
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className='bg-teal-500 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-600 transition ease-in duration-200' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Donate;
