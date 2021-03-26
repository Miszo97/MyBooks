import MaterialTable from "material-table";
import React from "react";

function convertDateToJustYear(date) {
  const dash_index = date.indexOf("-");
  if (dash_index != -1) {
    date = date.slice(0, dash_index);
  }
  return date;
}

function getIsbnNumberOrNull(industryIdentifiers) {
  industryIdentifiers.forEach((e) => {
    if (e["type"] == "ISBN_10" || e["type"] == "ISBN_13") {
      return e["identifier"];
    }
  });
  return null;
}

function parseResult(result) {
  let parsed_results = [];
  result.items.forEach((element) => {
    const newBook = {
      google_id: element.id,
      title: element.volumeInfo.title,
      page_count: element.volumeInfo.pageCount,
      language: element.volumeInfo.language,
    };

    if (element.volumeInfo.authors != undefined) {
      newBook["author"] = element.volumeInfo.authors.join(", ");
    }

    if (element.volumeInfo.publishedDate != undefined) {
      newBook["pub_date"] = convertDateToJustYear(
        element.volumeInfo.publishedDate
      );
    }

    const industryIdentifiers = element.volumeInfo.industryIdentifiers;

    if (industryIdentifiers != undefined) {
      let isbn_number = getIsbnNumberOrNull(industryIdentifiers);
      if (isbn_number != null) {
        newBook["isbn_number"] = isbn_number;
      }
    }

    parsed_results.push(newBook);
  });
  return parsed_results;
}

export default function GoogleBooksTable(props) {
  return (
    <MaterialTable
      title="Google books"
      columns={[
        { title: "Title", field: "title" },
        { title: "Author", field: "author" },
        { title: "ISBN", field: "isbn_number", type: "numeric" },
        { title: "Page count", field: "page_count", type: "numeric" },
        { title: "Published", field: "pub_date" },
        { title: "Language", field: "language" },
      ]}
      data={(query) =>
        new Promise((resolve, reject) => {
          let url = "";
          if (query.search.length != 0) {
            url = "https://www.googleapis.com/books/v1/volumes?";
            url += "q=" + query.search;
          } else {
            url = "https://www.googleapis.com/books/v1/volumes?q=Hobbit";
          }

          fetch(url)
            .then((response) => response.json())
            .then((result) => {
              let parsed_results = parseResult(result);
              resolve({
                data: parsed_results,
                page: 10,
                totalCount: result.totalItems,
              });
            });
        })
      }
      actions={[
        {
          icon: "save",
          tooltip: "Add Book",
          onClick: (event, rowData) => {
            props.onImportBook(rowData);
          },
        },
      ]}
    />
  );
}
