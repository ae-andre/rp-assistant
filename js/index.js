const { OpenAI } = require("openai");
const inquirer = require('inquirer');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// const getStartedBtn = document.getElementById("#get-started")

const questions = [
  {
    type: 'list',
    name: 'typeOfAttack',
    message: "What type of attack are you doing?",
    choices: ['Melee', 'Ranged', 'Spell'],
    },
  {
    type: 'list',
    name: 'typeOfMelee',
    message: "What type of melee attack are you doing?",
    choices: ['longsword', 'greataxe', 'dagger', 'club']
  }
]


inquirer.prompt(questions)
  .then(answers => {
    getResponse(answers);
    // console.log(answers.typeOfAttack);
});

const getResponse = async () => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `suggest 3 one-sentence descriptions for a ${answers.typeOfAttack} attack using a ${answers.typeOfMelee}. write them in first-person perspective. make the description gory.`,
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

// getResponse();

// function assignType() {
  
// }


// getStartedBtn.addEventListener('click', function() {
//   alert('Button Clicked!');
// });