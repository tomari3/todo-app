import _ from "lodash";
import "../style.css";
const { default: Todo } = require("./toDo");
const { default: userInterface } = require("./userInterface");
const fns = require("date-fns");

let allToDo = require("./allToDo");
let allDone = require("./allToDo");

(function settingTask() {
  let currentTab = allToDo;

  (function switchingTabs() {
    const tabTitle = document.querySelector(".tab-title");
    const currentDay = document.queryCommandIndeterm(".tab_current-day");
    const leftMenu = document.querySelector(".left-menu");
    const tabs = leftMenu.childNodes;

    tabs.forEach((node) => {
      node.addEventListener("click", (e) => {
        if (node.id === "my-day") {
          tabTitle.textContent = "my day";
          let todayTodo = filterByToday(allToDo);
          renderList(todayTodo);
        }
        if (node.id === "important") {
          tabTitle.textContent = "important";
          let importantTodo = filterByImportance(allToDo);
          renderList(importantTodo);
        }
        if (node.id === "planned") {
          tabTitle.textContent = "planned";
          let dueTodayToDo = filterByDueDate(allToDo);
          renderList(dueTodayToDo);
        }
        if (node.id === "tasks") {
          tabTitle.textContent = "tasks";
          renderList(allToDo);
        }
      });
    });
  })();

  (function closeSide() {
    const closeBtn = document.querySelector("#close-btn");
    const leftMenu = document.querySelector(".left-menu");
    const body = document.body;
    const title = document.querySelector(".tab-title_container");

    closeBtn.addEventListener("click", (e) => {
      leftMenu.classList.toggle("hide");
      body.classList.toggle("hide");
      title.classList.toggle("hide");
    });
  })();

  (function submit() {
    const btn = document.querySelector("#main-title-form button[type=submit]");
    const title = document.querySelector("#main-title-input");
    const dueDateInput = document.querySelector("input[name='due-date']");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (title.value.trim() === "") {
        return false;
      }

      let task = new Todo();

      task.title = title.value;
      task.dueDate = dueDateInput.value;

      title.value = "";

      allToDo.push(task);
      renderList(currentTab);
    });
  })();

  (function dueButton() {
    const btn = document.querySelector("#due-date");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("ok");
    });
  })();
  (function reminderButton() {
    const btn = document.querySelector("#reminder");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("ok");
    });
  })();
  (function repeatButton() {
    const btn = document.querySelector("#repeat");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("ok");
    });
  })();

  (function toggleDone() {
    const container = document.querySelector(".tasks-main-display");
    container.addEventListener("click", function (e) {
      if (e.target.classList.contains("task-checker")) {
        let i = e.target.parentNode.querySelector(".task_id").textContent;
        let item = allToDo[i];
        let isDone = item.done;
        item.done = !isDone;
      }
    });
  })();

  (function deleteTask() {
    const container = document.querySelector(".tasks-main-display");
    container.addEventListener("click", function (e) {
      if (e.target.classList.contains("task-delete")) {
        let i = e.target.parentNode.querySelector(".task_id").textContent;
        if ((i = 0)) {
          allToDo.pop();
          renderList(allToDo);
        }
        allToDo[i].removeFromList();
        renderList(allToDo);
      }
    });
  })();

  (function markImportant() {
    const container = document.querySelector(".tasks-main-display");
    container.addEventListener("click", function (e) {
      if (e.target.classList.contains("task-important")) {
        let i = e.target.parentNode.querySelector(".task_id").textContent;
        allToDo[i].markImportance();
      }
    });
  })();

  let filterByToday = (list) => {
    let today = fns.format(new Date(), "dd-MMM-yyyy");

    let result = list.filter((obj) => {
      return obj.dateTime.includes(today);
    });
    return result;
  };

  let filterByImportance = (list) => {
    let result = list.filter((obj) => {
      return obj.importance === true;
    });
    return result;
  };

  let filterByDueDate = (list) => {
    let today = fns.format(new Date(), "dd-MMM-yyyy");

    let result = list.filter((obj) => {
      return obj.dueDate.includes(today);
    });
    return result;
  };

  let renderList = (tasksList) => {
    let display = document.querySelector(".tasks-main-display");
    display.textContent = "";
    tasksList.forEach((obj) => {
      let div = document.createElement("div");
      let checkNText = document.createElement("div");
      let check = document.createElement("div");
      let del = document.createElement("div");
      let star = document.createElement("div");

      star.classList.add("task-important");
      star.textContent = "★";
      del.classList.add("task-delete");
      del.textContent = "✖";
      check.classList.add("task-checker");
      checkNText.classList.add("list_check-and-text");
      checkNText.append(check);
      div.classList.add("list-row");

      for (let [key, value] of Object.entries(obj)) {
        if (key === "done" && value === true) {
          let p = document.createElement("p");
          p.classList.add("task_" + key);
          div.classList.add("checked");
          check.classList.add("checked");
          p.textContent = value;
          checkNText.append(p);
        }
        if (key === "importance" && value === true) {
          let p = document.createElement("p");
          p.classList.add("task_" + key);
          div.classList.add("important");
          check.classList.add("important");
          p.textContent = value;
          checkNText.append(p);
        }
        let p = document.createElement("p");
        p.classList.add("task_" + key);
        p.textContent = value;
        checkNText.append(p);
      }

      div.append(checkNText, star, del);

      display.append(div);
    });
  };
})();
