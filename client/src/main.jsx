import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: "hsl(var(--card) / 0.85)",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
          borderRadius: "16px",
          backdropFilter: "blur(16px)",
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
          padding: "16px 20px",
          fontWeight: 500,
        }}
      />
    </AuthProvider>
  </React.StrictMode>
);
