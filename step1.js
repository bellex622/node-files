"use strict";

const fsP = require('fs/promises');

/**Take a path of file, and print the content of the file */
async function cat(path) {

  let contents = await fsP.readFile(path, "utf8");
  console.log("contents are", contents);


}

try {
  // console.log("process.argv[0]", process.argv[2]);
  cat(process.argv[2]);
} catch (err) {
  console.log(err);
  process.exit(1);
}
