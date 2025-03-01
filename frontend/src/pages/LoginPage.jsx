import React, { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn, authUser } = useAuthStore(); // Get authUser directly

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  // Move the navigation logic inside useEffect
  useEffect(() => {
    if (authUser) {
      navigate("/"); // Redirect to homepage after login
    }
  }, [authUser, navigate]); // Dependency array ensures the effect runs only when authUser changes

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <Label>
                <span className="font-medium">Email</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base" />
                </div>
                <Input
                  type="email"
                  className="input-bordered w-full pl-10"
                  placeholder="your@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <Label>
                <span className="font-medium">Password</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base" />
                </div>
                <Input
                  className="input w-full pl-10"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base" />
                  ) : (
                    <Eye className="h-5 w-5 text-base" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit" className="" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-pin" />
                  Loading...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-base">
              Don't have an account?{""}
              <Link to="/signup" className="underline">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
