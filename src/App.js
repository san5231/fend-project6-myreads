import React from "react";
import * as BooksAPI from "./BooksAPI";
import SearchPage from "./SearchPage";
import MainPage from "./MainPage";
import { Route } from "react-router-dom";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MainPage books={this.state.books} updateShelf={this.updateShelf} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              updateShelf={this.updateShelf}
              books={this.state.books}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
