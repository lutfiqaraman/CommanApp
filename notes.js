const fs = require("fs");
const chalk = require("chalk");

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes, null, 4);
  const fileName = "notes.json";
  fs.writeFileSync(fileName, dataJSON);
};

const loadNotes = () => {
  try {
    const fileName = "notes.json";
    const dataBuffer = fs.readFileSync(fileName);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    if (error) return [];
  }
};

exports.listNotes = () => {
  const notes = loadNotes();

  notes.forEach(note => {
    process.stdout.write("Title: " + chalk.underline(note.title) + '\n');
  });
};

exports.addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title,
      body
    });

    saveNotes(notes);
    process.stdout.write(chalk.black.bgGreen("A new note had been added."));
  } else {
    process.stdout.write(
      chalk.black.bgRed("Note title was already created ... ")
    );
  }
};

exports.removeNote = title => {
  const notes = loadNotes();
  const remainingNotes = notes.filter(note => note.title !== title);

  if (notes.length > remainingNotes.length) {
    process.stdout.write(chalk.green.inverse("Note has been removed ..."));
    saveNotes(remainingNotes);
  } else {
    process.stdout.write(chalk.red.inverse("Sorry, no note found ..."));
  }
};

exports.readNote = (title) => {
  const notes = loadNotes();
  const findedNote = notes.find(note => note.title == title);

  if (findedNote) {
    process.stdout.write(chalk.bold.underline("Title: ") + chalk.bold.underline(findedNote.title) + '\n');
    process.stdout.write("Body: " + findedNote.body + '\n');
  } else {
    process.stdout.write(chalk.bold('Note not found'));
  }

}

exports.numberOfArticles = () => {
  const notes = loadNotes();
  let count = 0;

  count = notes.length;

  process.stdout.write('Number of articles: ' + count);
}