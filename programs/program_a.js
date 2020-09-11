let count = 0;

const MyCode = ["Hello", "World", "I Am", "Program A"];
const Program = function (stdio, os_api) {
  const { stdin, stdout, stderr } = stdio;
  const { log } = os_api;

  // log("I am program A");

  stdout.push("I am program A");

  return 0;
};

module.exports = Program;
