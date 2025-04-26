// updated as per latest changes

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

        const codeBlockHtml = `<pre id="codeBlock" class="code_box language-javascript"><code>${highlightedCode}</code></pre>`;

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

    // Add event listener for mouseover event, `MouseEvent` is typescript type like we have string, number, null, any etc
    const preElement = document.querySelector("#codeBlock");
    if (preElement) {
      preElement.addEventListener("mouseover", (event) => {
        if ((event as MouseEvent).ctrlKey) {
          setCopied();
        }
      });
    }

    // console.log("FORMATTED TEXT:  ", formattedText);
  }, [message.text]);

  const codeBlockElements = document.querySelectorAll(".code_box");

  codeBlockElements.forEach((element) => {
    element.addEventListener("mouseover", (event) => {
      if ((event as MouseEvent).ctrlKey) {
        setCopied();
      }
    });
  });
  // console.log("FORMATTED TEXT:  ", formattedText);

  return (
    <div
      className={`py-5 px-5  text__style ${isChatGPT && "bg-[#434654]"} ${
        !isChatGPT && "text-[#eef9f394]"
      } ${isChatGPT && "text-[#ffffffaf]"}  `}
      id={id}
    >
      <div className="flex space-x-5 px-5 max-w-[43rem] relative   mx-auto">
        <Image
          src={message.user.avatar || profile}
          alt="avatar"
          className="h-8 w-8"
          width={100}
          height={100}
        />
        <div
          className="pt-1 text-sm text__format"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        ></div>
      </div>
    </div>
  );
}

export default Message;

/* 

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

        const codeBlockHtml = `<pre id="codeBlock" class="code_box language-javascript"><code>${highlightedCode}</code></pre>`;

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

    // Add event listener for mouseover event, `MouseEvent` is typescript type like we have string, number, null, any etc
    const preElement = document.querySelector("#codeBlock");
    if (preElement) {
      preElement.addEventListener("mouseover", (event) => {
        if ((event as MouseEvent).ctrlKey) {
          setCopied();
        }
      });
    }

    console.log("FORMATTED TEXT:  ", formattedText);
  }, [message.text]);

  const codeBlockElements = document.querySelectorAll(".code_box");

  codeBlockElements.forEach((element) => {
    element.addEventListener("mouseover", (event) => {
      if ((event as MouseEvent).ctrlKey) {
        setCopied();
      }
    });
  });
  console.log("FORMATTED TEXT:  ", formattedText);

  return (
    <div
      className={`py-5 px-5  text__style ${isChatGPT && "bg-[#434654]"}`}
      id={id}
    >
      <div className="flex space-x-5 px-5 max-w-[43rem] relative   mx-auto">
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
      </div>
    </div>
  );
}

export default Message;


*/
