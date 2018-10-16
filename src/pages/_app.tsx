import App, { Container, DefaultAppIProps, NextAppContext } from "next/app";
import { rehydrate } from "glamor";

import * as React from "react";

// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  rehydrate((window as any).__NEXT_DATA__.ids);
}

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
