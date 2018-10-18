import { renderStatic } from "glamor/server";

import Document, {
  DefaultDocumentIProps,
  Head,
  Main,
  NextDocumentContext,
  NextScript,
  RenderPageResponse
} from "next/document";
import * as React from "react";

class CustomDocument extends Document<DefaultDocumentIProps> {
  static getInitialProps(context: NextDocumentContext): DefaultDocumentIProps {
    const page: RenderPageResponse = context.renderPage();
    const styles = renderStatic(() => page.html || (page as any).errorHtml);

    return { ...page, ...styles };
  }

  constructor(props: any) {
    super(props);

    // This is for glamor server-side rendering.
    // See https://github.com/zeit/next.js/blob/master/examples/with-glamorous/pages/_document.js
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = props.ids;
    }
  }

  render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          <link rel="Shortcut Icon" href="/favicon.ico" />
          <style
            dangerouslySetInnerHTML={{ __html: (this.props as any).css }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default CustomDocument;
