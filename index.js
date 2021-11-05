// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

const { generateMarkdown } = require('./utils/generateMarkdown');
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
      message: 'Please provide a description in editor that opens and close it when done? (Required)',
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('Please enter description!');
          return false;
        }
      }

  },
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

const promptConfirmInstallation = data => {

  return inquirer
    .prompt( {
      type: 'confirm',
      name: 'confirmAddInstallation',
      message: 'Would you like to add steps for installation?',
      default: false
    })
    .then(
      confirm => {
        if(confirm.confirmAddInstallation){
          return promptInstallation(data)
        } else {
          return data;
        }
      }
    )
    .then(
      newData => {
        return newData;
      }
    );
};

const promptInstallation = data => {

  // If there's no 'projects' array property, create one
  if (!data.installationSteps) {
    data.installationSteps = [];
  }
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'step',
        message: 'Provide Installation Step',
        validate: stepsInput => {
          if (stepsInput) {
            return true;
          } else {
            console.log('Please enter step!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'confirmAddInstallation',
        message: 'Would you like to add another step?',
        default: false
      }
    ])
    .then(answer => {
      data.installationSteps.push(answer);
      if(answer.confirmAddInstallation){
        return promptInstallation(data)
      } else {
        return data
      }
    });
};

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions)
    .then(data => promptConfirmInstallation(data))
    .then(data => {
      console.log(data);
      return generateMarkdown(data)
    })
    .then(markdownTemplate => {
      return writeToFile('./dist/README.md', markdownTemplate);
    })
    .catch(err => {
      console.log(err);
    });
}

// Function call to initialize app
init();