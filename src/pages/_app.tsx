import App, { Container } from "next/app";
import * as React from "react";

export default class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <div>Custom header here!!</div>
        <Component {...pageProps} />
      </Container>
    );
  }
}
