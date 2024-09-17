// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate(); // Use the useNavigate hook

//   const handleSignOut = () => {
//     localStorage.clear();
//     navigate("/");
//   };
//   return (
//     <>
//       <nav className="bg-white border-gray-200 dark:bg-gray-900">
//         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//           <Link className="btn btn-primary mx-0" to="/" role="button">
//             NotBuk
//           </Link>
//           <Link className="hover:text-blue-700" to="/" role="button">
//             Home1
//           </Link>

//           <div className="hidden w-full md:block md:w-auto" id="navbar-default">
//             <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 active:text-blue-500">
//               {!localStorage.getItem("access_token") ? (
//                 <form className="">
//                   <Link
//                     className="active:text-blue-500"
//                     aria-current="page"
//                     to="/signin"
//                     role="button"
//                   >
//                     Sign in
//                   </Link>
//                   <Link
//                     className="active:text-blue-500"
//                     aria-current="page"
//                     to="/signup"
//                     role="button"
//                   >
//                     Sign up
//                   </Link>
//                 </form>
//               ) : (
//                 <>
//                   <div className="relative flex items-center">
//                     <button className="flex items-center space-x-2 p-2 rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500">
//                       <img
//                         // src={profile_img}
//                         className="w-12 h-12 object-cover rounded-full"
//                         alt="Profile"
//                       />
//                       <p className="text-dark-grey font-medium">
//                         Hello, username!
//                       </p>
//                     </button>

//                     <Link
//                       onClick={handleSignOut}
//                       className="md:hover:text-blue-700"
//                       aria-current="page"
//                       role="button"
//                       to="/"
//                     >
//                       Sign out
//                     </Link>
//                   </div>
//                 </>
//               )}

//               <li></li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
          <Link className="btn btn-primary mx-0" to="/" role="button">
            NotBuk
          </Link>

          <div className=" w-auto md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-row-reverse md:p-0 mt-4 rounded-lg md:mt-0 md:border-0 md:bg-white  md:dark:bg-gray-900 ">
              {!localStorage.getItem("access_token") ? (
                <form className="space-x-9">
                  <Link
                    className=" hover:text-blue-700"
                    aria-current="page"
                    to="/signin"
                    role="button"
                  >
                    Sign in
                  </Link>
                  <Link
                    className=" hover:text-blue-700"
                    aria-current="page"
                    to="/signup"
                    role="button"
                  >
                    Sign up
                  </Link>
                </form>
              ) : (
                <>
                  <div className="flex items-center space-x-9">
                    {/* <button className="flex items-center space-x-20 p-2">
                      <img
                        // src={profile_img}
                        className="w-12 h-12 object-cover rounded-full"
                        alt="Profile"
                      />
                      <p className="text-dark-grey font-medium">
                        Hello, username!
                      </p>
                    </button> */}

                    <Link
                      className=" md:hover:text-blue-700 "
                      onClick={handleSignOut}
                      aria-current="page"
                      role="button"
                      to="/signin"
                    >
                      Sign out
                    </Link>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
