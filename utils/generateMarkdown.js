
// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  return ('![license badge](https://img.shields.io/badge/'+license+'-100%25-blue)').replaceAll(' ', '%20')}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}

${renderLicenseBadge(data.license)}
  
## Description
  
${data.description}
  
## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Contributions](#contributions)
* [License](#license)
* [Test](#test)
* [Questions](#questions)
  
## Installation
  
${data.installationSteps.map(stepsObject => {return '* ' + stepsObject.step + '\n'}).join('')}
  
## Usage
  
${data.usage}

## Contributions
  
${data.contributions.map(contributionObject => {return '* ' + contributionObject.contribution + '\n'}).join('')}

## License

This read me is covered under [${data.license}](https://link-url-here.org) 

## Test
  
${data.tests.map(testObject => {return '* ' + testObject.test + '\n'}).join('')}

`;
}

module.exports = { generateMarkdown };