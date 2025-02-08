import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import hideIcon from "../imgs/hide.png";
import showIcon from "../imgs/view.png";
import { AuthContext } from "../context/AuthContext";

export default function Signin() {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Use the useNavigate hook
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await fetch("http://localhost:3000/signin", {
    const response = await fetch("https://notbuk-api.vercel.app/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("access_token", json.access_token);
      login(json.access_token); // Updates Navbar instantly
      navigate("/"); // Use the navigate function to redirect`
      // console.log("Navigate works");
    } else {
      alert("Invalid credentials1");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20">
        <p className="py-10">Sign in</p>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@somethin.com"
            onChange={onChange}
            value={credentials.email}
            required
          />
        </div>
        <div className="mb-5 relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={onChange}
            value={credentials.password}
            required
          />
          <img
            src={showPassword ? hideIcon : showIcon}
            alt={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-12 transform -translate-y-1/2 h-5 w-5 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        </div>

        <div className="flex items-start mb-5"></div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}
