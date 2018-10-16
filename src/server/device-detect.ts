import { NextFunction, Request } from "express";
import { DeviceFamily } from "../lib/interfaces";

export default function(req: Request, {}, next: NextFunction) {
  req.headers["device-family"] = deviceFamilyFromUserAgent(
    req.get("user-agent")
  );
  next();
}

// Rough device family detection based on the user-agent header. We don't care about
// specific device manufacture or browser type, we just need to know the high level
// device family: phone, table, or desktop.
function deviceFamilyFromUserAgent(userAgent: string): DeviceFamily {
  if (/iPhone/.test(userAgent)) {
    return DeviceFamily.phone;
  }

  if (/Android/.test(userAgent)) {
    return /Mobile/.test(userAgent) ? DeviceFamily.phone : DeviceFamily.tablet;
  }

  if (/iPad/.test(userAgent)) {
    return DeviceFamily.tablet;
  }

  if (/Mobile/i.test(userAgent)) {
    return DeviceFamily.phone;
  }

  return DeviceFamily.desktop;
}
