import repository from "lib/repository";
import { Link } from "lib/routes";
import Head from "next/head";
import { DefaultQuery, withRouter, WithRouterProps } from "next/router";
import * as React from "react";
import { ILaureate } from "../lib/interfaces";

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
        <ul>
          {!laureate.born.startsWith("0000") && (
            <li>
              <label>Born:</label> {laureate.born} - {laureate.bornCity},{" "}
              {laureate.bornCountry}
            </li>
          )}
          {!laureate.died.startsWith("0000") && (
            <li>
              <label>Died:</label> {laureate.died} - {laureate.diedCity},{" "}
              {laureate.diedCountry}
            </li>
          )}
        </ul>
        <h4>Prizes</h4>
        <ul>
          {laureate.prizes.map((prize, index) => (
            <li key={`prize-${index}`}>
              <Link route="prizes" year={prize.year}>
                <a>{prize.year}</a>
              </Link>{" "}
              <strong>{prize.category}</strong> -{" "}
              <span>{prize.motivation}</span>
            </li>
          ))}
        </ul>
        <div />
      </div>
    );
  }
}

export default withRouter(LaureatePage);
