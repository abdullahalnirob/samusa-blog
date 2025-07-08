import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const { createUser, updateUser, setUser } = useAuth();

  const navigate = useNavigate();

  const handleClick = () => {
    const hasCapital = /[A-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (!hasCapital) {
      toast.error("Password must contain at least one capital letter.");
      return;
    }
    if (!hasSpecial) {
      toast.error("Password must contain at least one special character.");
      return;
    }
    if (!hasNumber) {
      toast.error("Password must contain at least one number.");
      return;
    }
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        return updateUser({ displayName: name, photoURL: photoURL })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photoURL });
          })
          .catch(() => {
            setUser(user);
          });
      })
      .then(() => {
        toast.success("Account Sign up Successful");
        navigate("/");
      })
      .catch(() => {
        toast.error("Account creation failed!");
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
    <div className="flex items-center justify-center py-10">
      <div className="max-w-sm w-full bg-white ring-1 ring-slate-200 px-6 py-8 rounded-md shadow-md space-y-5">
        <h1 className="text-3xl text-gray-900 font-bold text-center">
          Sign Up
        </h1>

        <div className="">
          <div className="my-4">
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
              placeholder="Enter your name"
              variant="outlined"
              type="text"
              fullWidth
              size="small"
              color="success"
              sx={{
                backgroundColor: "white",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#10b981",
                  },
                },
              }}
            />
          </div>
          <div className="my-4">
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="Enter your email"
              variant="outlined"
              type="email"
              fullWidth
              size="small"
              color="success"
              sx={{
                backgroundColor: "white",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#10b981",
                  },
                },
              }}
            />
          </div>
          <div className="my-4">
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter your password"
              variant="outlined"
              type="password"
              fullWidth
              size="small"
              color="success"
              sx={{
                backgroundColor: "white",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#10b981",
                  },
                },
              }}
            />
          </div>
          <div className="my-4">
            <TextField
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              label="Photo URL"
              placeholder="Enter your photo URL"
              variant="outlined"
              type="url"
              fullWidth
              size="small"
              color="success"
              sx={{
                backgroundColor: "white",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#10b981",
                  },
                },
              }}
            />
          </div>
        </div>
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
          Continue with Google
        </button>
        <button
          onClick={handleClick}
          className="w-full cursor-pointer  px-4 py-2 rounded-md bg-[#10B981] hover:bg-[#15a374] text-white transition duration-200"
        >
          Sign Up
        </button>

        <div className="text-center text-sm">
          <span>Already have an account? </span>
          <Link
            to="/login"
            className="text-green-600 hover:text-green-700 transition duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
