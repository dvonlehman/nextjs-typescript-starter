import { DeviceFamily } from "lib/interfaces";
import { getDevicePagePath } from "lib/urls";
import { default as NextLink, LinkProps } from "next/link";
import * as React from "react";

// Get the deviceFamily from a metatag. This is written in pages/_document.tsx
const deviceFamily = document
  .getElementById("deviceFamily")
  .getAttribute("content") as DeviceFamily;

const Link = (props: LinkProps) => {
  return (
    <NextLink
      {...Object.assign({}, props, {
        href: getDevicePagePath(props.href, deviceFamily)
      })}
    >
      {props.children}
    </NextLink>
  );
};

export default Link;
