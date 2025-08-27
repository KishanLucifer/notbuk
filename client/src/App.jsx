import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
   
      <NoteState>  
        <Router>
          <Navbar />
           <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          <div className="container">
            <Routes>
              <Route position="top-center" path="/" element={<Home />} />
              <Route position="top-center" path="/about" element={<About />} />
              <Route position="top-center" path="/signin" element={<Signin />} />
              <Route position="top-center" path="/signup" element={<Signup />} />
              </Routes>
            
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
