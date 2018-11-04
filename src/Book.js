import React from "react";

const Book = props => {
  let displayThumbnail = props.book.imageLinks
    ? props.book.imageLinks.thumbnail
    : "";
  let displayAuthors = props.book.authors ? props.book.authors : [];
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${displayThumbnail}")`
          }}
        />
        <div className="book-shelf-changer">
          <select
            onChange={event =>
              props.updateShelf(props.book, event.target.value)
            }
            value={props.currentShelf}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{displayAuthors.join(", ")}</div>
    </div>
  );
};

export default Book;
