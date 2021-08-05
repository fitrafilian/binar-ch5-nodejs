const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { body, validationResult, check } = require("express-validator");
const users = require("./utils/users");
const app = express();

const port = 5000;

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// To parse cookies from the HTTP Request
app.use(cookieParser());

// To make public folder
app.use(express.static("public"));

// EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Traditional Games",
    layout: "layouts/main",
  });
});

app.get("/games", (req, res) => {
  res.render("games", {
    title: "Rock, Paper, Scissor",
    layout: "layouts/main",
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
    layout: "layouts/main",
  });
});

const crypto = require("crypto");
const { loadFile } = require("./utils/users");

// Function to hash password
const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

// Register
app.post(
  "/register",
  [
    check("email", "Email is not valid").isEmail(),
    body("email").custom((value) => {
      const duplicate = users.checkDuplicate(value);
      if (duplicate) {
        throw new Error("Email is already exist!");
      }
      return true;
    }),
    check("password", "Password at least 8 characters in length.").isLength({ min: 8 }),
    check("confirmPassword", "Password at least 8 characters in length.").isLength({ min: 8 }),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    const { email, firstName, lastName, password, confirmPassword } = req.body;
    const hashedPassword = getHashedPassword(password);
    if (!errors.isEmpty()) {
      res.render("register", {
        layout: "layouts/main",
        title: "Register",
        errors: errors.array(),
      });
    } else {
      users.addUser({ email, firstName, lastName, password: hashedPassword });
      res.render("login", {
        layout: "layouts/main",
        title: "Log In",
      });
      // res.redirect("/");
    }
  }
);

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Log In",
    layout: "layouts/main",
  });
});

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};

// This will hold the users and authToken related to users
const authTokens = {};

app.post(
  "/login",
  [
    body(["email", "password"]).custom((email, password) => {
      const file = users.loadFile();
      const valueEmail = file.find((u) => {
        return u.email === email;
      });
      const valuePassword = file.find((u) => {
        return u.password === password;
      });
      const user = !valueEmail || !valuePassword;
      if (user) {
        throw new Error("Invalid email or password");
      }
      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);
    const file = users.loadFile();

    const user = file.find((u) => {
      return u.email === email && hashedPassword === u.password;
    });

    if (user) {
      const authToken = generateAuthToken();

      // Store authentication token
      authTokens[authToken] = user;

      // Setting the auth token in cookies
      res.cookie("AuthToken", authToken);

      // Redirect user to the protected page
      res.redirect("/protected");
    } else {
      res.render("login", {
        title: "Log In",
        layout: "layouts/main",
        errors: errors.array(),
      });
    }
  }
);

app.use((req, res, next) => {
  // Get auth token from the cookies
  const authToken = req.cookies["AuthToken"];

  // Inject the user to the request
  req.user = authTokens[authToken];

  next();
});

app.get("/protected", (req, res) => {
  if (req.user) {
    res.render("protected", {
      title: "Protected",
      layout: "layouts/main",
    });
  } else {
    res.render("login", {
      title: "Log In",
      layout: "layouts/main",
    });
  }
});

const requireAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.render("login", {
      title: "Log In",
      layout: "layouts/main",
    });
  }
};

app.get("/protected", requireAuth, (req, res) => {
  res.render("protected", {
    title: "Protected",
    layout: "layouts/main",
  });
});

app.get("/aaa", (req, res) => {
  res.send(authTokens);
});

app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});
