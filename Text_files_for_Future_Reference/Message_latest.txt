"use client";

import Image from "next/image";
//  npm install react-use-clipboard
import useClipboard from "react-use-clipboard";

import { DocumentData } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";

import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

import { toast } from "react-hot-toast";

import profile from "./assets/profile.png";
import copy2 from "./assets/copy2.svg";
import tick from "./assets/tick3.svg";
import linkk from "./assets/link.svg";

type Props = {
  message: DocumentData;
  id: string;
};

function Message({ message, id }: Props) {
  const isChatGPT = message.user.name === "ChatGPT";

  const [formattedText, setFormattedText] = useState<string>("");
  const [formattedCodeBlock, setFormattedCodeBlock] = useState("");
  const [isUrl, setIsUrl] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isCopied, setCopied] = useClipboard(formattedCodeBlock);

  const codeBlockRef = useRef(null);

  function formatCode(code: any) {
    try {
      return prettier.format(code, {
        semi: false,
        parser: "babel",
        plugins: [parserBabel],
      });
    } catch (error) {
      console.error("Error formatting code:", error);
      return code;
    }
  }

  useEffect(() => {
    const codeRegex = /```([\s\S]*?)```/gm; // As Code part starts and ends with ```
    const matches = message.text.matchAll(codeRegex);
    let newFormattedText = message.text;

    for (const match of matches) {
      const codeBlock = match[1];
      try {
        const formattedCode = formatCode(codeBlock);
        const highlightedCode = Prism.highlight(
          formattedCode,
          Prism.languages.javascript,
          "javascript"
        );
        // const codeBlockClass = "bg-gray-light"; // css class from prettier code
        // Removed line-numbers from the below <pre> code, as lines sometimes showing and sometimes not and also taking extra-space on left
        const codeBlockHtml = `<pre id="codeBlock" class="code_box language-javascript"><code>${highlightedCode}</code></pre>`;
        // newFormattedText = newFormattedText.replace(match[0], codeBlockHtml); // Full text with formatted prettier code
        newFormattedText = newFormattedText.replace(
          match[0],
          `<br>${codeBlockHtml}<br>`
        );

        setFormattedCodeBlock(formattedCode);
      } catch (e) {
        console.error(e);
      }
    }

    // check Note.txt
    let linkCount = 0;
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const urls = urlRegex.test(message.text);
    setIsUrl(urls);

    if (!isChatGPT) {
      newFormattedText = newFormattedText.replace(urlRegex, (url: string) => {
        linkCount++;
        return ` &nbsp;<a href="${url}" target="_blank" class="link_url">Link - ${linkCount}</a>&nbsp; `;
      });
    }

    setFormattedText(newFormattedText);
    Prism.highlightAll();

    // Add event listener for mouseover event
    const preElement = document.querySelector("#codeBlock");
    if (preElement) {
      preElement.addEventListener("mouseover", (event) => {
        if ((event as MouseEvent).ctrlKey) {
          setCopied();
        }
      });
    }
  }, [message.text]);

  const codeBlockElements = document.querySelectorAll(".code_box");

  codeBlockElements.forEach((element) => {
    element.addEventListener("mouseover", (event) => {
      if ((event as MouseEvent).ctrlKey) {
        setCopied();
      }
    });
  });

  return (
    <div
      className={`py-5 px-5  text__style ${isChatGPT && "bg-[#434654]"}`}
      id={id}
    >
      {/* flex space-x-5 px-10 max-w-2xl mx-auto */}
      <div className="flex space-x-5 px-5 max-w-[43rem] relative   mx-auto">
        {/* <img src={profile} alt="avatar" className="h-8 w-8" /> */}
        <Image
          src={message.user.avatar || profile}
          alt="avatar"
          className="h-8 w-8"
          width={100}
          height={100}
        />
        <div
          className="pt-1 text-sm"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        ></div>
        {/* {formattedCodeBlock && (
          <button
            onClick={() => {
              setCopied();
              toast.success("Copied!", {
                position: "top-center",
              });
              setIsClicked(true);
              setTimeout(() => setIsClicked(false), 2000);
            }}
            // top-10 right-10
            className="absolute top-[60px] rounded-md right-10 p-0  group"
          >
            {isClicked ? (
              <Image src={tick} alt="Copied" width={40} height={40} />
            ) : (
              <Image src={copy2} alt="Copy" width={30} height={30} />
            )}

            <p className="invisible absolute -right-5 top-9  group-hover:visible">
              <pre>(or Ctrl + C)</pre>
            </p>
          </button>
        )} */}
      </div>
    </div>
  );
}

export default Message;

// // message.user.avatar ||

/* ---------------------------------------------------------------------------------- */

// import Image from "next/image";
// //  npm install react-use-clipboard
// import useClipboard from "react-use-clipboard";

// import { DocumentData } from "firebase/firestore";
// import { useEffect, useState, useRef } from "react";
// import Prism from "prismjs";
// import "prismjs/themes/prism-tomorrow.css";
// import "prismjs/components/prism-javascript";

// import "prismjs/plugins/line-numbers/prism-line-numbers.js";
// import "prismjs/plugins/line-numbers/prism-line-numbers.css";

