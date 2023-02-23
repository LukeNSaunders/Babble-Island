import React, { useEffect, useState } from "react";
import "./library.css";
import item from "../../../pixel/book.png";
import { storyReader } from "../../../ApiClient.js";

function Book({ book, setCurrentBook, setSoundUrl, currentBook }) {
  useEffect(() => {});

  async function selectBook() {
    setCurrentBook(book);
    console.log(currentBook.title);
    // const blob = await storyReader(book);
    // setSoundUrl(blob.url);
  }

  return (
    <div className="book" onClick={selectBook}>
      <img className="cover" src={item} />
      <div className="book-title">{book.title}</div>
    </div>
  );
}

export default Book;
