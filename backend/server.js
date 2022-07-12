require("dotenv").config();

const express = require("express");
const notesRouter = require("./routes/notes");

// express server
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/notes", notesRouter);

// listen on port 4000
app.listen(process.env.PORT, () => {
  console.log(`listening on port`, process.env.PORT);
});
