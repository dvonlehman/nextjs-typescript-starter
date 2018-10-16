import { IApi, ICompactStory, IFullStory } from "./interfaces";
import log from "./logger";

// This is the client IApi implementation. The webpack config substitutes
// this module with server/api.ts for the server bundle build.

const api: IApi = {
  getStoryById,
  getStoryByShortId,
  getFeaturedStories
};

async function getStoryById(storyId: string): Promise<IFullStory> {
  const resp = await fetch(`/api/stories/${storyId}`);
  if (!resp.ok) {
    throw new Error(`API returned status ${resp.status}: ${resp.statusText}`);
  }

  const story = await resp.json();
  return story;
}

// https://api.steller.co/v1/stories?short_id=6rSKfzvTJf2
async function getStoryByShortId(shortId: string): Promise<IFullStory> {
  log.debug("Fetch story", shortId);
  const url = `/api/stories?short_id=${shortId}`;
  const resp = await window.fetch(`/api/stories?short_id=${shortId}`);
  if (!resp.ok) {
    throw new Error(`API returned status ${resp.status} for ${url}`);
  }

  const story = await resp.json();
  return story;
}

async function getFeaturedStories(): Promise<ICompactStory[]> {
  const url = "/api/stories/featured";
  const resp = await window.fetch(url);
  if (!resp.ok) {
    throw new Error(`API returned status ${resp.status} for ${url}`);
  }
  const stories = await resp.json();
  return stories;
}

export default api;
