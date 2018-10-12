import { IApi, IStory } from "./interfaces";

// This is the client IApi implementation. The webpack config substitutes
// this module with server/api.ts for the server bundle build.

const api: IApi = {
  getStoryById,
  getStoryByShortId
};

async function getStoryById(storyId: string): Promise<IStory> {
  const resp = await fetch(`/api/stories/${storyId}`);
  if (!resp.ok) {
    throw new Error(`API returned status ${resp.status}: ${resp.statusText}`);
  }

  const story = await resp.json();
  return story;
}

// https://api.steller.co/v1/stories?short_id=6rSKfzvTJf2
async function getStoryByShortId(shortId: string): Promise<IStory> {
  console.log("Fetch story", shortId);
  const url = `/api/stories?short_id=${shortId}`;
  const resp = await fetch(`/api/stories?short_id=${shortId}`);
  if (!resp.ok) {
    throw new Error(`API returned status ${resp.status} for ${url}`);
  }

  const story = await resp.json();
  return story;
}

export default api;
