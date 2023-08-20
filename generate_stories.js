// Import all props from @jsonforms/example and print the keys, note that the current file is run on node and the examples are es6 modules
// example are exported as below 
import * as examples from '@jsonforms/examples';
import fs from 'fs';
const storiesFolder = './src/stories/examples';
const storyTemplate = './src/stories/Story.txt';

let templateContent = '';
// Remova all files from the stories folder
fs.readdir(storiesFolder, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    fs.unlink(`${storiesFolder}/${file}`, err => {
      if (err) throw err;
    });
  }
});

// Read content of Story.txt file
fs.readFile(storyTemplate, 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  templateContent = data;

  // Iterate over all examples and generate a story for each, the story will be named after the example, skip the __esModule prop
  Object.keys(examples).forEach(exampleName => {
    if (exampleName === '__esModule') return;

    const example = examples[exampleName];
    const storyName = exampleName;
    const storyFile = `${storiesFolder}/${exampleName}.stories.js`;
    
    // Replace the template content with the example content
    const storyContent = templateContent.replaceAll('<% example %>', storyName);;
    console.log(templateContent);
    // Write the content to the file using node
    fs.writeFile(storyFile, storyContent, (err) => {
      if (err) throw err;
      console.log(`The file ${storyFile} has been saved!`);
    });
  });
});


  




