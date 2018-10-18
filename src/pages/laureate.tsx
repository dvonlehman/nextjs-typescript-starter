import repository from "lib/repository";
import Head from "next/head";
import { DefaultQuery, withRouter, WithRouterProps } from "next/router";
import * as React from "react";
import { ILaureate } from "../lib/interfaces";
// import { Link } from "../lib/routes";

interface LaureatePageQuery extends DefaultQuery {
  readonly id: string;
}

interface LaureatePageProps extends WithRouterProps<LaureatePageQuery> {
  readonly year: string;
  readonly laureate: ILaureate;
}

class LaureatePage extends React.Component<LaureatePageProps> {
  static async getInitialProps(context) {
    return {
      laureate: await repository.getLaureateById(context.query.id)
    };
  }

  constructor(props: LaureatePageProps) {
    super(props);
  }

  render() {
    const { laureate } = this.props;
    return (
      <div className="main">
        <Head>
          <title key="title">
            Laureate - {laureate.firstname} {laureate.surname}
          </title>
        </Head>
        <h2>
          {laureate.firstname} {laureate.surname}
        </h2>
      </div>
    );
  }
}

export default withRouter(LaureatePage);
