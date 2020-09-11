const PROGRAM_STATES = {
  ready: "ready",
  new: "new",
  wait: "wait",
  done: "done",
};

class Program {
  constructor(name, source) {
    this.program_state = PROGRAM_STATES.new;
    this.name = name;
    this.source = source;

    this.stdin = [];
    this.stdout = [];
    this.stderr = [];

    this.pipes = [];
  }

  // expose standard input to OS or other process.
  getStdIn() {
    return this.stdin;
  }

  // handle pipe command
  pipe(program_instance) {
    this.pipes.push(program_instance);
  }

  call_io(callback) {
    this.program_state = PROGRAM_STATES.wait;

    // Some Async Call that is done after 2 seconds.
    setTimeout(function () {
      // Create an Error boject to handle any error here.
      some_error = null;

      // Do your thing . . .

      // Update the program state to be ready again.
      this.program_state = PROGRAM_STATES.ready;

      // call the callback once done.
      callback(some_error, { result: "okay" });
    }, 2000);
  }

  handle_standard_output() {
    const output = this.stdout.shift();

    if (output) {
      console.log(`${this.name}: out - ${output}`);
    }

    if (this.pipes.length != 0) {
      // Pipe out the standard output

      this.pipes.forEach(function (program_instance) {
        const input = program_instance.getStdIn();

        input.push(output);
      });
    }
  }

  handle_standard_error() {
    const output = this.stderr.shift();

    if (output) {
      console.log(`${this.name}: error - ${output}`);
    }
  }

  run(os_api) {
    switch (this.program_state) {
      case PROGRAM_STATES.new:
        this.program_state = PROGRAM_STATES.ready;

        return this.program_state;

      case PROGRAM_STATES.ready:
        this.source(
          {
            stdin: this.stdin,
            stdout: this.stdout,
            stderr: this.stderr,
          },
          {
            ...os_api,
            call_io: this.call_io.bind(this),
          }
        );

        this.handle_standard_output();
        this.handle_standard_error();

        return this.program_state;

      case PROGRAM_STATES.wait:
      case PROGRAM_STATES.done:
      default:
        return this.program_state;
    }
  }
}

module.exports = Program;
