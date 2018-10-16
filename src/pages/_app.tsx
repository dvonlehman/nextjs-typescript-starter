import App, { Container, DefaultAppIProps, NextAppContext } from "next/app";
import * as React from "react";

export default class StellerApp extends App {
  static async getInitialProps(
    context: NextAppContext
  ): Promise<DefaultAppIProps> {
    let pageProps: DefaultAppIProps;

    if (context.Component.getInitialProps) {
      pageProps = await context.Component.getInitialProps(context.ctx);
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
