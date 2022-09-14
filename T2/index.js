const keys = ["id", "firstname", "lastname", "code","phone","email"];
const userForm = document.querySelector("#userForm");
const tbody = document.querySelector(".table-tbody");
const submit = document.querySelector("#usersubmit");
function render(data = []) {
  tbody.innerHTML = "";
  data.forEach((user) => {
    const row = document.createElement("tr");
    row.id = user.id;
    for (let key of keys) {
      const td = document.createElement("td");
      td.innerText = user[key];
      row.appendChild(td);
    }
    const td = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function (e) {
      deleteUser(user.id);
    });
    const updateButton = document.createElement("button");
    updateButton.classList.add("btn", "btn-success");
    updateButton.innerText = "Update";
    updateButton.addEventListener("click", function (e) {
      submit.value = "update";
      const row = e.target.parentElement.parentElement;   /*???????????*/
      for (let i = 0; i < row.childNodes.length - 1; i++) {
        const input = document.getElementById(keys[i]);
        input.value = row.childNodes[i].innerText;
      }
    });
    tbody.appendChild(row);
    row.appendChild(td);
    td.appendChild(deleteButton);
    td.appendChild(updateButton);
  });
}
let users = [];
function SetUsers(newusers) {
  users = [...newusers];
  render(users);
}
userForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(e.target); /*???????????*/
  const data = Object.fromEntries(formData.entries()); /*???????????*/
  if (submit.value === "update") {
    UpdateUser(data);
  } else {
    data.id = Math.floor(Math.random() * 1000);
    SetUsers([...users, data]);
  }
  submit.value = "create";
  e.target.reset();
});
function deleteUser(id) {
  SetUsers(users.filter((user) => user.id !== id));
}

function UpdateUser(data) {
  SetUsers(users.map((user) => (user.id == data.id ? data : user)));
}
