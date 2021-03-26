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
          },
          {
            title: "Author",
            field: "author",
          },
          {
            title: "ISBN",
            field: "isbn_number",
          },
          {
            title: "Page count",
            field: "page_count",
          },

          {
            title: "Published",
            field: "pub_date",
          },
          {
            title: "Language",
            field: "language",
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
