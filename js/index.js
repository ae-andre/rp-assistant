const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "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"
});

const userInput = "longsword";

const userInput2 = "goblin";

const getResponse = async () => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `suggest 3 one-sentence descriptions for a ${userInput} attack against a ${userInput2}. write them in first-person perspective. make the description gory.`,
        },
      ],
      temperature: 0,
      max_tokens: 500,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("Error fetching response:", error);
  }
};

getResponse();