const fns = require("date-fns");

let allToDo = require("./allToDo");

let getDateTime = () => {
  let dateTime = fns.format(new Date(), "dd-MMM-yyyy HH:mm");
  return dateTime;
};

export default class Todo {
  constructor(
    title,
    description,
    importance,
    group,
    dueDate,
    repetition,
    reminder,
    done
  ) {
    this.done = false;
    this.id = allToDo.length;
    this.dateTime = getDateTime();
    this.importance = false;
    this.title = title;
    this.description = description;
    this.group = group;
    this.dueDate = dueDate;
    this.repetition = repetition;
    this.reminder = reminder;
  }

  addToList() {
    allToDo.push(this);
    console.log(allToDo);
  }

  removeFromList() {
    let i = allToDo.findIndex((x) => x.id === this.id);
    allToDo.splice(i, 1);
  }

  markImportance() {
    this.importance = true;
  }
}
