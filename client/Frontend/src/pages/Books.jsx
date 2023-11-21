import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        console.log(res);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>books</h1>
      {books.map((book) => {
        return (
          <div key={book.id}>
            <h2>{book.id}</h2>
            <h2>{book.title}</h2>
            <h2>{book.desc}</h2>
            {book.cover && <img src={book.cover} alt="" />}
            <button
              onClick={() => {
                handleDelete(book.id);
              }}
            >
              Delete
            </button>
            <button>
              <Link to={`/update/` + book.id}>Update</Link>
            </button>
          </div>
        );
      })}
      <button type="submit">
        <Link to="./add">Add new book</Link>
      </button>
    </div>
  );
};

export default Books;
