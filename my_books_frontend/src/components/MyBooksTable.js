import MaterialTable from "material-table";
import React from "react";
import { Box } from "@material-ui/core";

const ISBN = require("isbn-verify");

export default function MyBooksTable(props) {
  return (
    <Box mt={2}>
      <MaterialTable
        title="MyBooks"
        columns={[
          {
            title: "Title",
            field: "title",
            validate: (rowData) => rowData.title.length > 0,
          },
          {
            title: "Author",
            field: "author",
            validate: (rowData) => /^[a-z ,.'-]+$/i.test(rowData.author),
          },
          {
            title: "ISBN",
            field: "isbn_number",
            validate: (rowData) => rowData.isbn_number.length > 0,
          },
          {
            title: "Page count",
            field: "page_count",
          },

          {
            title: "Published",
            field: "pub_date",
            validate: (rowData) =>
              rowData.pub_date > 0 && rowData.pub_date < 2021,
          },
          {
            title: "Language",
            field: "language",
            validate: (rowData) => /^[a-zA-Z]+$/.test(rowData.language),
          },
        ]}
        data={props.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              props.onAddNewBook(newData);
              resolve();
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              props.onEditBook(newData, oldData);
              resolve();
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              props.onRemoveBook(oldData);
              resolve();
            }),
        }}
        options={{
          filtering: true,
        }}
      />
    </Box>
  );
}
