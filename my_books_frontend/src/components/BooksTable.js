import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(title, author, pub_date, isbn, page_count, language) {
  return { title, author, pub_date, isbn, page_count, language };
}

const rows = [
  createData("Hobbit 1", 159, 6.0, 24, 4.0, 5.4),
  createData("Hobbit 2", 237, 9.0, 37, 4.3, 5.4),
  createData("Hobbit 3", 262, 16.0, 24, 6.0, 5.4),
  createData("Hobbit 4", 305, 3.7, 67, 4.3, 5.4),
  createData("Hobbit 5", 356, 16.0, 49, 3.9, 5.4),
];

export default class BooksTable extends Component {
  constructor(props) {
    super(props);
    this.downloadBooks();
    this.state = {
      rows: [
        createData("Hobbit 1", 159, 6.0, 24, 4.0, 5.4),
        createData("Hobbit 2", 237, 9.0, 37, 4.3, 5.4),
        createData("Hobbit 3", 262, 16.0, 24, 6.0, 5.4),
        createData("Hobbit 4", 305, 3.7, 67, 4.3, 5.4),
        createData("Hobbit 5", 356, 16.0, 49, 3.9, 5.4),
      ],
    };
  }

  downloadBooks() {
    fetch("127.0.0.1/api/books")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  render() {
    // const classes = useStyles();

    return (
      <Box mt={5}>
        <TableContainer component={Paper}>
          <Table /*className={classes.table}*/ aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Published (year)</TableCell>
                <TableCell align="right">ISBN</TableCell>
                <TableCell align="right">Page count</TableCell>
                <TableCell align="right">Language</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.author}</TableCell>
                  <TableCell align="right">{row.pub_date}</TableCell>
                  <TableCell align="right">{row.isbn}</TableCell>
                  <TableCell align="right">{row.page_count}</TableCell>
                  <TableCell align="right">{row.language}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}
