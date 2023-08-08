"use strict";

const fsP = require('fs/promises');
const axios = require('axios');

/**Take a path of file, and print the content of the file */
async function cat(path) {
  let contents = await fsP.readFile(path, "utf8");
  console.log("contents are", contents);
}

/**Take a URL and print the content of the URL to the console */
async function webCat(url) {
  const resp = await axios.get(url);
  console.log("statement ran inside webCat")
  // console.log("resp data content:", resp.data);
}

/**This allows us to handle exceptions from our async functions  */
async function errorCatcher() {
  const argument = process.argv[2]
  try {
    if (argument.startsWith('http://') || argument.startsWith('https://')) {
      await webCat(argument);
    } else {
      await cat(argument);
    }
  } catch (err) {
    // TODO: Ask how to get the error message in the notes??
    if (err.code === 'ERR_BAD_REQUEST') {
      const errorMsg = `Error fetching ${argument}:`
      const errorMsg2 = `Error: Request failed with` +
      `status code ${err.response.status}`;
      console.log(errorMsg);
      console.log(errorMsg2);
    } else {
      console.log(`Error reading ${argument}:`);
      console.log(err);
    }
    process.exit(1);
  }
}

errorCatcher();