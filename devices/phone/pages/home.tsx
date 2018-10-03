import React from "react";
// import Router from "next/router";

// import Modal from "../components/modal";

export default class extends React.Component {
  static getInitialProps() {
    return {};
  }

  constructor(props: any) {
    super(props);
  }

  // handling escape close
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="main">
        {"Home page"}
        <style jsx>{`
          .main {
            padding: 50px;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }
}
