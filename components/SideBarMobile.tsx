"use client";

// index.d.ts

import { Tooltip } from "react-tooltip"; // npm install react-tooltip@latest
import Image from "next/image";

import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore"; // useCollection hook
import React, { useState } from "react";
import NewChat from "./NewChat";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
// import ModelSelection from "./ModelSelection";

import profile from "./assets/profile.png";
import side1 from "./assets/side1.svg";
import { Comment } from "react-loader-spinner";

import "react-tooltip/dist/react-tooltip.css";

const SideBarMobile = () => {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="p-2 flex flex-col h-screen justify-between">
      <div className="max-h-[calc(100vh-500px)]">
        <div>
          <div className="max-w-[214px] sticky overflow-hidden">
            <NewChat />
          </div>

          <div className="hidden sm:inline">{/* <ModelSelection /> */}</div>

          <div className="flex flex-col">
            {loading && (
              <div className="animate-pulse text-center text-white ml-[5rem] mt-[2rem]">
                {/* <p>Loading Chats...</p> */}
                <Comment
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="comment-loading"
                  wrapperStyle={{}}
                  wrapperClass="comment-wrapper"
                  color="#fff"
                  backgroundColor="#475569" // #00695f
                />
              </div>
            )}

            {/* Map through the chat rows */}
            {/* w-[150px]   */}
            <div className="w-full mr-2 overflow-hidden hover:overflow-auto max-h-[calc(100vh-350px)] mt-4">
              <div className="w-[150px]">
                {chats?.docs.map((chat) => (
                  <ChatRow key={chat.id} id={chat.id} />
                ))}
              </div>
            </div>
            {chats && chats.docs.length > 9 && (
              <div className="border-b border-gray-600 my-2"></div>
            )}
          </div>
        </div>
      </div>
      {session && (
        <div className="flex flex-col items-center justify-center">
          {session.user?.image ? (
            <div className="svg-wrapper w-[100px] relative">
              <Image
                src={session.user?.image! || profile}
                alt="Edit"
                className="h-[83px] w-[88px]  rounded-lg shadow-lg shadow-black cursor-pointer mx-auto mb-2 hover:opacity-60 transition-all delay-50 ease-in-out"
                width={500}
                height={500}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={session.user?.name ?? ""}
              />
            </div>
          ) : (
            <div className="svg-wrapper w-[200px] relative">
              <Image
                src={profile}
                alt="Edit"
                className="h-[83px] w-[88px]  rounded-lg shadow-lg shadow-black cursor-pointer mx-auto mb-2 hover:opacity-60 transition-all delay-50 ease-in-out"
                width={500}
                height={500}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={session?.user?.name ?? ""}
              />
            </div>
          )}

          <Tooltip
            // position={{ x: 72, y: 920 }}
            id="my-tooltip"
            noArrow
            // username_text   user_expand
            className="bg-[#15a2be] text-black rounded-md font-bold uppercase username_text  text-sm"
          />

          <button
            onClick={() => signOut()}
            className="text-white bg-[#dc2626] w-20 h-10 mb-10 mt-5 rounded-md hover:bg-[#f43f5e] shadow-logout  "
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBarMobile;
