import express from 'express';
import * as dotenv from 'dotenv';
// import { Configuration, OpenAIApi } from 'openai';
import fetch from "node-fetch"

dotenv.config();

const router = express.Router();

// let configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// let openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  const {prompt} = req.body;
  try {
    const result = await query(prompt);
    res.json({result});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 
async function query(data) {
  const uniqueTime = new Date().getTime().toString()
  try {
    const response = await fetch(
      process.env.HUGGINGFACE_URL,
      {
        headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
        method: "POST",
        body: JSON.stringify({inputs:data+uniqueTime}),
      }
    );
    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const res = await response.blob();
  const buffer = Buffer.from(await res.arrayBuffer());
  const dataURL = `data:${res.type};base64,${buffer.toString("base64")}`;
    return dataURL;
    
  } catch (error) {
    throw error;
  }
}
// router.route('/').post(async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const aiResponse = await openai.createImage({
//       prompt,
//       n: 1,
//       size: '1024x1024',
//       response_format: 'b64_json',
//     });

//     const image = aiResponse.data.data[0].b64_json;
//     res.status(200).json({ photo: image });
//   } catch (error) {
//     console.error("this is error",error);
//     res.status(500).send(error?.response.data.error.message || 'Something went wrong');
//   }
// });

export default router;