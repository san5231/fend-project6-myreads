import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import DebounceInput from "react-debounce-input";
import { Link } from "react-router-dom";

class SearchPage extends Component {
  state = {
    query: "",
    searchedBooks: []
  };
  updateQuery = query => {
    this.setState({ query: query });
    this.updateSearchedBooks(query);
  };

  updateSearchedBooks = query => {
    if (query) {
      BooksAPI.search(query).then(searchedBooks => {
        if (searchedBooks.error) {
          this.setState({ searchedBooks: [] });
        } else {
          this.setState({ searchedBooks: searchedBooks });
        }
      });
    } else {
      this.setState({ searchedBooks: [] });
    }
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              debounceTimeout={1000}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.map(searchedBook => {
              let shelf = "none";
              this.props.books.map(
                book =>
                  book.id === searchedBook.id ? (shelf = book.shelf) : ""
              );
              return (
                <li key={searchedBook.id}>
                  <Book
                    book={searchedBook}
                    updateShelf={this.props.updateShelf}
                    currentShelf={shelf}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
