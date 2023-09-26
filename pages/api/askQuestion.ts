// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/queryApi";
import admin from "firebase-admin"; // for timestamp from admin database
import { adminDb } from "../../firebaseAdmin";
// import axios from "axios";
import rapidQuery from "../../lib/rapidApi";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt!" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat ID!" });
    return;
  }

  //ChatGPT Query
  // const response = await query(prompt, chatId, model); // TODO: Not reqd. for RapidAPI OpenAI API, query not reqd. and parameters are already there from req.body
  /* ------------------------------------------------------------------------ */
  /* **** */ const response = await rapidQuery(prompt);
  /* ------------------------------------------------------------------------ */

  /* #TODO: ----------------------------------------------------------------------------------------------------------------------------------------------------------- */
  // let response = "";
  // await rapidQuery(prompt, (data) => {
  //   let regex = /\\\\/g;
  //   let data1 = data.replace(regex, "");
  //   const lines = data1.split("\\n\\n");

  //   // console.log("\n\nLINES =", lines);
  //   // console.log("\n\n\nDATA1 =", data1);

  //   let parsedLines = lines
  //     .map((line) =>
  //       line
  //         .replace(/^"?data: /, "")
  //         .replace(/\\(?=")/g, "")
  //         .replace(/'(?=[{}])/g, "")
  //         .trim()
  //     )
  //     .filter((line) => line != "" && line != "[DONE]" && line != '"');

  //   let parsedObjects = parsedLines.map((line) => JSON.parse(line));

  //   for (const parsedLine of parsedObjects) {
  //     const { choices } = parsedLine;
  //     const { delta } = choices[0];
  //     const { content } = delta;
  //     if (content) {
  //       response += content;
  //     }
  //   }
  // });

  /* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

  const message: Message = {
    text: response || "ChatGPT was unable to find answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT", // using inside Message.tsx to determine whether its chatgpt or user email(user)
      avatar: "https://links.papareact.com/89k", //////////////////////////////////////////////////////////////////////////////////////////////////////////// AVATAR //////////////////////////
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
