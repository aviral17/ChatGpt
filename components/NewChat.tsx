"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Remember its /navigation and not /router
import { db } from "../firebase";

// We are using serverTimestamp as our local time in different parts of the world will be different and so it will be like ambigious

const NewChat = () => {
  const router = useRouter();
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
  return (
    // chatRow ===> custom component

    <div onClick={createNewChat} className="border-gray-700 border chatRow">
      <PlusIcon className="h-4 w-4" />
      <p>New Chat</p>
    </div>

    // <div className="flex items-center">
    //   <div onClick={createNewChat} className="border-gray-700 border chatRow">
    //     <PlusIcon className="h-4 w-4" />
    //     <p>New Chat</p>
    //   </div>
    //   <p className="lg:hidden">Hello</p>
    // </div>
  );
};

export default NewChat;
