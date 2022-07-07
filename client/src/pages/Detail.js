import React, { useEffect, useState } from "react";
import booksArray from "../data";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";

const Detail = () => {
  const [book, setBook] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    detailPage(id);
  }, []);

  const detailPage = (id) => {
    const response = booksArray.filter((item) => item.item_id == id);
    return setBook(response[0]);
  };

  return (
    <Container fluid className="align-items-center justify-content-center">
      <Row className="d-flex flex-row">
        <Col size="md-12">
          <h1>
            <h2>
              <i> {book.title}</i>
            </h2>
            by <strong>{book.authorName}</strong>
          </h1>
        </Col>
        <div
          size="md-6"
          className="d-flex flex-row align-items-center justify-content-center"
        >
          <Col size="md-6">
            <img
              src={book.coverPhoto}
              alt={`There's no pic, it was supposd to be here${book?.coverPhoto}`}
              className={
                book?.coverPhoto ? "" : "border border-1 border-danger m-2 p-2"
              }
            />
          </Col>
          <Row>
            <article>
              <h3>Publication Date:</h3>
              <p>{book.catalogNumber}</p>
              <h3>Publication Date:</h3>
              <p>{book.publicationDate}</p>
            </article>
          </Row>
        </div>
      </Row>
      <Row className="d-flex flex-row"></Row>
      <Row>
        <Col size="md-2">
          <Link to="/">← Back to Authors</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
