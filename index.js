// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

const { generateMarkdown } = require('./utils/readme-template');
// TODO: Create an array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your readme? (Required)',
    validate: titleInput => {
      if (titleInput) {
        return true;
      } else {
        console.log('Please enter your title!');
        return false;
      }
    }
  },
  {
      type: 'input',
      name: 'description',
      message: 'Please provide a description? (Required)',
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('Please enter description!');
          return false;
        }
      }

  }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {

  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'File created!'
      });
    });
  });

}

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions)
    .then(data => generateMarkdown(data))
    .then(markdownTemplate => {
      return writeToFile('./dist/README.md', markdownTemplate);
    })
    .catch(err => {
      console.log(err);
    });
}

// Function call to initialize app
init();