import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";
import axios from "axios";
import { Carousel, Container, Spinner, Button } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import BookFormModal from "./BookFormModal";

class MyFavoriteBooks extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      loading: true,
      show: false,
      update: false,
      id: 0,
      chosen: 0,
    };
  }
  componentDidMount() {
    this.setState({
      loading: true,
    });
    this.props.auth0
      .getIdTokenClaims()
      .then((result) => {
        const jwt = result.__raw;
        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
          method: "get",
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: "/book",
        };
        console.log(config.headers);
        // @ts-ignore
        axios(config)
          .then((axiosResults) => {
            this.setState({
              books: axiosResults.data,
              loading: true,
            });
          })
          .catch((err) => console.error(err))
          .then(() => {
            this.setState({
              loading: false,
            });
          });
      })
      .catch((err) => console.error(err))
      .then(() => {
        this.setState({
          loading: false,
        });
      });
  }

  handleAddition = (e) => {
    e.preventDefault();
    let bookData = {
      email: e.target.email.value || this.props.auth0.user.email,
      title: e.target.title.value,
      status: e.target.status.value,
      desc: e.target.desc.value,
    };
    this.props.auth0
      .getIdTokenClaims()
      .then((result) => {
        const jwt = result.__raw;
        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
          method: "post",
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: "/book",
          data: bookData,
        };

        // @ts-ignore
        axios(config)
          .then((axiosResults) => {
            this.setState({
              books: axiosResults.data,
              loading: true,
            });
            e.target.reset();
          })
          .catch((err) => console.error(err))
          .then(() => {
            this.setState({
              loading: false,
            });
          });
      })
      .catch((err) => console.error(err))
      .then(() => {
        this.setState({
          loading: false,
        });
      });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleDelete = (e) => {
    this.props.auth0
      .getIdTokenClaims()
      .then((result) => {
        const jwt = result.__raw;
        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
          method: "delete",
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/book/${e.target.id}`,
        };

        // @ts-ignore
        axios(config)
          .then((axiosResults) => {
            this.setState({
              books: axiosResults.data,
              loading: true,
            });
          })
          .catch((err) => console.error(err))
          .then(() => {
            this.setState({
              loading: false,
            });
          });
      })
      .catch((err) => console.error(err))
      .then(() => {
        this.setState({
          loading: false,
        });
      });
  };

  handleUpdate = (e) => {
    e.preventDefault();

    let bookData = {
      email: e.target.email.value || this.props.auth0.user.email,
      title: e.target.title.value,
      status: e.target.status.value,
      desc: e.target.desc.value,
    };
    this.props.auth0
      .getIdTokenClaims()
      .then((result) => {
        const jwt = result.__raw;
        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
          method: "put",
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/book/${this.state.id}`,
          data: bookData,
        };

        // @ts-ignore
        axios(config)
          .then((axiosResults) => {
            this.setState({
              books: axiosResults.data,
              loading: true,
            });
          })
          .catch((err) => console.error(err))
          .then(() => {
            this.setState({
              loading: false,
            });
          });
      })
      .catch((err) => console.error(err))
      .then(() => {
        this.setState({
          loading: false,
        });
      });
  };
  render() {
    // console.log(this.state.books);
    return (
      <Jumbotron>
        <Button
          variant="primary"
          onClick={() => {
            this.setState({
              show: true,
              update: false,
            });
          }}
        >
          Add Your Book
        </Button>
        <BookFormModal
          show={this.state.show}
          handleClose={this.handleClose}
          handleAddition={this.handleAddition}
          handleUpdate={this.handleUpdate}
          update={this.state.update}
          chosen={this.state.chosen}
        />
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>

        {this.state.books.length > 0 && (
          <Container className="h-20">
            {this.state.loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden"></span>
              </Spinner>
            ) : (
              <Carousel>
                {this.state.books.map((item, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/500"
                        alt="First slide"
                      />
                      <Carousel.Caption>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                        <Button
                          variant="danger"
                          onClick={this.handleDelete}
                          id={item._id}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="primary"
                          onClick={(e) => {
                            // console.log(e.target.id);
                            this.setState({
                              update: true,
                              show: true,
                              id: item._id,
                              chosen: this.state.books.filter(
                                (item) => item._id === e.target.id
                              ),
                            });
                          }}
                          id={item._id}
                        >
                          Update
                        </Button>
                      </Carousel.Caption>
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            )}
          </Container>
        )}
      </Jumbotron>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
