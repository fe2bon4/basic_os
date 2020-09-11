const OS_ENCODING = "utf-8";
const fs = require("fs");
const directory = `${process.cwd()}/drive/`;

const readFile = function (path) {
  return fs.readFileSync(`${directory}/${path}`, { encoding: OS_ENCODING });
};

const writeFile = function (path, data) {
  return fs.writeFileSync(`${directory}/${path}`, data, {
    encoding: OS_ENCODING,
  });
};

const streamFileRead = function (path) {
  return fs.createReadStream(`${directory}/${path}`, { encoding: OS_ENCODING });
};

const streamFileWrite = function (path) {
  return fs.createWriteStream(`${directory}/${path}`, {
    encoding: OS_ENCODING,
  });
};

const readdir = function (path) {
  return fs.readdirSync(`${directory}/${path}`, { encoding: OS_ENCODING });
};

module.exports = {
  readFile,
  writeFile,
  streamFileRead,
  streamFileWrite,
  readdir,
};
