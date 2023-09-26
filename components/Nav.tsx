"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import nav1 from "./assets/nav2.svg";
import plus from "./assets/plus1.svg";
import SideBarMobile from "./SideBarMobile";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
// import { CiMenuBurger } from "react-icons/ci";
import { SlMenu } from "react-icons/sl";

export default function Nav() {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const { data: session } = useSession();

  // Creating New Collection in Database
  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"), // Its like db/users/email/chats ---> {mess..,userId,createdAt}
      {
        messages: [],
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );
    router.push(`/chat/${doc.id}`);
  };

  useEffect(() => {
    const overlay = document.querySelector(".overlay");
    if (toggle) {
      overlay?.classList.add("visible");
    } else {
      overlay?.classList.remove("visible");
    }
  }, [toggle]);

  useEffect(() => {
    const handleClick = (event: any) => {
      const sidebar = document.querySelector(".sidebar_mobile");
      if (!sidebar?.contains(event.target) && toggle) {
        setToggle(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [toggle]);

  return (
    <>
      <nav className="flex justify-between items-center mob-sidebar bg-[#303036] h-[50px] w-[100%] md:hidden">
        {!toggle && (
          // <Image
          //   src={nav1}
          //   height={40}
          //   width={40}
          //   alt="sidebar_icon"
          //   className="ml-3"
          //   onClick={() => setToggle(true)}
          // />
          <SlMenu
            className="text-white text-4xl menu_icon_background ml-3"
            onClick={() => setToggle(true)}
          />
        )}
        <Image
          src={plus}
          height={40}
          width={40}
          alt="sidebar_icon"
          className="mr-3"
          onClick={createNewChat}
        />
      </nav>

      {toggle && (
        <div
          className={`fixed sidebar_mobile top-0 bottom-0 left-0 z-10 w-[70%] h-[100vh] bg-[#202123] lg:hidden max-w-[240px] ${
            toggle ? "open" : ""
          }`}
        >
          <SideBarMobile />

          <h1
            className="absolute -right-10 top-3 text-gray-400 border-gray-500 hover:bg-gray-700 border w-8 h-8 rounded-md cursor-pointer text-center"
            onClick={() => setToggle(false)}
          >
            <span className="relative top-[0.5px] text-xl font-[450px] p-2">
              X
            </span>
          </h1>
        </div>
      )}
    </>
  );
}
