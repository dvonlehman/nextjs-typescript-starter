// For some reason vscode displays warning when importing this module
const camelCaseKeys = require("camelcase-keys"); // tslint:disable-line

import * as config from "config";
import * as httpError from "http-errors";
import fetch from "node-fetch";
import { IApi, IGroupLayer, IStory, IStoryLayer } from "../lib/interfaces";
import log from "./logger";

const API_URL = config.get("serverRuntimeConfig.printApiUrl");

function sortByLayerId(layer1: IStoryLayer, layer2: IStoryLayer) {
  return layer1.id - layer2.id;
}

// Transform the JSON object that came back in the print-player api response
// into an IStory interface
function transformStory(rawJson: object): IStory {
  const story = camelCaseKeys(rawJson) as IStory;

  // Sort the layers by id
  for (const page of story.pages) {
    page.layers.sort(sortByLayerId);

    for (const layer of page.layers) {
      if (layer.type === "group") {
        (layer as IGroupLayer).layers.sort(sortByLayerId);
      }
    }
  }

  return story;
}

async function getStoryById(storyId: string): Promise<IStory> {
  const url = `${API_URL}/stories/${storyId}`;
  log.debug("Fetching", url);

  const resp = await fetch(url);
  if (!resp.ok) {
    throw httpError(500, `Received status ${resp.status} from print-api`);
  }

  const json = (await resp.json()) as IApiResponseWrapper;
  const story = transformStory(pluckStory(json));

  return story;
}

async function getStoryByShortId(shortId: string): Promise<IStory> {
  const url = `${API_URL}/stories?short_id=${shortId}`;
  log.debug("Fetching", url);

  const resp = await fetch(url);
  if (!resp.ok) {
    throw httpError(500, `Received status ${resp.status} from print-api`);
  }

  const json = (await resp.json()) as IApiResponseWrapper;
  const story = transformStory(pluckStory(json));

  return story;
}

function pluckStory(entity: IApiResponseWrapper) {
  if (!hasData(entity)) {
    throw httpError(404, "story could not be found");
  }

  return entity.data[0];
}

// TODO (mirande): see api/users.js & api/collection.js - pull-up to main client?
// break off api/utils.js ?
function hasData(entity: IApiResponseWrapper, field?: string): boolean {
  if (!entity || !entity.data || !entity.data.length) {
    return false;
  }
  return !!(field ? entity.data[0][field] : entity.data[0]);
}

interface IApiResponseWrapper {
  data: ReadonlyArray<Record<string, any>>;
}

const api: IApi = {
  getStoryById,
  getStoryByShortId
};

export default api;
