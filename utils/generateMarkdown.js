
function renderLicenseBadge(license) {
  if(license !== 'The Unlicense'){
    license = license + '--blue';
  } else {
    license = 'No%20License--blue';
  }
  return license.split(" ").join("%20");
}
 
function renderLicenseLink(license) {
  if(license === 'GNU AGPLv3'){
    return 'https://choosealicense.com/licenses/agpl-3.0/'
  } else if(license === 'GNU GPLv3' ){
    return 'https://choosealicense.com/licenses/gpl-3.0/'
  } else if(license === 'GNU LGPLv3' ){
    return 'https://choosealicense.com/licenses/lgpl-3.0/'
  } else if(license === 'Mozilla Public License 2.0' ){
    return 'https://choosealicense.com/licenses/mpl-2.0/'
  } else if(license === 'Apache License 2.0' ){
    return 'https://choosealicense.com/licenses/apache-2.0/'
  } else if(license === 'MIT License' ){
    return 'https://choosealicense.com/licenses/mit/'
  } else if(license === 'Boost Software License 1.0' ){
    return 'https://choosealicense.com/licenses/bsl-1.0/'
  } else if(license === 'The Unlicense' ){
    return ''
  }
}

function renderLicenseSection(license) {
  if(license === 'The Unlicense' ){
    return ''
  }
  return `## License

This Application is covered under [${license}](${renderLicenseLink(license)})`
}


function generateMarkdown(data) {
  return `# ${data.title}

![license badge](https://img.shields.io/badge/${renderLicenseBadge(data.license)})
  
## Description
  
${data.description}
  
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)
- [License](#license)
- [Test](#test)
- [Questions](#questions)
  
## Installation
  
${data.installationSteps.map(stepsObject => {return '- ' + stepsObject.step + '\n'}).join('')}
  
## Usage
  
${data.usage}

## Contributions
  
${data.contributions.map(contributionObject => {return '- ' + contributionObject.contribution + '\n'}).join('')}

${renderLicenseSection(data.license)}

## Test
  
${data.tests.map(testObject => {return '- ' + testObject.test + '\n'}).join('')}

## Questions

My Github Username: [${data.github}](https://github.com/${data.github})

you can reach me via email [${data.email}](mailto:${data.email})

`;
}

module.exports = { generateMarkdown };