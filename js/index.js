const dotenv = require('dotenv').config({path: '../.env'});
const { OpenAI } = require("openai");
const inquirer = require('inquirer');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const attackChoices = [
  {
    type: 'list',
    name: 'typeOfAttack',
    message: "What type of attack are you doing?",
    choices: ['Melee', 'Ranged', 'Spell'],
    },
];

const meleeChoices = [
  {
    type: 'list',
    name: 'typeOfMelee',
    message: "What type of melee attack are you doing?",
    choices: ['longsword', 'greataxe', 'dagger', 'club']
  },
];

const rangedChoices = [
  {
    type: 'list',
    name: 'typeOfRanged',
    message: "What type of ranged attack are you doing?",
    choices: ['bow', 'javelin', 'dagger', 'dart']
  }
]

const spellChoices = [
  {
    type: 'list',
    name: 'typeOfSpell',
    message: "What type of spell attack are you doing?",
    choices: ['fire', 'cold', 'thunder', 'acid']
  }
]

inquirer.prompt(attackChoices)
  .then((answers) => {
    let chosenType;
    let attackType = answers.typeOfAttack.toLowerCase();

    if (answers.typeOfAttack === 'Melee') {
      chosenType = meleeChoices;
    } else if (answers.typeOfAttack === 'Ranged') {
      chosenType = rangedChoices;
    } else if (answers.typeOfAttack === 'Spell') {
      chosenType = spellChoices;
    }
    return { chosenType, attackType};
  })

  .then(({ chosenType, attackType }) => {
    return inquirer.prompt(chosenType)
      .then(specificAnswers => {
        const specificAttackType = specificAnswers[Object.keys(specificAnswers)[0]];
        return [specificAttackType, attackType];
    });
  })

  .then (finalAnswers => {
      // console.log(finalAnswers);
      getResponse(finalAnswers)
    })

  .catch((error) => {
  console.log(error)
});

const getResponse = async (a, b) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `suggest 3 one-sentence descriptions for a ${a} ${b} attack. write them in first-person perspective. make the description gory.`,
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


// getStartedBtn.addEventListener('click', function() {
//   alert('Button Clicked!');
// });