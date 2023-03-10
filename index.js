const generateMarkdown = require("./utils/generateMarkdown");

const inquirer = require("inquirer");

const fs = require("fs");

// questions holds an array of 7 values(6 indexes)
const questions = [
  "Title",
  "Description",
  "Installation",
  "Usage",
  "Contributing",
  "Tests",
  "GitHub",
  "Email"
];


const licenseQuestions = {
  type: "list",
  name: "License",
  message: "License",
  choices: [,
    "The MIT License",
  ],
};


//loop through questions array and grab each value for 0-6 and spit it out as "it"
const inquirerQuestions = questions.map((it) => {
  return {
    type: "input",
    name: it,
    Message: it,
  };
});

// askQuestions() just prompts to user with inquirerQuestions, using questions array
async function askQuestions() {
  return await inquirer.prompt(inquirerQuestions);
}

// collectAnswersAndGenerateReadMe() gets data that comes back from inquirer.prompt, and sets it to responses variable, then it calls generateReadme() passing through all of our answers from the prompt, to be used to create a readme
async function collectAnswersAndGenerateReadMe() {
  console.log("Wicked, Lets head on..");
  const responses = await askQuestions();
  console.log("Generating HTML from template.");
  await generateReadMe(responses);
  console.log("All done, have a great buddy !.");
}


// reads index.md and the files contents
// then it replaces, specified contents, with the values from our inquirer prompt
// then it spits out all of that data, in format, to a README.MD file
async function generateReadMe(answers) {
  fs.readFile("index.md", "utf8", callback);
   function callback(error, data){
   const READMEfile = data.replace(
    "$Name",
    `# Title
${answers.Name}`
  )
    .replace(
      "$Description",
      `## Description
${answers.Description}`
    )
    .replace(
      "$Installation",
      `## Installation
${answers.Installation}`
    )
    .replace(
      "$Usage",
      `## Usage
${answers.Usage}`
    )
    .replace(
      "$Contributing",
      `## Contributing
${answers.Contributing}`
    )
    .replace(
      "$Tests",
      `## Tests
${answers.Tests}`
    )
    .replace(
      "$License",
      `## License
${answers.License}`
    )
    .replace(
      "$Installation",
      `## Installation
${answers.Installation}`
    )
    .replace(
      "$GitHub",
      `## GitHub
${answers.GitHub}`
    )
    .replace(
      "$Email",
      `## Email
${answers.Email}`
    );
  fs.writeFile("./README.md", READMEfile, ()=>{console.log(READMEfile)});
  }
}

collectAnswersAndGenerateReadMe();



