import * as fs from "fs-extra";
import * as path from "path";
import log from "server/logger";
import { ILaureate, IPrize, IRepository } from "../lib/interfaces";

// // Simulating a remote API using some static JSON data.
// // http://api.nobelprize.org/v1/prize.json
// // http://api.nobelprize.org/v1/laureate.json

export interface Lookups {
  prizesByYear: { [year: string]: IPrize[] };
  laureatesById: { [key: string]: ILaureate };
}

// This is tricky. There appears to be two instances of the repository module, one in the main
// node process and one in the server webpack bundle.
const globalMemory = process as any;
let data: Lookups = globalMemory.__DATA__ as Lookups;
if (!data) {
  data = globalMemory.__DATA__ = loadDataSync();
}

async function getLaureateById(id: string): Promise<ILaureate> {
  log.debug(`Fetching laureate ${id}`);
  return new Promise<ILaureate>(resolve => {
    resolve(data.laureatesById[id]);
  });
}

async function getPrizesByYear(year: string): Promise<IPrize[]> {
  return new Promise<IPrize[]>(resolve => {
    resolve(data.prizesByYear[year] || []);
  });
}

async function getYears(): Promise<string[]> {
  log.debug("Fetch prize years from database");

  const years = Object.keys(data.prizesByYear);
  years.sort();
  return Promise.resolve(years);
}

const repository: IRepository = {
  getLaureateById,
  getPrizesByYear,
  getYears
};

export default repository;

function loadDataSync(): Lookups {
  const lookups = {
    prizesByYear: {},
    laureatesById: {}
  };

  log.debug("Loading JSON data into mock in-memory database");
  const laureateData = fs.readJsonSync(
    path.join(__dirname, "../../data/laureate.json")
  );
  const prizeData = fs.readJsonSync(
    path.join(__dirname, "../../data/prize.json")
  );

  laureateData.laureates.forEach((item: any) => {
    const laureate = item as ILaureate;
    lookups.laureatesById[laureate.id] = laureate;
  });

  prizeData.prizes.forEach((item: any) => {
    const prize = item as IPrize;
    if (lookups.prizesByYear[item.year]) {
      lookups.prizesByYear[item.year].push(prize);
    } else {
      lookups.prizesByYear[item.year] = [prize];
    }
  });

  return lookups;
}
