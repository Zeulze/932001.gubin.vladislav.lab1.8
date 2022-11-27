"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector(".add"),
    saveBtn = document.querySelector(".save"),
    wrapper = document.querySelector(".wrapper");

  toHangEvents(wrapper.firstElementChild);

  addBtn.addEventListener("click", () => {
    let label = document.createElement("label");
    label.classList.add("list");
    label.innerHTML =
      '<input type="text" class="list-input">\n' +
      '            <input type="text" class="list-input">\n' +
      '            <button class="up list-button">↑</button>\n' +
      '            <button class="down list-button">↓</button>\n' +
      '            <button class="delete list-button">х</button>';
    wrapper.append(label);
    toHangEvents(label);
  });

  function toHangEvents(parentNode) {
    const upBtn = parentNode.querySelector(".up"),
      downBtn = parentNode.querySelector(".down"),
      deleteBtn = parentNode.querySelector(".delete");
    let helper;

    upBtn.addEventListener("click", () => {
      parentNode.previousElementSibling.before(parentNode);
    });

    downBtn.addEventListener("click", () => {
      parentNode.nextElementSibling.after(parentNode);
    });

    deleteBtn.addEventListener("click", () => {
      wrapper.removeChild(parentNode);
    });
  }

  saveBtn.addEventListener("click", () => {
    const wrapperLists = wrapper.querySelectorAll(".list");

    saveBtn.nextElementSibling.remove(); //Закомментить, если не нужно удалять прошлые сейвы

    let div = document.createElement("div"),
      string = "",
      count = 0;

    wrapperLists.forEach((item, index) => {
      let inputs = item.querySelectorAll(".list-input");
      count++;
      string += `"${inputs[0].value}":`;
      string += `"${inputs[1].value}"`;
      if (count !== wrapperLists.length) string += ",";
    });
    div.innerText = `{${string}}`;
    saveBtn.after(div);
    saveBtn.style.borderColor = "#87CEEB";
  });

  document.addEventListener("click", (e) => {
    let target = e.target;
    if (target && target !== saveBtn) {
      saveBtn.style.borderColor = "grey";
    }
  });
});
