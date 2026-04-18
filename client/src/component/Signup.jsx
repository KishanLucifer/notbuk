import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { BackgroundBeams } from "../components/aceternity/BackgroundBeams";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";

export default function Signup() {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const host = import.meta.env.VITE_SERVER_DOMAIN || "http://localhost:3000/api/v1";

  // Password strength
  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getPasswordStrength(credentials.password);
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong", "Excellent"];
  const strengthColors = [
    "bg-muted",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-emerald-500",
  ];

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullname, email, password } = credentials;

    if (fullname.length < 3) {
      return toast.error("Full name must be at least 3 characters");
    }
    if (!email.length || !emailRegex.test(email)) {
      return toast.error("Please enter a valid email");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password needs 6-20 chars with uppercase, lowercase, and a number"
      );
    }

    setLoading(true);
    try {
      const response = await fetch(`${host}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password }),
      });

      const json = await response.json();

      if (json.success) {
        login(json.access_token);
        toast.success("Account created! Welcome to NotBuk 🎉");
        navigate("/");
      } else {
        toast.error(json.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      {/* Left: Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        <BackgroundBeams />
        <div className="relative z-10 px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/30">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Start Your Journey
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Create a free account and organize your thoughts in a beautiful cloud notebook.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <div className="glass-strong rounded-2xl p-8 shadow-2xl shadow-black/20">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground" id="signup-title">
                Create account
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Join NotBuk and start capturing ideas
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="signup-fullname"
                  className="text-sm font-medium text-foreground/80"
                >
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    name="fullname"
                    type="text"
                    id="signup-fullname"
                    placeholder="John Doe"
                    onChange={onChange}
                    value={credentials.fullname}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="signup-email"
                  className="text-sm font-medium text-foreground/80"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    name="email"
                    type="email"
                    id="signup-email"
                    placeholder="you@example.com"
                    onChange={onChange}
                    value={credentials.email}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="signup-password"
                  className="text-sm font-medium text-foreground/80"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    id="signup-password"
                    placeholder="••••••••"
                    onChange={onChange}
                    value={credentials.password}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    id="signup-toggle-password"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {/* Password strength indicator */}
                {credentials.password.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-1.5 pt-1"
                  >
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            strength >= level
                              ? strengthColors[strength]
                              : "bg-secondary"
                          }`}
                        />
                      ))}
                    </div>
                    <p
                      className={`text-xs ${
                        strength <= 2
                          ? "text-red-400"
                          : strength <= 3
                          ? "text-yellow-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {strengthLabels[strength]}
                    </p>
                  </motion.div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                variant="glow"
                loading={loading}
                id="signup-submit"
              >
                Create account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-primary font-medium hover:underline underline-offset-4"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
