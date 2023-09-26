/* *** TODO: This File Not Reqd. with RapidAPI OpenAI API    ***  */

//  link -->    https://platform.openai.com/docs/api-reference/authentication

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  //   organization: "org-uAst0qK4RNiDileBTqQuX2jZ",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai;
