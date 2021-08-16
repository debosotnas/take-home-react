import "normalize.css";
import * as React from "react";
import "../styles/main.sass";
import { Helmet } from "react-helmet";
import { Form } from "../components/index.js";
import { TITLES } from "../strings.js";

const IndexPage = () => {
  return (
    <div className="container">
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className="header">
        <div>
          <h1>{TITLES.SignUp}</h1>
        </div>
      </div>
      <Form />
    </div>
  );
};

export default IndexPage;
