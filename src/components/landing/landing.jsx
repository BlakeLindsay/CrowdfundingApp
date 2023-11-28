import React, { useEffect } from 'react';
import './landing.css';

const Landing = ({ token }) => {
  useEffect(() => {
    // Log the token whenever it changes
    console.log('Token value:', token);
  }, [token]); // Re-run the effect whenever the token changes

  return (
    <div className="p-5 sm:p-0">
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full py-8 px-8">
        <h2 className="text-[27px] md:text-[36px] font-bold font-serif text-cyan-900 mb-6 text-center">Make A Difference In Someone's World
         </h2>
         <div className='flex flex-col items-center justify-center'>
         <hr className='w-[50%]' />
         </div>
         <br/>
            <div>
              <h2 className='text-[17px] md:text-[22px] font-bold font-serif text-white mb-6 text-center'>Have a cause in need of funding?<br/>Create a campaign to get started FundRising</h2>
            </div>
            <div className='flex flex-col items-center justify-center'>
          {token ? (
            <a href="/create">
              <button className="btn2 text-white font-bold border-cyan-900 border-2 md:block hover:-translate-y-1 hover:scale-110 hover:bg-cyan-950 hover:text-teal-50 duration-300" type="button">
                Create a Campaign
              </button>
            </a>
          ) : (
            <a href="/login">
              <button className="btn2 text-white font-bold border-cyan-900 border-2 md:block hover:-translate-y-1 hover:scale-110 hover:bg-cyan-950 hover:text-teal-50 duration-300" type="button">
                Login to Create a Campaign
              </button>
            </a>
          )}
        </div>
            <br/>
            <div className='flex flex-col items-center justify-center'>
         <hr className='w-[50%]' />
         </div>
         <br/>
            <div>
              <h2 className='text-[17px] md:text-[22px] font-bold font-serif text-white mb-6 text-center'>Looking for a cause to donate?<br/>Explore campaigns to find a FundRiser in need.</h2>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <button className="btn2 text-white font-bold border-cyan-900 border-2 md:block hover:-translate-y-1 hover:scale-110 hover:bg-cyan-950 hover:text-teal-50 duration-300" type="submit">Explore</button>
            </div>
            <br/>
            <div className='flex flex-col items-center justify-center'>
         <hr className='w-[50%]' />
         </div>
         <br />
            <div>
              <h2 className='text-[17px] md:text-[22px] font-bold font-serif text-white mb-6 text-center'>Already know what you’re looking for?<br/>Search it here.</h2>
            </div>
            <div>
            <form>
  <div className="flex">
    <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
    <button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
      All categories
      <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
      </svg>
    </button>
    <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
        <li>
          <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
        </li>
        <li>
          <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
        </li>
        <li>
          <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
        </li>
        <li>
          <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
        </li>
      </ul>
    </div>
    <div className="relative w-full">
      <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
      <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </div>
  </div>
</form>

            </div>
              
          </div>
        </div>
      </div>
  )
}

export default Landing