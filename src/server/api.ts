// For some reason vscode displays warning when importing this module
const camelCaseKeys = require("camelcase-keys"); // tslint:disable-line

import * as config from "config";
import * as httpError from "http-errors";
import {
  IApi,
  ICompactStory,
  IFullStory,
  IGroupLayer,
  IStoryLayer
} from "lib/interfaces";
import fetch from "node-fetch";
import log from "./logger";

const API_URL = config.get("serverRuntimeConfig.printApiUrl");

function sortByLayerId(layer1: IStoryLayer, layer2: IStoryLayer) {
  return layer1.id - layer2.id;
}

// Transform the JSON object that came back in the print-player api response
// into an IStory interface
function transformFullStory(rawJson: object): IFullStory {
  const story = camelCaseKeys(rawJson) as IFullStory;

  // Sort the layers by id
  if (Array.isArray(story.pages)) {
    for (const page of story.pages) {
      page.layers.sort(sortByLayerId);

      for (const layer of page.layers) {
        if (layer.type === "group") {
          (layer as IGroupLayer).layers.sort(sortByLayerId);
        }
      }
    }
  }

  return story;
}

function transformCompactStory(rawJson: object): ICompactStory {
  return camelCaseKeys(rawJson) as ICompactStory;
}

async function getStoryById(storyId: string): Promise<IFullStory> {
  const url = `${API_URL}/stories/${storyId}`;
  log.debug("Fetching", { url });

  const resp = await fetch(url);
  if (!resp.ok) {
    throw httpError(500, `Received status ${resp.status} from print-api`);
  }

  const json = (await resp.json()) as IApiResponseWrapper;
  const story = transformFullStory(pluckStory(json));

  return story;
}

async function getStoryByShortId(shortId: string): Promise<IFullStory> {
  const url = `${API_URL}/stories?short_id=${shortId}`;
  log.debug("Fetching", { url });

  const resp = await fetch(url);
  if (!resp.ok) {
    throw httpError(500, `Received status ${resp.status} from print-api`);
  }

  const json = (await resp.json()) as IApiResponseWrapper;
  const story = transformFullStory(pluckStory(json));

  return story;
}

async function getFeaturedStories(): Promise<ICompactStory[]> {
  const url = `${API_URL}/stories/featured`;
  log.debug("Fetching", { url });

  const resp = await fetch(url);
  if (!resp.ok) {
    throw httpError(500, `Received status ${resp.status} from print-api`);
  }

  const json = (await resp.json()) as IApiResponseWrapper;
  const stories = json.data.map(transformCompactStory);

  return stories;
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
  getStoryByShortId,
  getFeaturedStories
};

export default api;
