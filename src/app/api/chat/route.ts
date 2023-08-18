import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openAIConfig);

export const runtime = 'edge';
 
export async function POST(req: Request) {

  const {messages} = await req.json();

    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: messages
      });
      
      const stream = OpenAIStream(response);
      
      return new StreamingTextResponse(stream);

    } catch (error) {

      console.log(error,'Sowwy :(');
      
    }
 

  
}