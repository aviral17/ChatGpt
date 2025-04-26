// updated as per latest changes

"use client";

import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { collection, orderBy, query, DocumentData } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

import firebase from "firebase/compat/app";

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [prevMessages, setPrevMessages] =
    useState<firebase.firestore.QuerySnapshot | null>(null);

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  const isChatGPT = messages?.docs.map((message) => {
    if (message.data().user.name === "ChatGPT") {
      return true;
    }
  });
  // console.log("MESSAGES = ", messages);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const isScrolledToBottom =
        chatContainer.scrollHeight - chatContainer.scrollTop ===
        chatContainer.clientHeight;
      if (isScrolledToBottom) {
        const maxScrollTop =
          document.body.scrollHeight - document.documentElement.clientHeight;
        window.scrollTo({ top: maxScrollTop, behavior: "smooth" });
      }
    }
  });

  useEffect(() => {
    setLoading(true);
  }, [chatId]);

  useEffect(() => {
    if (messages) {
      setLoading(false);
    }
  }, [messages]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log("scrolled");
    });
  }, []);

  return (
    <div
      className="flex-1 overlay overflow-y-auto overflow-x-hidden"
      ref={chatContainerRef}
    >
      {loading && (
        <div className="mt-10 text-center">
          <div className="relative top-[400px] left-[47%]">
            <RotatingLines
              strokeColor="lightgreen"
              strokeWidth="2"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
          <p className="relative text-2xl top-[400px] left-[32px] sm:left-[50px] lg:left-[10px] loading_msg mt-10 text-center text-white">
            Loading Messages ...
          </p>
        </div>
      )}
      {!loading && messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt in below to get started!
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}

      {!loading &&
        messages?.docs.map((message, index) => {
          const lmes = messages.docs[messages.size - 1].id;
          // console.log("last message id outside if{} = ", lmes);

          if (index === messages.docs.length - 1) {
            const lastMessageId = messages.docs[messages.size - 1].id;
            const lastMessageElement = document.getElementById(lastMessageId);
          }

          return (
            <Message key={message.id} id={lmes} message={message.data()} />
          );
        })}
    </div>
  );
}

export default Chat;
