"use client";
// check ChatInput.txt for full File code with Comments

import { FormEvent, useState, useRef, useEffect } from "react";

import { ThreeDots } from "react-loader-spinner";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { db } from "../firebase";
import useSWR from "swr";
// import ModelSelection from "./ModelSelection";
// import { MdLibraryAdd } from "react-icons/md";
import addplus from "./assets/md_plus.svg";
import Image from "next/image";

const Loader = () => {
  return (
    <ThreeDots
      height="40"
      width="40"
      radius="9"
      color="#4fa94d"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      // wrapperClassName=""
      visible={true}
    />
  );
};

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [urls, setUrls] = useState("");
  const { data: session } = useSession();
  const [isUploading, setIsUploading] = useState(false);

  // data: model ----> "model" same that we declared in ModelSelection.tsx
  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  // TODO: useSWR to get model
  // const model = "text-davinci-003";

  async function shortenUrl(longUrl: any) {
    try {
      // console.log("Inside try block of ChatInput");

      const response = await fetch(
        `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.FIREBASE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            longDynamicLink: longUrl,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
      const data = await response.json();
      return data.shortLink;
    } catch (error) {
      console.error(error);
    }
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.rows = 1; // Set initial number of rows to 1
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = parseInt(
        getComputedStyle(textarea).lineHeight.replace("px", "")
      );
      const rows = Math.min(Math.round(scrollHeight / lineHeight), 7); // Calculate number of rows based on content height and set maximum to 7
      textarea.rows = rows;
    }
  }, [prompt]);

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(min-width: 381px)");
    const handleChange = (e: any) => {
      if (textareaRef.current) {
        if (e.matches) {
          textareaRef.current.placeholder = "Type your message here...";
        } else {
          textareaRef.current.placeholder = "Type your message";
        }
      }
    };
    mediaQueryList.addEventListener("change", handleChange);
    handleChange(mediaQueryList);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Check if the selected file is an image file
      if (!file.type.startsWith("image/")) {
        // Show an error message if the selected file is not an image file
        toast.error("Only image files are supported", {
          position: "top-center",
        });
        return;
      }

      setImageFile(file);

      if (file) {
        try {
          setIsUploading(true); // Set isUploading to true when the upload starts
          const storage = getStorage();
          const storageRef = ref(storage, `images/${file.name}`);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          // console.log("Long url = ", url);
          setPrompt((prevPrompt) => `${prevPrompt} ${url}`.trim());
          setImageFile(null);
          setIsUploading(false); // Set isUploading back to false when the upload completes

          // Set focus back to the textarea element
          textareaRef.current?.focus();
        } catch (error) {
          // console.log("catch occured");

          toast.error("Error occurred");
          setIsUploading(false);
        }
      }
    }
  };

  const handleUploadClick = async () => {
    // trigger click event on hidden file input
    const fileInput = document.getElementById("image-upload-input");
    if (fileInput) {
      fileInput.click();
    }

    if (!imageFile) return;
  };

  /* ******************************************************************** */

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    // const input = prompt.trim();
    const input = urls ? `${prompt} ${urls}`.trim() : prompt.trim();
    setPrompt("");

    // console.log("User Input = ", input);
    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email || "",
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    // Toast Notification to say Loading!
    const notification = toast.loading("ChatGPT is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then((response) => {
      response.json().then((data) => {
        // Log the data to the console for debugging
        console.log("SEND MESSAGE Data = ", data);
      });

      // Toast notification to say successful!

      toast.success("ChatGPT has responded!", {
        id: notification,
      });
    });
  };

  // xs:280px,  mb-[30px] below return
  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-2xl text-sm md:w-[51em] mb-[60px] md:mb-[15px] inp-box mt-5 w-[280px] xs:w-[90vw]">
      <form onSubmit={sendMessage} className="p-2 pb-0 pr-4 space-x-5 flex">
        <textarea
          ref={textareaRef}
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300 whitespace-pre-wrap break-words resize-none pl-4 pt-2"
          disabled={!session}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message here..."
          style={{ overflow: "auto" }}
          onKeyDown={(e: any) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(e);
            }
          }}
        />

        {isUploading && <Loader />}
        <div className="flex items-center">
          <input
            id="image-upload-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <button
            type="button"
            onClick={handleUploadClick}
            disabled={!session}
            className="hover:text-white h-10 mr-[15px] mb-2"
          >
            {/* <MdLibraryAdd size={18} /> */}
            <Image src={addplus} width={30} height={30} alt="addFile_icon" />
          </button>

          <button
            disabled={!prompt || !session}
            type="submit"
            className={`h-9 hover:opacity-50 text-white font-bold  py-[4px] px-[8px] mb-3 rounded transition duration-300 ${
              prompt && session ? "bg-green-400" : ""
            } disabled:-rotate-45 disabled:text-gray-600 disabled:cursor-not-allowed`}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </form>

      <div className="md:hidden">
        {/* Model Selection */}
        {/* <ModelSelection /> */}
      </div>
    </div>
  );
}

export default ChatInput;