// import prettier from "prettier/standalone";
// import parserBabel from "prettier/parser-babel";

// import { toast } from "react-hot-toast";

// import profile from "./assets/profile.png";
// import copy2 from "./assets/copy2.svg";
// import tick from "./assets/tick3.svg";
// import linkk from "./assets/link.svg";

// type Props = {
//   message: DocumentData;
//   id: string;
// };

// function Message({ message, id }: Props) {
//   const isChatGPT = message.user.name === "ChatGPT";

//   const [formattedText, setFormattedText] = useState<string>("");
//   const [formattedCodeBlock, setFormattedCodeBlock] = useState("");
//   const [isUrl, setIsUrl] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);
//   const [isCopied, setCopied] = useClipboard(formattedCodeBlock);

//   const codeBlockRef = useRef(null);

//   function formatCode(code: any) {
//     try {
//       return prettier.format(code, {
//         semi: false,
//         parser: "babel",
//         plugins: [parserBabel],
//       });
//     } catch (error) {
//       console.error("Error formatting code:", error);
//       return code;
//     }
//   }

//   useEffect(() => {
//     const codeRegex = /```([\s\S]*?)```/gm; // As Code part starts and ends with ```
//     const matches = message.text.matchAll(codeRegex);
//     let newFormattedText = message.text;

//     for (const match of matches) {
//       console.log("Matches = ", match);

//       const codeBlock = match[1];
//       console.log("CodeBlock = ", codeBlock);

//       try {
//         const formattedCode = formatCode(codeBlock);
//         const highlightedCode = Prism.highlight(
//           formattedCode,
//           Prism.languages.javascript,
//           "javascript"
//         );

//         const copyButtonHtml = `<button onClick="navigator.clipboard.writeText('${formattedCode}');"><img src="${copy2}" alt="Copy" width="30" height="30" /></button>`;
//         const codeBlockHtml = `<pre id="codeBlock" class="code_box language-javascript"><code>${highlightedCode}</code></pre>${copyButtonHtml}`;
//         // newFormattedText = newFormattedText.replace(match[0], codeBlockHtml); // Full text with formatted prettier code.
//         newFormattedText = newFormattedText.replace(
//           match[0],
//           `<br>${codeBlockHtml}<br>`
//         );

//         console.log("codeBlockHTML = ", codeBlockHtml);
//         console.log("New Formatted Text = ", newFormattedText);

//         setFormattedCodeBlock(formattedCode);
//       } catch (e) {
//         console.error(e);
//       }
//     }

//     // check Note.txt
//     let linkCount = 0;
//     const urlRegex = /(https?:\/\/[^\s]+)/g;

//     const urls = urlRegex.test(message.text);
//     setIsUrl(urls);

//     if (!isChatGPT) {
//       newFormattedText = newFormattedText.replace(urlRegex, (url: string) => {
//         linkCount++;
//         return ` &nbsp;<a href="${url}" target="_blank" class="link_url">Link - ${linkCount}</a>&nbsp; `;
//       });
//     }

//     setFormattedText(newFormattedText);
//     Prism.highlightAll();

//     // Add event listener for mouseover event
//     const preElement = document.querySelector("#codeBlock");
//     if (preElement) {
//       preElement.addEventListener("mouseover", (event) => {
//         if ((event as MouseEvent).ctrlKey) {
//           setCopied();
//         }
//       });
//     }
//     const codeBlockElements = document.querySelectorAll(".code_box");

//     codeBlockElements.forEach((element) => {
//       element.addEventListener("mouseover", (event) => {
//         if ((event as MouseEvent).ctrlKey) {
//           setCopied();
//         }
//       });
//     });
//   }, [message.text]);

//   return (
//     <div
//       className={`py-5 px-5  text__style ${isChatGPT && "bg-[#434654]"}`}
//       id={id}
//     >
//       {/* flex space-x-5 px-10 max-w-2xl mx-auto */}
//       <div className="flex space-x-5 px-5 max-w-[43rem] relative   mx-auto">
//         {/* <img src={profile} alt="avatar" className="h-8 w-8" /> */}
//         <Image
//           src={message.user.avatar || profile}
//           alt="avatar"
//           className="h-8 w-8"
//           width={100}
//           height={100}
//         />
//         <div
//           className="pt-1 text-sm"
//           dangerouslySetInnerHTML={{ __html: formattedText }}
//         ></div>
//         {/* {formattedCodeBlock && (
//           <button
//             onClick={() => {
//               setCopied();
//               toast.success("Copied!", {
//                 position: "top-center",
//               });
//               setIsClicked(true);
//               setTimeout(() => setIsClicked(false), 2000);
//             }}
//             // top-10 right-10
//             className="absolute top-[60px] rounded-md right-10 p-0  group"
//           >
//             {isClicked ? (
//               <Image src={tick} alt="Copied" width={40} height={40} />
//             ) : (
//               <Image src={copy2} alt="Copy" width={30} height={30} />
//             )}

//             <p className="invisible absolute -right-5 top-9  group-hover:visible">
//               <pre>(or Ctrl + C)</pre>
//             </p>
//           </button>
//         )} */}
//       </div>
//     </div>
//   );
// }

// export default Message;
