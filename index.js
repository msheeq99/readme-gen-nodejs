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
  const responses = await askQuestions();
  await generateReadme(responses);
}

// reads index.md and the files contents
// then it replaces, specified contents, with the values from our inquirer prompt
// then it spits out all of that data, in format, to a README.MD file
async function generateReadme(answers) {
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
        "$Github",
        `## GitHub
  ${answers.GitHub}`
      )
      .replace(
        "$Email",
        `## Email
  ${answers.Email}`
      )
      .replace(
        "$License",
        `## License
  ${answers.License}`
      )
      .replace(
        "$Usage",
        `## Usage
  ${answers.Usage}`
      )
      .replace(
        "$Installation",
        `## Installation
  ${answers.Installation}`
      );
    fs.writeFile("./README.md", READMEfile, ()=>{console.log(READMEfile)});
    
  
  }
  
}

async function generateReadMe(answers) {
  const templateDocument = await fs.promises.readFile(
    "/Users/samlaxton/Desktop/bootcamp/coding-ass/readme-generator/template-readme.md",
    "utf8"
  );
  let readMeProfile = templateDocument
    .replace("+", answers.Title)
    .replace("}", answers.Description)
    .replace("$", answers.Installation)
    .replace("%", answers.Usage)
    .replace("^", answers.Contributing)
    .replace("<", answers.Tests)
    .replace("?", answers.GitHub)
    .replace("=", answers.Email)
    if (answers.License === "Apache License, Version 2.0"){ 
    readMeProfile = readMeProfile.replace("|", "The Apache Software Foundation uses various licenses to distribute software and documentation, and to accept regular contributions from individuals and corporations and larger grants of existing software products. These licenses help us achieve our goal of providing reliable and long-lived software products through collaborative, open-source software development. In all cases, contributors retain full rights to use their original contributions for any other purpose outside of Apache while providing the ASF and its projects the right to distribute and build upon their work within Apache.")
    .replace("§", "https://shields.io/badge/license-Apache-blue")
    }
    if (answers.License === "The MIT License"){
      readMeProfile = readMeProfile.replace("|", "The MIT license gives users express permission to reuse code for any purpose, sometimes even if code is part of proprietary software. As long as users include the original copy of the MIT license in their distribution, they can make any changes or modifications to the code to suit their own needs.")
      .replace("§", "https://img.shields.io/badge/license-MIT-green")
    }
    if (answers.License === "Eclipse Public License"){
      readMeProfile = readMeProfile.replace("|", "The Eclipse Public License is a free and open source software license most notably used for the Eclipse IDE and other projects by the Eclipse Foundation. It replaces the Common Public License and removes certain terms relating to litigations related to patents.")
      .replace("§", "https://img.shields.io/badge/eclipse%20marketplace-v1.0.1-blue")
    }
    await fs.promises.writeFile("generated-readme.md", readMeProfile);
}

collectAnswersAndGenerateReadMe();
