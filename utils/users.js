const fs = require("fs");

// Membuat folder data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat file user.js jika belum ada
const filePath = "./data/users.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]");
}

// Open file user.json
const loadFile = function () {
  const file = fs.readFileSync("data/users.json", "utf8");
  return JSON.parse(file);
};

// menuliskan / menimpa file user.json dengan data baru
const saveUsers = (users) => {
  fs.writeFileSync("data/users.json", JSON.stringify(users));
};

// menambahkan data user baru
const addUser = (user) => {
  const users = loadFile();
  users.push(user);
  saveUsers(users);
};

// find contact by email
const findUser = (email) => {
  const users = loadFile();
  const user = users.find((user) => user.email.toLowerCase() == email.toLowerCase());
  return user;
};

// Check email exist
const checkDuplicate = (email) => {
  const users = loadFile();
  return users.find((user) => user.email === email);
};

module.exports = {
  addUser: addUser,
  findUser: findUser,
  loadFile: loadFile,
  checkDuplicate: checkDuplicate,
};
