import glamorous from "glamorous";
import repository from "lib/repository";
import { Link } from "lib/routes";
import Head from "next/head";
import { DefaultQuery, withRouter, WithRouterProps } from "next/router";
import * as React from "react";
import { IPrize } from "../lib/interfaces";

interface PrizesPageQuery extends DefaultQuery {
  readonly year: string;
}

interface PrizesPageProps extends WithRouterProps<PrizesPageQuery> {
  readonly year: string;
  readonly prizes: IPrize[];
}

const PrizesContainer = glamorous.div({
  "& ul > li": {
    marginBottom: "20px"
  },
  "& ul > li:last-child": {
    marginBottom: "0"
  }
});

class PrizesPage extends React.Component<PrizesPageProps> {
  static async getInitialProps(context) {
    return {
      year: context.query.year,
      prizes: await repository.getPrizesByYear(context.query.year)
    };
  }

  constructor(props: PrizesPageProps) {
    super(props);
  }

  render() {
    const { prizes, year } = this.props;
    return (
      <PrizesContainer>
        <Head>
          <title key="title">Nobel Prizes for {year}</title>
        </Head>
        <h2>Prizes awarded in {year}</h2>
        {prizes.map((prize, index) => (
          <div key={`prize-${index}`}>
            <h4>{prize.category}</h4>
            <p>{prize.overallMotivation}</p>
            <ul>
              {prize.laureates.map(laureate => (
                <li key={laureate.id}>
                  <Link route="laureate" id={laureate.id}>
                    <a>
                      {laureate.firstname} {laureate.surname}
                    </a>
                  </Link>{" "}
                  - <span>{laureate.motivation}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </PrizesContainer>
    );
  }
}

export default withRouter(PrizesPage);
