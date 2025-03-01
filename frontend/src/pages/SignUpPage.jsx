import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signUp, isSigningUp } = useAuthStore();
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Full Name is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid Email format");
      return;
    }
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 character");

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signUp(formData);
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2 items-center justify-center">
      {/* left side */}
      <div className="flex flex-col justify-center in-checked: p-6 sm:p-12">
        {/* Logo */}
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get Started with your free account
              </p>
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control flex gap-3 justify-center items-center">
              <Label className="">
                <User />
              </Label>
              <Input
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                value={formData.fullName}
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="form-control flex gap-3 justify-center items-center">
              <Label className="">
                <Mail />
              </Label>
              <Input
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="form-control flex gap-3 justify-center items-center relative">
              <Label className="">
                <Lock />
              </Label>

              <Input
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
            <Button type="submit" className="w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading.....
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-base-content/68">
              Already have an account? {""}
              <Link to="/login" className="underline">
                Click here
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Rign side */}
      <AuthImagePattern
        title="Join Our Community"
        subtitle="Connect with frinds, share moment, and stay in touch with your friend"
      />
    </div>
  );
};

export default SignUpPage;
