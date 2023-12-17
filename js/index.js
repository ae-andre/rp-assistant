const { OpenAI } = require("openai");
const inquirer = require('inquirer');

const openai = new OpenAI({
  apiKey: "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"
});

// const getStartedBtn = document.getElementById("#get-started")

const questions = [
  {
    list: 'list',
    name: 'typeOfAttack',
    message: "What type of attack are you doing?",
    choices: ['Melee', 'Ranged', 'Spell'],
    },
  {
    list: 'What '
  }
]


inquirer.prompt(questions)
  .then(answers => {
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
  })

getResponse();

// function assignType() {
  
// }


// getStartedBtn.addEventListener('click', function() {
//   alert('Button Clicked!');
// });