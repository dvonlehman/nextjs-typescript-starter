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
import { DeviceFamily } from "../lib/interfaces";

interface DocumentProps {
  deviceFamily: DeviceFamily;
}

class StellerDocument extends Document<DocumentProps> {
  static getInitialProps(context: NextDocumentContext): DefaultDocumentIProps {
    const page: RenderPageResponse = context.renderPage();
    const styles = renderStatic(() => page.html || (page as any).errorHtml);

    let deviceFamily: DeviceFamily;
    if (context.req) {
      deviceFamily =
        (context.req.headers["device-family"] as DeviceFamily) ||
        DeviceFamily.desktop;
    }

    return { ...page, ...styles, deviceFamily };
  }

  constructor(props: any) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = props.ids;
    }
  }

  render() {
    return (
      <html>
        <Head>
          <style
            dangerouslySetInnerHTML={{ __html: (this.props as any).css }}
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          <meta
            id="deviceFamily"
            name="device-family"
            content={this.props.deviceFamily}
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

export default StellerDocument;
