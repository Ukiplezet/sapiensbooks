import axios from "axios";
const BASE_URL = "http://localhost:5500";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // Gets all books
  getBooks: function () {
    return axios.get(`${BASE_URL}/api/books`);
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get(`${BASE_URL}/api/books/` + id);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete(`${BASE_URL}/api/books/` + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post(`${BASE_URL}/api/books`, bookData);
  },
};
