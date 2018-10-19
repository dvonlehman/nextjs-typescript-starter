import { ILaureate, IPrize, IRepository } from "lib/interfaces";
import log from "lib/logger";

// This is the client IRepository implementation which makes a fetch
// call back to the express api router. The webpack config substitutes
// this module with server/repository.ts for the server bundle build.

const repository: IRepository = {
  getLaureateById,
  getPrizesByYear,
  getYears
};

async function getLaureateById(id: string): Promise<ILaureate> {
  const url = `/api/laureate/${id}`;
  log.debug("Fetching laureate by id", { id });
  const resp = await window.fetch(url);
  if (!resp.ok) {
    throw new Error(`API returned status ${resp.status}: ${resp.statusText}`);
  }

  return await resp.json();
}

async function getPrizesByYear(year: string): Promise<IPrize[]> {
  const url = `/api/prizes/${year}`;
  log.debug("Fetching prizes by year", { url });
  const resp = await window.fetch(url);
  if (!resp.ok) {
    throw new Error(`API returned status ${resp.status}: ${resp.statusText}`);
  }

  return await resp.json();
}

async function getYears(): Promise<string[]> {
  log.debug("Fetch prize years from api");
  const resp = await window.fetch("/api/years");
  if (!resp.ok) {
    throw new Error(`API returned status ${resp.status}: ${resp.statusText}`);
  }

  return await resp.json();
}

export default repository;
