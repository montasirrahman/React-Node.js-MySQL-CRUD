import express from "express";

import mysql from "mysql";

import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "test",
});

//if get any errors
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello this is the backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM test.books;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted successfully");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ? WHERE id = ?";
  const values = [req.body.title, req.body.desc, req.body.cover];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend. PORT 8800");
});
