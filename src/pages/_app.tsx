import { rehydrate } from "glamor";
import glamorous from "glamorous";
import App, { Container, DefaultAppIProps, NextAppContext } from "next/app";
import * as React from "react";

// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
// See https://github.com/zeit/next.js/blob/master/examples/with-glamorous/pages/_app.js
if (typeof window !== "undefined") {
  rehydrate((window as any).__NEXT_DATA__.ids);
}

const Header = glamorous.nav({
  backgroundColor: "#000",
  height: "40px",
  padding: "0 20px",
  "& .logo": {
    color: "#fff",
    lineHeight: "40px"
  }
});

export default class CustomApp extends App {
  static async getInitialProps(
    context: NextAppContext
  ): Promise<DefaultAppIProps> {
    let pageProps: any;

    if (context.Component.getInitialProps) {
      pageProps = await context.Component.getInitialProps(context.ctx);
    } else {
      pageProps = {};
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Header>
          <span className="logo">Next.js + TypeScript - Nobel Prize Demo</span>
        </Header>
        <Component {...pageProps} />
      </Container>
    );
  }
}
