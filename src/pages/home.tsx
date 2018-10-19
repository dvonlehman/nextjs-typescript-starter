import repository from "lib/repository";
import { Link } from "lib/routes";
import Head from "next/head";
import * as React from "react";

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
      <div>
        <Head>
          <title key="title">Nobel Prize Demo - Next.js + TypeScript</title>
        </Head>
        <h2>Prize Years</h2>
        <p>Click a year to find out who won the Nobel prize.</p>
        {this.props.years && (
          <ul>
            {this.props.years.map(year => (
              <li key={year}>
                <Link route="prizes" year={year}>
                  <a>{year}</a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default HomePage;
