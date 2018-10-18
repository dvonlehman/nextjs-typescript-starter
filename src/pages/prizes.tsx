import log from "lib/logger";
import repository from "lib/repository";
import Head from "next/head";
import { DefaultQuery, withRouter, WithRouterProps } from "next/router";
import * as React from "react";
import { IPrize } from "../lib/interfaces";
// import { Link } from "../lib/routes";

interface PrizesPageQuery extends DefaultQuery {
  readonly year: string;
}

interface PrizesPageProps extends WithRouterProps<PrizesPageQuery> {
  readonly year: string;
  readonly prizes: IPrize[];
}

class PrizesPage extends React.Component<PrizesPageProps> {
  static async getInitialProps(context) {
    try {
      return {
        year: context.query.year,
        prizes: await repository.getPrizesByYear(context.query.year)
      };
    } catch (err) {
      log.error("Error with getInitialProps", { error: err.message });
    }
  }

  constructor(props: PrizesPageProps) {
    super(props);
  }

  render() {
    const { prizes, year } = this.props;
    return (
      <div>
        <Head>
          <title key="title">Nobel Prizes for {year}</title>
        </Head>
        <h2>Prizes awarded in {year}</h2>
        <span>{prizes.length}</span>
      </div>
    );
  }
}

export default withRouter(PrizesPage);
