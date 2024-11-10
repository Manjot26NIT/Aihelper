import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(request: Request) {
  
    const { inputText } = await request.json();
  const result = await generateText({
    model: google('gemini-1.5-flash'),  // Select the Gemini model
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment."  // Default to 'what is love?' if no text is provided
          },
        ],
      },
    ],
  });

  // Check if the response contains the text content
  
  console.log(result);
  return Response.json({ success: true, message: result.text });
}
// 138231