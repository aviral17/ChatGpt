// updated as per latest changes

"use client";
import { signIn } from "next-auth/react";
import Image from "next/image"; // we need to config it in next.config.js,,, se Note.txt

import React from "react";

// updated as per latest changes
const Login = () => {
  return (
    <div className="bg-[#11a37f] h-screen flex flex-col items-center justify-center text-center">
      <Image
        src="https://links.papareact.com/2i6"
        width={300}
        height={300}
        alt="logo"
      />
      <button className="text-white font-bold text-3xl animate-pulse">
        <span
          onClick={() => signIn("google")}
          className="bg-white text-green-500 rounded-md p-4"
        >
          Sign In
        </span>{" "}
        to use ChatGPT
      </button>
    </div>
  );
};

export default Login;
