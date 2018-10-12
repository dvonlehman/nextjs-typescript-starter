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

class MyDocument extends Document {
  static getInitialProps(context: NextDocumentContext): DefaultDocumentIProps {
    const page: RenderPageResponse = context.renderPage();
    const styles = renderStatic(() => page.html || (page as any).errorHtml);
    return { ...page, ...styles };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = (this.props as any).ids;
    }
  }

  render() {
    return (
      <html>
        <Head>
          <title>With Glamorous</title>
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

export default MyDocument;
