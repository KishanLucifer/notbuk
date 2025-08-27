import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/signin");
  };

  return (
    <>
      <nav className=" bg-gray-900 dark:bg-gray-900">
        <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
          <Link className="btn btn-primary mx-0" to="/" role="button">
            NotBuk
          </Link>

          <div className=" w-auto md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-row-reverse md:p-0 mt-4 rounded-lg md:mt-0 md:border-0 md:bg-white  md:dark:bg-gray-900 ">
              {!user ? (
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
                    <button className="flex items-center space-x-20 p-2">
                      <img
                        src={user.profileImage}
                        className="w-12 h-12 object-cover rounded-full"
                        alt="Profile"
                      />
                      <p className="text-dark-grey font-medium">
                        Hello, {user.username}!
                      </p>
                    </button>

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
