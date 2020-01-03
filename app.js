const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
});

// Create list command
yargs.command({
  command: "list",
  describe: "List nodes",
  handler() {
    notes.listNotes();
  }
});

// Create read command
yargs.command({
  command: "read",
  describe: "Read a node",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
});

// Create count command
yargs.command({
  command: "count",
  describe: "Show number of articles",
  handler() {
    notes.numberOfArticles();
  }
});

// Version information
yargs
  .version()
  .alias({
    version: "v"
  })
  .describe("version", "show version information");

yargs.parse();
