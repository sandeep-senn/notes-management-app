import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp, RedirectToUserProfile } from "@clerk/clerk-react";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Home />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
        <Route path="/user/*" element={<RedirectToUserProfile />} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
