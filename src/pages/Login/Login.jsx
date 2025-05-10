import React, { useState } from "react"
import PasswordInput from "../../components/Input/PasswordInput"
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from "../../utils/helper"
import { useDispatch } from "react-redux"
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice"
import axios from "axios"
import { toast } from "react-toastify"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError("")

    // Login API

    try {
      dispatch(signInStart())

      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true }
      )

      if (res.data.success === false) {
        toast.error(res.data.message)
        console.log(res.data)
        dispatch(signInFailure(data.message))
      }

      toast.success(res.data.message)
      dispatch(signInSuccess(res.data))
      navigate("/")
    } catch (error) {
      toast.error(error.message)
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Login</h4>

          <input
            type="text"
            placeholder="Email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p className="text-sm text-center mt-4">
            Not registered yet?{" "}
            <Link
              to={"/signup"}
              className="font-medium text-[#2B85FF] underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login



// import React, { useState } from "react";
// import PasswordInput from "../../components/Input/PasswordInput.js";
// import { Link } from "react-router-dom";
// import { validateEmail, validatePassword } from "../../utils/helper.js";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { signInFailure, signInStart } from "../../redux/user/userSlice.js";
// import { useDispatch } from "react-redux";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if(!email || !password){
//       toast.error("Please enter email & password");
//     }

//     if (!validateEmail(email)) {
//       toast.error("Please enter a valid email address!");
//       return;
//     }

//     if (!validatePassword(password)) {
//       toast.error("Password must include uppercase, lowercase, number & special character, and be at least 8 characters long.");
//       return;
//     }

//     toast.success("Login successful!");
//     console.log("✅ Login successful with:", { email, password });
//   };


//   return (
//     <div className="max-w-md mx-auto mt-23 p-5 shadow-lg bg-white rounded-xl">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-4 p-3 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <PasswordInput
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded mt-4 hover:bg-blue-700"
//         >
//           Login
//         </button>

//         <p className="mt-4 text-sm">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-blue-500 underline">
//             Register
//           </Link>
//         </p>
//       </form>


//       <ToastContainer position="top-center" autoClose={3000} />
//     </div>
//   );
// };

// export default Login;
