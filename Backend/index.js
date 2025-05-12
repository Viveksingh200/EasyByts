const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const projectRoutes = require("../Backend/routes/project.js");
const blogRoute = require("../Backend/routes/blogPost.js");
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('../Backend/routes/auth.js');
const contactRoutes = require("../Backend/routes/contact.js");
const initializePassport = require('../Backend/passport-config.js');
initializePassport(passport);

main()
.then(res => console.log(res))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/portfolio');
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    // Allow the origin and enable credentials
    return callback(null, true);
  },
  credentials: true
}));

const MongoStore = require('connect-mongo');

app.use(session({
  secret: 'yourSecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/portfolio',
    collectionName: 'sessions',
  }),
  cookie: {
    secure: false, // set true only with HTTPS
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoute);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
