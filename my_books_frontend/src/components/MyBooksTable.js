import MaterialTable from "material-table";
import React from "react";
import { Box } from "@material-ui/core";

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
          },
          {
            title: "ISBN",
            field: "isbn_number",
            validate: (rowData) => {
              return (
                rowData.isbn_number.length == 10 ||
                rowData.isbn_number.length == 13
              );
            },
          },
          {
            title: "Page count",
            field: "page_count",
            validate: (rowData) => {
              return (
                rowData.page_count > 0 && Number.isInteger(rowData.pub_date)
              );
            },
          },

          {
            title: "Published",
            field: "pub_date",
            validate: (rowData) => {
              return (
                rowData.page_count > 0 && Number.isInteger(rowData.pub_date)
              );
            },
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
