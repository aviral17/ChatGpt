// updated as per latest changes

import { TrashIcon } from "@heroicons/react/24/outline"; // solid or outline
import { BsChatLeft } from "react-icons/bs";
import { BsChatLeftText } from "react-icons/bs";

import { collection, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages") // db/users/email/chats/id/messages
  );

  useEffect(() => {
    if (!pathname) return;
    // console.log("Pathname = ", pathname); pathname = /chat/{id}  else only '/' if not chat selected ie, homepage

    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/"); // router.push('/') also works abs fine
  };
  // Removed chatrow class from <Link /> parent below
  return (
    <Link href={`/chat/${id}`} className={` cursor-pointer`}>
      {/* <ChatBubbleLeftIcon className="h-5 w-5 hover:text-blue-400" /> */}
      {/* <BiMessageSquare className="h-5 w-5 hover:text-blue-400" /> */}
      {/* px-4 */}
      <div
        className={`flex rounded-md  py-2 w-[219px]  hover:bg-gray-700/70 ${
          active && "bg-gray-700/50"
        }`}
      >
        <div className="flex flex-row pl-3">
          {active ? (
            <BsChatLeftText className="h-3 w-3 text-white hover:text-blue-400 mt-1 mr-1" />
          ) : (
            <BsChatLeft className="h-3 w-3 text-white hover:text-blue-400 mt-1 mr-1" />
          )}
          <p
            className={`text-white hidden md:inline-flex truncate ${
              active ? "w-[130px] md:w-[135px]" : "w-[170px]"
            }   text-[13px] ml-1 txtshadow`}
          >
            {messages?.docs[messages?.docs.length - 1]?.data().text ||
              "New Chat"}
            {/* {console.log("Messages.docs = ", messages?.docs)} */}
          </p>
        </div>
        {active && (
          <div className="mt-1 ml-2 pl-3">
            <TrashIcon
              onClick={removeChat}
              className="h-3 w-3  text-white hover:text-red-700"
            />
          </div>
        )}
      </div>
    </Link>
  );
}

export default ChatRow;
