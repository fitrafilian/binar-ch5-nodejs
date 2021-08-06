const fs = require("fs");

// Create folder data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Create file auth-tokens.json
const filePath = "./data/auth-tokens.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "{}");
}

// Open file auth-tokens.json
const loadFile = function () {
  const file = fs.readFileSync("data/auth-tokens.json", "utf8");
  return JSON.parse(file);
};

// menuliskan / menimpa file auth-tokens.json dengan data baru
const saveTokens = (tokens) => {
  fs.writeFileSync("data/auth-tokens.json", JSON.stringify(tokens));
};

// menambahkan data token baru
const addToken = (token, user) => {
  const tokens = loadFile();
  tokens[token] = user;
  saveTokens(tokens);
};

const getTime = function () {
  const date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var seconds = date.getSeconds();
  var timeNow = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
  return timeNow;
};

module.exports = {
  loadFile: loadFile,
  addToken: addToken,
  saveTokens: saveTokens,
  getTime: getTime,
};
