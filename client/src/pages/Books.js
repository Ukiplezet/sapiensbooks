import React, { useEffect, useState } from "react";
import DeleteBtn from "../components/DeleteBtn";
import { v4 as uuidv4 } from "uuid";
import API from "../utils/API";
import booksArray from "../data";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Form } from "react-bootstrap";
import { Input, FormBtn } from "../components/Form";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [catalogNumber, setCatalogNumber] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");

  useEffect(() => {
    getStateFromLocalStorage();
    // setBooks(booksArray);
  }, []);

  const deleteBook = (id) => {
    API.deleteBook(id)
      .then((res) => this.loadBooks())
      .catch((err) => console.log(err));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      const newBook = {
        item_id: uuidv4(),
        title: title,
        authorName: author,
        catalogNumber: catalogNumber,
        publicationDate: publicationDate,
        coverPhoto: coverPhoto,
      };
      console.log(newBook);
      setTitle("");
      setAuthor("");
      setPublicationDate("");
      setCatalogNumber("");
      setCoverPhoto("");
      booksArray.push(newBook);
      saveStateToLocalStorage(booksArray);
      return setBooks(booksArray);
    }
  };

  const saveStateToLocalStorage = (newBook) => {
    localStorage.setItem("state", JSON.stringify(newBook));
  };

  // Fetch data from local storage
  const getStateFromLocalStorage = () => {
    const data = localStorage.getItem("state");
    const response = JSON.parse(data);
    console.log(response);
    return setBooks(response);
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-6 sm-12">
          <h1>List of Books</h1>
          {books.length ? (
            <List>
              {books.map((book) => (
                <ListItem key={book.item_id}>
                  <Link to={"/books/" + book.item_id}>
                    <strong>
                      {book.title} by {book.author}
                    </strong>
                  </Link>
                  <DeleteBtn onClick={() => deleteBook(book.item_id)} />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
        <Col size="md-6">
          <h1>Add New Book</h1>
          <Form onSubmit={handleFormSubmit}>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              placeholder="Title (required)"
            />
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              name="author"
              placeholder="Author (required)"
            />
            <Input
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
              name="publicationDate"
              placeholder="Publication Date (Optional)"
            />
            <Input
              value={catalogNumber}
              onChange={(e) => setCatalogNumber(e.target.value)}
              name="catalogNumber"
              placeholder="Catalog Number (Optional)"
            />
            <Input
              value={coverPhoto}
              onChange={(e) => setCoverPhoto(e.target.value)}
              name="coverPhoto"
              placeholder="Cover Photo URL (Optional)"
            />
            <FormBtn disabled={!(author && title)} onClick={handleFormSubmit}>
              Submit Book
            </FormBtn>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
// class Books extends Component {
//   state = {
//     books: [],
//     title: "",
//     author: "",
//     publicationDate: "",
//     catalogNumber: "",
//     coverPhoto: "",
//   };

//   componentDidMount() {
//     this.loadBooks();
//   }

//   loadBooks = () => {
//     API.getBooks()
//       .then((res) =>
//         this.setState({
//           books: res.data,
//           title: "",
//           author: "",
//           catalogNumber: "",
//           coverPhoto: "",
//           publicationDate: "",
//         })
//       )
//       .catch((err) => console.log(err));
//   };

//   deleteBook = (id) => {
//     API.deleteBook(id)
//       .then((res) => this.loadBooks())
//       .catch((err) => console.log(err));
//   };

//   handleInputChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleFormSubmit = (event) => {
//     event.preventDefault();
//     if (this.state.title && this.state.author) {
//       API.saveBook({
//         title: this.state.title,
//         author: this.state.author,
//         catalogNumber: this.state.catalogNumber,
//         publicationDate: this.state.publicationDate,
//         coverPhoto: this.state.coverPhoto,
//       })
//         .then((res) => this.loadBooks())
//         .catch((err) => console.log(err));
//     }
//   };

//   render() {
//     return (
//       <Container fluid>
//         <Row>
//           {/* <Col size="md-3">{this.state.books}</Col> */}
//           <Col size="md-3">
//             {/* <Jumbotron> */}
//             <h1>What Books Should I Read?</h1>
//             {/* </Jumbotron> */}
//             <form>
//               <Input
//                 value={this.state.title}
//                 onChange={this.handleInputChange}
//                 name="title"
//                 placeholder="Title (required)"
//               />
//               <Input
//                 value={this.state.author}
//                 onChange={this.handleInputChange}
//                 name="author"
//                 placeholder="Author (required)"
//               />
//               <Input
//                 value={this.state.publicationDate}
//                 onChange={this.handleInputChange}
//                 name="publicationDate"
//                 placeholder="Publication Date (Optional)"
//               />
//               <Input
//                 value={this.state.catalogNumber}
//                 onChange={this.handleInputChange}
//                 name="catalogNumber"
//                 placeholder="Catalog Number (Optional)"
//               />
//               <Input
//                 value={this.state.coverPhoto}
//                 onChange={this.handleInputChange}
//                 name="coverPhoto"
//                 placeholder="Cover Photo URL (Optional)"
//               />
//               <FormBtn
//                 disabled={!(this.state.author && this.state.title)}
//                 onClick={this.handleFormSubmit}
//               >
//                 Submit Book
//               </FormBtn>
//             </form>
//           </Col>
//           <Col size="md-3 sm-12">
//             <Jumbotron>
//               <h1>Books On My List</h1>
//             </Jumbotron>
//             {this.state.books.length ? (
//               <List>
//                 {this.state.books.map((book) => (
//                   <ListItem key={book._id}>
//                     <Link to={"/books/" + book._id}>
//                       <strong>
//                         {book.title} by {book.author}
//                       </strong>
//                     </Link>
//                     <DeleteBtn onClick={() => this.deleteBook(book._id)} />
//                   </ListItem>
//                 ))}
//               </List>
//             ) : (
//               <h3>No Results to Display</h3>
//             )}
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }

export default Books;
