import React, { Component } from "react";
import { Container, Box, Button } from "@material-ui/core";
import MyBooksTable from "./MyBooksTable";
import GoogleBooksTable from "./GoogleBooksTable";
import {
  sendNewBookToServer,
  editBookOnServer,
  deleteBookFromServer,
} from "../helpers";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.downloadBooks();
    this.state = { myBooks: [] };
    this.onAddNewBook = this.onAddNewBook.bind(this);
    this.onEditBook = this.onEditBook.bind(this);
    this.onRemoveBook = this.onRemoveBook.bind(this);
    this.onImportBook = this.onImportBook.bind(this);
  }

  addNewBookToTable(newBook) {
    this.setState({ myBooks: [...this.state.myBooks, newBook] });
  }

  onImportBook(newBook) {
    this.addNewBookToTable(newBook);
    sendNewBookToServer(newBook);
  }
  onAddNewBook(newBook) {
    this.addNewBookToTable(newBook);
    sendNewBookToServer(newBook);
  }

  onEditBook(newBook, oldBook) {
    const dataUpdate = [...this.state.myBooks];
    const index = oldBook.tableData.id;
    dataUpdate[index] = newBook;
    this.setState({ myBooks: dataUpdate });
    editBookOnServer(oldBook, newBook);
  }

  onRemoveBook(oldBook) {
    const dataDelete = [...this.state.myBooks];
    const index = oldBook.tableData.id;
    dataDelete.splice(index, 1);
    this.setState({ myBooks: dataDelete });
    deleteBookFromServer(oldBook);
  }

  downloadBooks() {
    fetch("/api/books")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ myBooks: data });
      });
  }

  render() {
    return (
      <Box mt={5}>
        <Container>
          <GoogleBooksTable onImportBook={this.onImportBook} />
          <MyBooksTable
            data={this.state.myBooks}
            onAddNewBook={this.onAddNewBook}
            onEditBook={this.onEditBook}
            onRemoveBook={this.onRemoveBook}
          />
        </Container>
      </Box>
    );
  }
}
