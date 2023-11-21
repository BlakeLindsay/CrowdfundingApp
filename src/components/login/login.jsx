import React from 'react'

const Login = () => {
  return (
    <div className="p-5 sm:p-0">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-cyan-900 rounded-xl shadow-md py-8 px-8">
          <h2 className="text-[28px] font-bold text-white mb-6 text-center">
            Login
          </h2>
          <form className="flex flex-col">                    
            <input
                placeholder="Email"
                className="bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
                type="text" />
              <input
                placeholder="Password"
                className="bg-teal-50 text-cyan-900 font-bold border-0 rounded-md p-2  mb-4 focus:bg-teal-100 focus:outline-none transition ease-in-out duration-150 placeholder-cyan-900"
                type="password" />
                <button className='bg-teal-500 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-600 transition ease-in duration-200' type="submit">Submit</button>
                <p className='text-white mt-4 text-center'>Don't have an account?
                <a className='text-teal-200 hover:underline mt-4 px-1' href='#'>Sign Up</a></p>
                
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login