import glamorous from "glamorous";
import repository from "lib/repository";
import Head from "next/head";
import Link from "next/link";
import * as React from "react";

const Main = glamorous.div({
  padding: 50
});

interface HomePageProps {
  years: string[];
}

class HomePage extends React.Component<HomePageProps> {
  static async getInitialProps() {
    return {
      years: await repository.getYears()
    };
  }

  constructor(props: HomePageProps) {
    super(props);
  }

  public render() {
    return (
      <Main>
        <Head>
          <title key="title">Nobel Prize Demo - Next.js + TypeScript</title>
        </Head>
        <h2>Prize Years</h2>
        <p>Click a year to find out who won the Nobel prize.</p>
        {this.props.years && (
          <ul>
            {this.props.years.map(year => (
              <li key={year}>
                <Link href={`/prizes?year=${year}`} as={`/prizes/${year}`}>
                  <span>{year}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Main>
    );
  }
}

export default HomePage;
