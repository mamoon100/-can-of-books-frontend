import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";
import axios from "axios";
import { Carousel, Container, Spinner } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";

class MyFavoriteBooks extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      loading: true,
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
      .catch((err) => console.error(err));
  }
  render() {
    console.log(this.state.books);
    return (
      <Jumbotron>
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

/*{this.state.books.map((item,index)=> {
          return (
            <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=First slide&bg=373940"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
          )
        })}
        </>} */
