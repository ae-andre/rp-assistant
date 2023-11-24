const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

// const userInput = $("#userInput");
const userInput = "success tips";

const getResponse = async () => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5",
    messages: [
      {
        role: "user",
        content: `suggest 5 catchy titles for blog post about ${userInput}`,
      },
    ],
    temperature: 0,
    max_tokens: 500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  console.log(response.data.choices[0].message);
};

getResponse();

// $("#melee").on(click, function () {});
