import MaterialTable from "material-table";
import React from "react";

function parseResult(result) {
  let parsed_results = [];
  result.items.forEach((element) => {
    const newBook = {
      id: element.id,
      title: element.volumeInfo.title,
      page_count: element.volumeInfo.pageCount,
      pub_date: element.volumeInfo.publishedDate,
      language: element.volumeInfo.language,
    };
    if (element.volumeInfo.authors != undefined) {
      newBook["author"] = element.volumeInfo.authors.join(", ");
    }
    const dash_index = element.volumeInfo.publishedDate.indexOf("-");
    if (dash_index != -1) {
      newBook["pub_date"] = element.volumeInfo.publishedDate.slice(
        0,
        dash_index
      );
    } else {
      newBook["pub_date"] = element.volumeInfo.publishedDate;
    }

    const industryIdentifiers = element.volumeInfo.industryIdentifiers;
    if (industryIdentifiers != undefined) {
      industryIdentifiers.forEach((e) => {
        if (e["type"] == "ISBN_10" || e["type"] == "ISBN_13") {
          newBook["isbn_number"] = e["identifier"];
        }
      });
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
