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
      type: 'editor',
      name: 'description',
      message: 'Please hit enter to open default editor to provide the description and save & close once done? (Required)',
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('Please enter description!');
          return false;
        }
      }

  },
  {
      type: 'editor',
      name: 'usage',
      message: 'Please hit enter to open default editor to provide the usage of the application and save & close once done? (Required)',
      validate: usageInput => {
        if (usageInput) {
          return true;
        } else {
          console.log('Please enter usage!');
          return false;
        }
      }

  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a License?',
    choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense']
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your github username? (Required)',
    validate: githubInput => {
      if (githubInput) {
        return true;
      } else {
        console.log('Please enter your github username!');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email? (Required)',
    validate: emailInput => {
      if (emailInput) {
        return true;
      } else {
        console.log('Please enter your email!');
        return false;
      }
    }
  }
];

const writeToFile = (fileName, data) => {

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
          data.installationSteps = [{step: 'no steps were provided'}];
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

const promptContributions = data => {

  if (!data.contributions) {
    data.contributions = [];
  }
  return inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'confirmAddContribution',
        message: 'Would you like to add contribution?',
        default: false
      },
      {
        type: 'input',
        name: 'contribution',
        message: 'Provide a contribution',
        when: ({ confirmAddContribution }) => confirmAddContribution,
        default: ''
      }
    ])
    .then(answer => {
      if(answer.contribution !== ''){
        data.contributions.push(answer);
      }
      if(answer.confirmAddContribution){
        return promptContributions(data)
      } else {
        data.contributions.pop();
        if(data.contributions.length === 0){
          data.contributions.push({contribution: 'no contribution provided'});
        }
        return data
      }
    });
};



const promptTests = data => {

  if (!data.tests) {
    data.tests = [];
  }
  return inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'confirmTest',
        message: 'Would you like to add test?',
        default: false
      },
      {
        type: 'input',
        name: 'test',
        message: 'Provide a test',
        when: ({ confirmTest }) => confirmTest,
        default: ''
      }
    ])
    .then(answer => {
      if(answer.test !== ''){
        data.tests.push(answer);
      }
      if(answer.confirmTest){
        return promptTests(data)
      } else  {
        data.tests.pop();
        if(data.tests.length === 0){
          data.tests.push({test: 'no test provided'})
        }
        return data
      }
    });
};

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions)
    .then(data => promptConfirmInstallation(data))
    .then(data => promptContributions(data))
    .then(data => promptTests(data))
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