// Core module
const express = require("express");
const app = express();

// Third-party module
const expressLayouts = require("express-ejs-layouts");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const flash = require("connect-flash");

// Local module
const users = require("./utils/users");
const authTokens = require("./utils/auth-tokens");

const port = 3100;

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// To parse cookies from the HTTP Request
app.use(cookieParser());

// To make public folder
app.use(express.static("public"));

// EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

// // HBS
// app.engine(
//   "hbs",
//   exphbs({
//     extname: ".hbs",
//   })
// );

// app.set("view engine", "hbs");

// Flash configuration
// app.use(cookieParser("keyboard cat"));
// app.use(
//   session({
//     cookie: { maxAge: 60000 },
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
// app.use(flash());

app.get("/", function (req, res) {
  res.render("index", {
    title: 'Traditional Games',
    layout: 'layouts/main',
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    title: 'Register',
    layout: 'layouts/main',
  });
});

// Hash password
const crypto = require("crypto");

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

// app.post("/register", (req, res) => {
//   const { email, firstName, lastName, password, confirmPassword } = req.body;

//   // Check if the password and confirm password fields match
//   if (password === confirmPassword) {
//     // Check if user with the same email is also registered
//     const file = users.loadFile()
//     if (file.find((user) => user.email === email)) {
//       res.render("register", {
//         title: 'Register',
//         message: "User already registered.",
//         messageClass: "alert-danger",
//       });

//       return;
//     }

//     const hashedPassword = getHashedPassword(password);

//     // Store user into the database if you are using one
//     users.addUser({ email, firstName, lastName, password: hashedPassword });

//     res.render("login", {
//       title: 'Log In',
//       message: "Registration Complete. Please login to continue.",
//       messageClass: "alert-success",
//     });
//   } else {
//     res.render("register", {
//       title: 'Register',
//       message: "Password does not match.",
//       messageClass: "alert-danger",
//     });
//   }
// });

app.post(
  "/register",
  // Express validator
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
        layout: 'layouts/main',
        title: "Register",
        errors: errors.array(),
      });
    } else {
      users.addUser({ email, firstName, lastName, password: hashedPassword });
      // req.flash("alert", "Account successfully created");
      res.render("login", {
        layout: 'layouts/main',
        title: "Log In",
        message: "Account successfully created",
        messageClass: "alert-success",
        // msg: req.flash("alert"),
      });
      // res.redirect("/login");
    }
  }
);

app.get("/login", (req, res) => {
  res.render("login", {
    layout: 'layouts/main',
    title: 'Log In',
  });
});

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};

// This will hold the users and authToken related to users
const dataTokens = authTokens.loadFile();

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = getHashedPassword(password);
  const file = users.loadFile();

  const user = file.find((u) => {
    return u.email === email && hashedPassword === u.password;
  });

  if (user) {
    const authToken = generateAuthToken();
    const time = authTokens.getTime();
    user.time = time;

    // Store authentication token
    dataTokens[authToken] = user;
    authTokens.saveTokens(dataTokens);

    // Setting the auth token in cookies
    res.cookie("AuthToken", authToken);

    // Redirect user to the protected page
    res.redirect("/protected");
  } else {
    res.render("login", {
      layout: 'layouts/main',
      title: 'Log In',
      message: "Invalid username or password",
      messageClass: "alert-danger",
    });
  }
});

app.use((req, res, next) => {
  // Get auth token from the cookies
  const authToken = req.cookies["AuthToken"];

  // Inject the user to the request
  req.user = dataTokens[authToken];

  next();
});

app.get("/protected", (req, res) => {
  if (req.user) {
    res.render("protected", {
      layout: 'layouts/main',
      title: 'Protected',
    });
  } else {
    res.render("login", {
      layout: 'layouts/main',
      title: 'Log In',
      message: "Please login to continue",
      messageClass: "alert-danger",
    });
  }
});

const requireAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.render("login", {
      layout: 'layouts/main',
      title: 'Log In',
      message: "Please login to continue",
      messageClass: "alert-danger",
    });
  }
};

app.get("/protected", requireAuth, (req, res) => {
  res.render("protected", {
    layout: 'layouts/main',
    title: 'Protected',
  });
});

app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});

// code adobted from https://stackabuse.com/handling-authentication-in-express-js
