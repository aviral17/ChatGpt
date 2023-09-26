import axios, { AxiosRequestConfig } from "axios";

const options: AxiosRequestConfig = {
  method: "POST",
  url: "https://openai80.p.rapidapi.com/chat/completions",
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": process.env.RAPID_API_KEY as string,
    "X-RapidAPI-Host": "openai80.p.rapidapi.com",
  },
  data: {
    model: "gpt-3.5-turbo",
    // stream: true,
    messages: [
      {
        role: "user",
        content: "",
      },
    ],
  },
};

const rapidQuery = async (prompt: string) => {
  try {
    // const prompt = prompt; // get the user input
    options.data.messages[0].content = prompt; // update the content field via user input
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
};

// const rapidQuery = async (prompt: string, onData: (data: string) => void) => {
//   try {
//     // const prompt = prompt; // get the user input
//     options.data.messages[0].content = prompt; // update the content field via user input
//     // const response = await axios.request(options);
//     // console.log(response.data);
//     if (options.url && options.headers) {
//       const headers = new Headers(
//         Object.entries(options.headers).map(([key, value]) => [
//           key,
//           String(value),
//         ])
//       );
//       const response = await fetch(options.url, {
//         method: options.method,
//         headers,
//         body: JSON.stringify(options.data),
//       });

//       const reader = response.body?.getReader();
//       if (reader) {
//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) break;
//           const chunk = new TextDecoder("utf-8").decode(value);
//           console.log(chunk);
//           onData(chunk);
//         }
//       }
//     }

//     // return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error(error);
//   }
// };

/* #TODO:----------------The below code should be used for livestream, its not livestreaming though, some problem maybe from rapidapi  --------------------------------------------------*/

// const rapidQuery = async (prompt: string, onData: (data: string) => void) => {
//   try {
//     // const prompt = prompt; // get the user input
//     options.data.messages[0].content = prompt; // update the content field via user input
//     // const response = await axios.request(options);
//     // console.log(response.data);
//     if (options.url && options.headers) {
//       const headers = new Headers(
//         Object.entries(options.headers).map(([key, value]) => [
//           key,
//           String(value),
//         ])
//       );
//       const response = await fetch(options.url, {
//         method: options.method,
//         headers,
//         body: JSON.stringify(options.data),
//       });

//       const reader = response.body?.getReader();
//       if (reader) {
//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) break;
//           const chunk = new TextDecoder("utf-8").decode(value);
//           console.log(chunk);

//           onData(chunk);
//           // console.log("\n\n\n\n\nChunk=", chunk.trim());
//         }
//       }
//     }
//   } catch (error) {
//     console.log("Error = ", error);
//   }
// };
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

export default rapidQuery;
