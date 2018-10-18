export interface ILaureate {
  id: string;
  firstname?: string;
  surname?: string;
  born: string;
  died: string;
  bornCountry?: string;
  bornCountryCode?: string;
  bornCity?: string;
  diedCountry?: string;
  diedCountryCode?: string;
  diedCity?: string;
  gender: string;
  prizes: Array<{
    year: string;
    category: string;
    share: string;
    motivation: string;
    affiliations?: Array<{
      name: string;
      city?: string;
      country?: string;
    }>;
  }>;
}

export interface ILaureateIPrize extends IPrize {
  laureateId: string;
  motivation: string;
}

export interface IPrize {
  year: number;
  category: PrizeCategory;
  overallMotivation?: string;
  laureates: Array<{
    id: string;
    firstname: string;
    surname: string;
    motivation: string;
  }>;
}

export interface IAffiliation {
  affiliations: IAffiliation[];
}

export enum PrizeCategory {
  peace = "peace",
  physics = "physics",
  economics = "economics",
  medicine = "medicine",
  literature = "literature",
  chemistry = "chemistry"
}

export interface IDatabase {
  prizesByYear: { [year: string]: IPrize[] };
  laureatesById: { [key: string]: ILaureate };
}

export interface IRepository {
  getPrizesByYear: (year: string) => Promise<IPrize[]>;
  getLaureateById: (id: string) => Promise<ILaureate>;
  getYears: () => Promise<string[]>;
}

type LoggerMethod = (message: string, meta?: any) => void;

export interface ILogger {
  error: LoggerMethod;
  warn: LoggerMethod;
  info: LoggerMethod;
  debug: LoggerMethod;
}
