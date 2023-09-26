/* *** TODO: This File Not Reqd. with RapidAPI OpenAI API    ***  */

import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
  // We use chatId here because we can use previous conversation as context so chatId of previous conv. reqd.
  // So we can use chatId if our prompt requires previous chats to made as context for chatGPT

  const res = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.9, // more logical response
      top_p: 1, // more creative response
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text) // basically 3 choices it provides like Google BARD
    .catch(
      (err) =>
        `ChatGPT was unable to find an answer for that! (Error: ${err.message}) `
    );

  return res;
};

export default query;
