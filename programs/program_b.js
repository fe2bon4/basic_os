let count = 0;

const MyCode = ["Hello", "World", "I Am", "Program A"];
const Program = function (stdio, os_api) {
  const { stdin, stdout, stderr } = stdio;
  const { log } = os_api;

  const input = stdin.shift();

  if (input) {
    stdout.push(input);
  }

  return 0;
};

module.exports = Program;
