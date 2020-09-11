const TIME_SCALE = 1000;
const CPU_INTERRUPT_INTERVAL_MS = TIME_SCALE * 4;
const OS_TICK_INTERVAL_MS = TIME_SCALE * 1;

const os_api = require("./os_api");

const { log, queue, store, file, Program } = os_api;
const ProgramA = new Program("A", require("./programs/program_a"));
const ProgramB = new Program("B", require("./programs/program_b"));
const ProgramC = new Program("C", require("./programs/program_c"));
const ProgramD = new Program("D", require("./programs/program_d"));

const new_queue = [];

const ready_queue = [];

const wait_queue = [];

let index_of_current_program = 0;
let currentProgram = list_of_programs[index_of_current_program];

// OS Function to calculate the index of the next program to run.
const calculateNextProgramIndex = function (current_index, num_of_programs) {
  return ++current_index % num_of_programs;
};

// OS Function to set the "Software" Program counter
const setCurrentProgram = function () {
  const num_of_programs = list_of_programs.length;

  // Update the index to point to the next program to run.
  index_of_current_program = calculateNextProgramIndex(
    index_of_current_program,
    num_of_programs
  );

  // Update the function pointer to point to the next program to run.
  currentProgram = list_of_programs[index_of_current_program];
};
// Interval to change currentProgram
setInterval(setCurrentProgram, CPU_INTERRUPT_INTERVAL_MS);

// Main OS Loop
setInterval(() => {
  currentProgram.run(os_api);
}, OS_TICK_INTERVAL_MS);
