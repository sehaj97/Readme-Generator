const inquirer = require('inquirer');
const generatePage = require('./src/readme-template');
const { writeFile } = require('./utils/generate-readme');
const promptUser = () => {
    return inquirer.prompt(
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
      });
  };
  promptUser()
    .then(answer => generatePage(answer))
    .then(fileContent => {
      return writeFile(fileContent);
    })
    .catch(err => {
      console.log(err);
    });
  