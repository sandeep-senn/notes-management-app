import React, { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Signup = () => {
  const[name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name || !email || !password){
      toast.error("Please enter name, email & password");
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must include uppercase, lowercase, number & special character, and be at least 8 characters long.");
      return;
    }
    toast.success("Successfully created your account!");
  };
  return (
    <div className="max-w-md mx-auto mt-23 p-5 shadow-lg bg-white rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Sign up</h2>

      <form onSubmit={handleSignUp}>
        <input
          type="name"
          placeholder="Name"
          className="w-full mb-4 p-3 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded mt-4 hover:bg-blue-700"
        >
          SIGN UP
        </button>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>


      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}

export default Signup
