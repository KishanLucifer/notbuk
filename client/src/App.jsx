import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

// Page transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Home />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/signin"
          element={
            <PageTransition>
              <Signin />
            </PageTransition>
          }
        />
        <Route
          path="/signup"
          element={
            <PageTransition>
              <Signup />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

// 404 Page
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-8xl font-black gradient-text mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        This page doesn&apos;t exist in your notebook.
      </p>
      <a href="/" className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors">
        Go back home
      </a>
    </div>
  );
}

function App() {
  return (
    <NoteState>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
