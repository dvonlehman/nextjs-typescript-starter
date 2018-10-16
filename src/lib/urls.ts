import { UrlLike } from "next/router";
import { DeviceFamily } from "./interfaces";

// The actual path to the page should be prefixed with the device family.
// Each device family has it's own version of each page, i.e.
// phone/story.tsx, desktop/home.tsx, etc.
export function getDevicePagePath(
  page: string | UrlLike,
  deviceFamily: DeviceFamily
): string {
  // Ensure the page has a leading slash
  if (page[0] !== "/") {
    page = `/${page}`;
  }

  return `/${deviceFamily}${page}`;
}
