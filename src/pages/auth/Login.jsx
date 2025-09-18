// src/pages/auth/Login.jsx
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AppInput from "../../components/ui/appInput";
import Button from "../../components/ui/button";      // your custom button
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {Github} from "lucide-react"

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  const socialIcons = [
    { icon: <Github/>, href: "#" },
    // { icon: <Google/>, href: "#" },
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="h-screen w-full bg-[var(--color-bg)] flex items-center justify-center p-4">
      <div className="card w-[80%] lg:w-[70%] md:w-[55%] flex justify-between h-[600px] rounded-xl overflow-hidden shadow-lg">
        {/* Left Side - Form */}
        <div
          className="w-full lg:w-1/2 px-6 lg:px-16 h-full relative overflow-hidden flex flex-col justify-center"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Hover Glow */}
          <motion.div
            className="absolute pointer-events-none w-[500px] h-[500px] bg-gradient-to-r from-purple-300/30 via-blue-300/30 to-pink-300/30 rounded-full blur-3xl"
            animate={{
              opacity: isHovering ? 1 : 0,
              x: mousePosition.x - 250,
              y: mousePosition.y - 250,
            }}
            transition={{ type: "tween", duration: 0.2 }}
          />

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="text-center py-10 md:py-20 grid gap-4 relative z-10"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold">Sign in</h1>

            {/* Socials */}
            <div className="flex justify-center mb-4">
              <ul className="flex gap-3">
                {socialIcons.map((s, idx) => (
                  <li key={idx}>
                    <a
                      href={s.href}
                      className="w-10 h-10 md:w-12 md:h-12 bg-[var(--color-bg-2)] rounded-full flex justify-center items-center border border-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg)] transition"
                    >
                      <span>{s.icon}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <span className="text-sm text-gray-500">or use your account</span>

            {/* Inputs */}
            <div className="grid gap-4 text-left">
              <AppInput
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <AppInput
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <a href="#" className="text-xs text-gray-400 hover:text-gray-600">
              Forgot your password?
            </a>

            {/* Submit */}
            <Button
              type="submit"
              className="group relative inline-flex justify-center items-center overflow-hidden rounded-md bg-[#000] px-6 py-2 text-sm text-white hover:shadow-lg transition-all"
            >
              <span className="z-10">Sign In</span>
              <span className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover:duration-700 group-hover:[transform:skew(-13deg)_translateX(100%)]">
                <span className="relative h-full w-8 bg-white/20" />
              </span>
            </Button>

            <div>
                <p>Don't have an account? <Link to="/register" className="underline">Register Now</Link> </p>
            </div>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block w-1/2 h-full">
          <img
            src="https://images.pexels.com/photos/7102037/pexels-photo-7102037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Login visual"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
