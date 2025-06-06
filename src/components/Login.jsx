import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { SignIn,setUser } = useAuth();

  const handleLogin = () => {
    SignIn(email, password)
      .then(() => {
        toast.success("User Login Successfully!");
        navigate("/");
      })
      .catch(() => {
        toast.error("User Login Failed!");
      });
  };
  const provider = new GoogleAuthProvider();
  const SignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        toast.success("User loign successfull!");
        navigate("/");
      })
      .catch((err) => {
        toast.error("Google Sign-in failed.");
      });
  };

  return (
    <div className="flex py-10 items-center justify-center">
      <div className="max-w-sm w-full space-y-4 bg-white ring-1 ring-slate-200 px-6 py-8 rounded-md shadow-md">
        <h1 className="text-3xl text-gray-900 font-bold text-center">Login</h1>

        <div className="flex flex-col">
          <div className="my-2">
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              placeholder="Enter your email"
              color="success"
              size="small"
            />
          </div>
          <div className="my-2">
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              placeholder="Enter your password"
              color="success"
              size="small"
            />
          </div>
        </div>

        <p className="text-green-500 text-sm text-right cursor-pointer hover:text-green-600 transition-colors duration-200">
          Forget password?
        </p>
        <button
          type="button"
          onClick={SignInWithGoogle}
          className="w-full space-x-2 flex items-center justify-center py-2 px-3 text-sm font-medium text-green-400 ring-1 ring-green-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-300 rounded-md cursor-pointer duration-400 hover:bg-green-200"
        >
          <img
            className="w-5 mx-2"
            src="https://static.vecteezy.com/system/resources/thumbnails/022/484/509/small_2x/google-lens-icon-logo-symbol-free-png.png"
            alt=""
          />
          Login with Google
        </button>
        <button
          onClick={handleLogin}
          className="w-full cursor-pointer px-4 py-2 rounded-md bg-[#10B981] hover:bg-[#15a374] text-white transition-colors duration-200"
        >
          Login
        </button>

        <div className="text-center text-sm">
          <span>Have not an account? </span>
          <Link
            to="/signup"
            className="text-green-600 hover:text-green-700 transition-colors duration-200"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
