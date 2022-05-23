import React, { Component } from "react";
import { Container } from "reactstrap";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField, Button, Stack, Box } from "@mui/material";
import StarRatings from "react-star-ratings";
import { styled } from "@mui/material/styles";

const ProductImgStyle = styled("img")({
  top: 0,
  width: "70px",
  height: "70px",
  objectFit: "cover",
  position: "absolute",
});
class App extends Component {
  state = {
    items: [],
    page: 0,
    rowsPerPage: 20,
    totalRows: 0,
    getGender: "",
    getNames: "",
    getSearch: "",
  };

  getItems() {
    let url = `https://www.googleapis.com/books/v1/volumes?q=%7Bkeyword`;

    console.log("DATA NI" + url);
    fetch(url)
      .then((res) => res.json())
      .then((items) => {
        console.log(items.items, "items");
        this.setState({
          items: items.items,
        });
      })
      .catch((err) => console.log(err));
  }
  resetFilter = () => {
    // this.state.getGender = "";
    this.setState({ getSearch: "" });
  };

  componentDidMount() {
    this.getItems();
  }
  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    // this.setState({ rowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };

  handleChangePage = (event, newPage) => {
    console.log(newPage, "newPage");
    this.setState({ page: newPage });
  };

  render() {
    return (
      <>
        <Stack direction="row">
          <div>
            {this.state.getNames}
            {/* <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              size="small"
              // value={this.state.getSearch}
              sx={{ mr: 2 }}
              onChange={(event, newValue) => {
                this.setState({ getSearch: event.target.value });
                // this.getItemsNames();
              }}
            /> */}
          </div>
        </Stack>
        <div>
          <Container className="App">
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Title Book</TableCell>
                    <TableCell align="center">Author</TableCell>
                    <TableCell align="center">Thumbnail</TableCell>
                    <TableCell align="center">Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.items
                    .filter((item) => {
                      return (
                        item.volumeInfo.title
                          .toLowerCase()
                          .includes(this.state.getSearch.toLowerCase()) ||
                        item.volumeInfo.authors
                          .toLowerCase()
                          .includes(this.state.getSearch.toLowerCase())
                      );
                    })

                    .map((column, index) => {
                      return (
                        <>
                          {column !== "" ? (
                            <TableRow key={column.id}>
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  height: "50px",
                                  width: "150px",
                                  alignItems: "center",
                                  justifyItems: "center",
                                  textAlign: "center",
                                }}
                              >
                                {column.volumeInfo.title}
                              </TableCell>
                              <TableCell
                                key={column.id}
                                style={{
                                  height: "50px",
                                  width: "150px",
                                  alignItems: "center",
                                  justifyItems: "center",
                                  textAlign: "center",
                                }}
                              >
                                {column.volumeInfo.authors}
                              </TableCell>
                              <TableCell
                                key={column.id}
                                style={{
                                  height: "50px",
                                  width: "150px",
                                  alignItems: "center",
                                  justifyItems: "center",
                                  textAlign: "center",
                                }}
                              >
                                <Box
                                  sx={{
                                    alignItems: "center",
                                    justifyItems: "center",
                                    textAlign: "center",
                                    pt: "30%",
                                    position: "relative",
                                  }}
                                >
                                  <ProductImgStyle
                                    // alt={data.channel_name}
                                    src={
                                      column.volumeInfo.imageLinks
                                        .smallThumbnail
                                    }
                                  />
                                </Box>
                              </TableCell>
                              <TableCell
                                key={column.id}
                                style={{
                                  height: "50px",
                                  width: "150px",
                                  alignItems: "center",
                                  justifyItems: "center",
                                  textAlign: "center",
                                }}
                              >
                                <StarRatings
                                  rating={column.volumeInfo.averageRating}
                                  starRatedColor="gold"
                                  starDimension="20px"
                                  starSpacing="5px"
                                />
                              </TableCell>
                            </TableRow>
                          ) : (
                            <div>{column.error}</div>
                          )}
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </div>
      </>
    );
  }
}

class Animal {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  detail = () => {
    return this.name + " " + this.color;
  };
}

const animal = new Animal("Dog", "Black");
console.log(animal.detail());

// closure function
function outerFunction(param) {
  var variableInOuterFunction = 10;

  return function innerFunction() {
    console.log(variableInOuterFunction);
    console.log(param);
  };
}

console.log(outerFunction("Hello")());

// module pattern
var myModule = (function () {
  return {
    publicMethod: function () {
      console.log("public method");
    },
  };
})();

console.log(myModule.publicMethod());
export default App;
