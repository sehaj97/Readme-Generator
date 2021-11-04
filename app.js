const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt(
      {
        type: 'input',
        name: 'name',
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
    .then(answer=> console.log(answer))
    .catch(err => {
      console.log(err);
    });
  