// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";
// import query from "../../lib/queryApi";
// import admin from "firebase-admin"; // for timestamp from admin database
// import { adminDb } from "../../firebaseAdmin";
// import openai from "../../lib/chatgpt";

// type Option = {
//   value: string;
//   label: string;
// };

// type Data = {
//   modelOptions: Option[]; // Array of Option type object described above
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const models = await openai.listModels().then((res) => res.data.data);

//   const modelOptions = models.map((model) => ({
//     value: model.id,
//     label: model.id,
//   }));

//   res.status(200).json({
//     modelOptions,
//   });
// }
