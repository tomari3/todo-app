const fns = require("date-fns");
const allToDo = require("./allToDo");

let elFactory = (type, attributes, ...children) => {
  const el = document.createElement(type);

  for (key in attributes) {
    el.setAttribute(key, attributes[key]);
  }

  children.forEach((child) => {
    if (typeof child === "string") {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  });

  return el;
};

const body = document.body;

(function layout() {
  const nav = elFactory("nav", { class: "head-nav" });
  const leftMenu = elFactory("section", { class: "left-menu" });
  const main = elFactory("main", { class: "main-main" });
  body.append(nav, leftMenu, main);
})();

const nav = document.querySelector(".head-nav");
const leftMenu = document.querySelector(".left-menu");
const main = document.querySelector(".main-main");

(function mainInput() {
  const tabContainer = elFactory("div", { class: "tab-title_container" });
  const tabTitle = elFactory("h1", { class: "tab-title" }, "My Day");
  const today = new Date();
  let currentDay = fns.format(new Date(), "EEEE, MMMM d");
  const currentDayDisplay = elFactory(
    "p",
    { class: "tab_current-day" },
    currentDay
  );

  const closeSideBar = elFactory(
    "span",
    {
      class: " main_close-btn",
      id: "close-btn",
    },
    "|||"
  );

  tabContainer.append(closeSideBar, tabTitle, currentDayDisplay);

  let form = (aLabel, aName, anInput, anId) => {
    const form = elFactory("form", {
      id: anId + "-form",
      class: anId + "_form",
    });
    const label = elFactory(
      "label",
      { for: aName, class: anId + "-form_label" },
      aLabel
    );
    const title = elFactory("input", {
      type: anInput,
      name: aName,
      class: anId + "-form_input",
      id: anId + "-input",
      placeholder: "add a task",
    });

    const submit = elFactory("button", { type: "submit" }, "+");
    function options() {
      const elOptions = elFactory("div", { class: "form_options" });
      const due = elFactory(
        "input",
        {
          class: "due-date",
          type: "text",
          id: "due-date",
          name: "due-date",
          placeholder: "due date",
          onfocus: "(this.type='date')",
          onblur: "(this.type='text')",
        },
        "due"
      );
      const reminder = elFactory(
        "input",
        {
          class: "reminder",
          type: "text",
          id: "reminder",
          name: "reminder",
          placeholder: "reminder",
          onfocus: "(this.type='date')",
          onblur: "(this.type='text')",
        },
        "reminder"
      );
      const repeat = elFactory(
        "input",
        {
          class: "repeat",
          type: "text",
          id: "repeat",
          name: "repeat",
          placeholder: "repeat",
          onfocus: "(this.type='date')",
          onblur: "(this.type='text')",
        },
        "repeat"
      );
      elOptions.append(due, reminder, repeat);

      return elOptions;
    }
    const elOptions = options();

    form.append(label, title, elOptions, submit);
    return form;
  };

  const displayTodo = elFactory("div", { class: "tasks-main-display" });
  const inputContainer = elFactory("div", { class: " main_input-container" });
  const elForm = form("title", "title", "text", "main-title");
  inputContainer.append(elForm);

  main.append(tabContainer, inputContainer, displayTodo);
})();

(function navLayout() {
  const title = elFactory("h1", { class: "nav--title" }, "To Do");
  const searchBar = elFactory("input", {
    class: "nav--search-bar",
    type: "search",
  });
  nav.append(title, searchBar);
})();

(function leftMenuLayout() {
  const myDay = elFactory("div", {
    class: "left-menu__my-day_container active",
    id: "my-day",
  });
  const myDayText = elFactory("h2", { class: "my-day--text" }, "my day");
  myDay.append(myDayText);

  const important = elFactory("div", {
    class: "left-menu--important_container",
    id: "important",
  });
  const importantText = elFactory(
    "h2",
    { class: "important--text" },
    "important"
  );
  important.append(importantText);

  const planned = elFactory("div", {
    class: "left-menu__planned_container",
    id: "planned",
  });
  const plannedText = elFactory("h2", { class: "planned--text" }, "planned");
  planned.append(plannedText);

  const tasks = elFactory("div", { class: "left-menu__tasks", id: "tasks" });
  const tasksText = elFactory("h2", { class: "tasks--text" }, "tasks");
  tasks.append(tasksText);

  const newList = elFactory("div", {
    class: "left-menu__new-list",
    id: "new-list",
  });
  const newListText = elFactory("h2", { class: "new-list--text" }, "new list");
  newList.append(newListText);

  leftMenu.append(myDay, important, planned, tasks);
})();

function dueDatePicker() {}

(function checkMarkListener() {
  const container = document.querySelector(".tasks-main-display");
  container.addEventListener("click", function (e) {
    if (e.target.classList.contains("task-checker")) {
      e.target.parentNode.parentNode.classList.toggle("checked");
      e.target.classList.toggle("checked");
    }
  });
})();
(function checkImportantListener() {
  const container = document.querySelector(".tasks-main-display");
  container.addEventListener("click", function (e) {
    if (e.target.classList.contains("task-important")) {
      e.target.classList.toggle("important");
    }
  });
})();

(function switchingTabs() {
  const tabTitle = document.querySelector(".tab-title");
  const currentDay = document.queryCommandIndeterm(".tab_current-day");
  const leftMenu = document.querySelector(".left-menu");
  const tabs = leftMenu.childNodes;

  tabs.forEach((node) => {
    node.addEventListener("click", (e) => {
      tabs.forEach((node) => {
        node.classList.remove("active");
      });
      node.classList.add("active");
    });
  });
})();
