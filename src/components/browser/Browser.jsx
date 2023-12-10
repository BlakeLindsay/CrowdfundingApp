import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Browser = () => {
  const [campaignType, setCampaignType] = useState("");
  const [allCards, setAllCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all campaigns when the component mounts
    fetchAllCampaigns();
  }, []);

  async function fetchAllCampaigns() {
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:4000/campaign/getall`, {
        headers: {
          "Content-Type": "application/json",
          // You can include additional headers like 'Authorization' if needed
        },
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setAllCards(data.campaigns); // Save all campaign data
        setFilteredCards(data.campaigns); // Initially set filtered cards to all cards
      } else {
        console.error("Failed to fetch campaign data:", response.status);
        // Handle error cases if needed
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error cases if needed
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (e) => {
    const newCampaignType = e.target.value;
    setCampaignType(newCampaignType);

    // After updating the campaign type, trigger the search immediately
    handleSearch();
  };

  const handleSearch = () => {
    // Filter cards based on the search term and type
    const filtered = allCards.filter(
      (card) =>
        card.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        card.campaignType.toLowerCase().includes(campaignType.toLowerCase())
    );

    // Update the state with filtered cards
    setFilteredCards(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);

		searchCategory(category);
  };

	async function searchCategory(category) {
		try {
			const response = await fetch(`http://localhost:4000/campaign/search/category/${category}`, {
				headers: {
					"Content-Type": "application/json",
					// You can include additional headers like 'Authorization' if needed
				},
				method: "GET",
			});

			const results = await response.json();
			setFilteredCards(results.campaigns);
		} catch (error) {
			console.log(error);
		}
	};

	function handleNavigate(card) {
		navigate('/campaign', {
			state: { campaignId: card._id }
		})
	}

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full sm:w-[50%]">
          <form>
            <div className="flex">
              <label
                htmlFor="search-dropdown"
                className="mb-2 text-sm font-medium text-cyan-900 sr-only dark:text-white"
              >
                Select a category:
              </label>

              {/* Dropdown Button */}
              <button
                id="dropdown-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 pr-1 pl-2 text-sm font-medium text-center text-white bg-cyan-800 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-cyan-700 dark:bg-cyan-1000 dark:hover:bg-cyan-700 dark:focus:ring-cyan-900 dark:text-white dark:border-cyan-900"
                type="button"
              >
                {selectedCategory}
                <svg
                  className={`w-2.5 h-2.5 ms-2.5 transition-transform overflow-y ${
                    isDropdownOpen ? "transform rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* Dropdown List */}
              <div
                id="dropdown"
                className={`${
                  isDropdownOpen ? "block" : "hidden"
                } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 overflow-y-auto`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  <li>
                    <button
                      type="button"
                      onClick={() => fetchAllCampaigns()}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      All categories
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange("Medical")}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Medical
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange("Memorial")}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Memorial
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange("Emergency")}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100  dark:hover:bg-cyan-900  dark:hover:text-white"
                    >
                      Emergency
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange("Non-Profit")}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-cyan-700  dark:hover:text-white"
                    >
                      Non-Profit
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange("Financial Emergency")}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-cyan-700  dark:hover:text-white"
                    >
                      Financial Emergency
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange("Animals")}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-cyan-700  dark:hover:text-white"
                    >
                      Animals
                    </button>
                  </li>
                </ul>
              </div>
              <div className="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-cyan-900 rounded-e-lg border-s-gray-50 border-s-2 border border-cyan-900 focus:ring-cyan-600 focus:border-cyan-600 dark:bg-cyan-1000 dark:border-s-gray-700 dark:border-cyan-900 dark:placeholder-gray-400 dark:text-white dark:focus:border-cyan-900"
                  placeholder="Search Campaigns..."
                  required
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2 text-sm font-medium h-full text-white bg-cyan-900 rounded-e-lg border border-cyan-900 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-500 dark:hover:bg-cyan-600 dark:focus:ring-cyan-600"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Card List */}
        <div
          id="cardList"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 autoflow-y"
        >
          {/* Mapping over filtered cards and rendering each card */}
          {loading && <p>Loading...</p>}
          {!loading &&
            filteredCards.map((card) => (
              <div
                key={card._id}
                className="bg-white p-4 border border-gray-300 rounded"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {card.campaignName}
                </h2>
                <p className="text-gray-700 mb-4">
                  <strong>Fundraising Goal:</strong> ${card.fundGoal}
                </p>
                <p>
                  {card.campaignImageLink && (
                    <img
                      className="pt-2"
                      src={card.campaignImageLink}
                      alt="Campaign"
                    />
                  )}
                </p>
                {/* Additional card details can be added here */}
                <button className="bg-blue-500 text-white p-2 rounded"
								onClick={() => handleNavigate(card)}
								>
                  View Details
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Browser;
