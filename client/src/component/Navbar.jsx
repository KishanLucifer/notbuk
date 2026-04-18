import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../components/ui/DropdownMenu";
import {
  BookOpen,
  LogOut,
  User,
  Info,
  Menu,
  X,
  LogIn,
  UserPlus,
} from "lucide-react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = () => {
    logout();
    navigate("/signin");
    toast.success("Signed out successfully");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full glass-strong"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" id="nav-logo">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25"
            >
              <BookOpen className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold gradient-text tracking-tight">
              NotBuk
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive("/")
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                  id="nav-home"
                >
                  Dashboard
                </Link>
                <Link
                  to="/about"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive("/about")
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                  id="nav-about"
                >
                  About
                </Link>

                {/* User dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="flex items-center gap-3 ml-3 px-3 py-1.5 rounded-xl hover:bg-secondary/60 transition-colors"
                      id="nav-user-menu"
                    >
                      <img
                        src={user?.profileImage}
                        className="w-8 h-8 rounded-full ring-2 ring-primary/30 object-cover"
                        alt="Profile"
                      />
                      <span className="text-sm font-medium text-foreground/80 hidden lg:block">
                        {user?.username}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div className="flex items-center gap-3 py-1">
                        <img
                          src={user?.profileImage}
                          className="w-10 h-10 rounded-full ring-2 ring-primary/20"
                          alt="Profile"
                        />
                        <div>
                          <p className="font-semibold text-foreground text-sm">
                            {user?.fullname || user?.username}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => navigate("/about")}
                      className="gap-2"
                    >
                      <Info className="w-4 h-4" />
                      About
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="gap-2 text-destructive focus:text-destructive"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/signin"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-200 flex items-center gap-2"
                  id="nav-signin"
                >
                  <LogIn className="w-4 h-4" />
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25 flex items-center gap-2"
                  id="nav-signup"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary/60 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            id="nav-mobile-toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-border/50"
          >
            <div className="px-4 py-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-3 mb-3">
                    <img
                      src={user?.profileImage}
                      className="w-10 h-10 rounded-full ring-2 ring-primary/30"
                      alt="Profile"
                    />
                    <div>
                      <p className="font-semibold text-sm">
                        {user?.fullname || user?.username}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-colors text-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-colors text-sm"
                  >
                    <Info className="w-4 h-4" />
                    About
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-destructive/10 transition-colors text-sm text-destructive w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-colors text-sm"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-primary-foreground transition-colors text-sm"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
